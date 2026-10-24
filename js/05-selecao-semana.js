/* ===================== SELEÇÃO DA SEMANA ===================== */
/* Regras: +3 de overall na semana. Quem COMPLETA os 7 dias e é selecionado de novo ganha +1 extra a cada nova seleção
   (máx. 7 extras = +10). A sequência dura um trimestre (91 dias) ou até o MingauCoach resetar. */
const TW_MAXEXTRA=7,TW_QUARTER=91*864e5;
const readTW=()=>{const t=load('stars_totw',{});return{ids:Array.isArray(t.ids)?t.ids:[],start:t.start||0,upd:t.upd||0,ext:t.ext||{},hist:t.hist||{},ps:t.ps||{},cyc:t.cyc||0,cred:!!t.cred}};
const actTW=t=>!!(t&&t.ids&&t.ids.length>0&&Date.now()-t.start<WEEK);
const liveIds=()=>{const t=readTW();return actTW(t)?t.ids:[]};
const isTotw=id=>liveIds().includes(id);
const twExtra=id=>{const t=readTW();return actTW(t)&&t.ids.includes(id)?Math.min(TW_MAXEXTRA,t.ext[id]||0):0};
const twBonus=id=>3+twExtra(id);
const boost=p=>isTotw(p.id)?{...p,ovr:Math.min(99,p.ovr+twBonus(p.id)),totw:1,twx:twExtra(p.id)}:p;
function twPersist(data){
  data.upd=Date.now();
  try{localStorage.setItem('stars_totw',JSON.stringify(data));localStorage.setItem('stars_ts',Date.now())}catch(e){}
  if(cloudOn())fetch(cloudUrl().replace(/\.json$/,'/totw_v1.json'),{method:'PUT',body:JSON.stringify(data)}).catch(()=>{});
}
/* credita a semana cumprida e vence o trimestre */
function twSettle(){
  if(!isAdmin())return false;
  const t=readTW(),now=Date.now();let ch=false;
  if(t.ids.length&&!t.cred&&now-t.start>=WEEK){
    t.ids.forEach(id=>{if((t.ps[id]||t.start)<=t.start+1000)t.hist[id]=Math.min(TW_MAXEXTRA,(t.hist[id]||0)+1)});
    t.cred=true;if(!t.cyc)t.cyc=t.start;ch=true;
  }
  if(t.cyc&&now-t.cyc>=TW_QUARTER){t.hist={};t.ext={};t.cyc=0;ch=true;if(isAdmin())log('A sequência trimestral da Seleção da Semana foi reiniciada')}
  if(ch)twPersist(t);
  return ch;
}
function twResetSeq(){
  if(!isAdmin())return toast('Apenas o MingauCoach pode resetar a sequência.');
  askConfirm('Resetar a sequência da Seleção da Semana? Todos voltam a +3 e a contagem de semanas é zerada.',()=>{
    const t=readTW();t.hist={};t.ext={};t.cyc=0;twPersist(t);log('Resetou a sequência da Seleção da Semana');toast('Sequência resetada.');refreshTW();
  });
}
const twNames=()=>new Set(players.filter(p=>isTotw(p.id)).map(p=>p.name));
function futCard(p,o){
  o=o||{};
  const t=teamOf(p.teamId),tot=isTotw(p.id);
  const core=`<div class="ovr">${tot?Math.min(99,p.ovr+twBonus(p.id)):p.ovr}</div><div class="pos">${esc(p.pos)}</div>
  <img class="club" src="${esc(t?t.logo:PH)}" alt="" onerror="this.src='${PH}'">
  <img class="ph" src="${esc(p.photo||PH)}" alt="" onerror="this.src='${PH}'">
  <div class="nm">${esc(p.name)}</div><div class="cn">${esc(t?t.name:'Sem clube')}</div>${o.actions||''}`;
  if(!tot)return `<div class="fut ${o.click?'click':''}" ${o.click?`onclick="${o.click}"`:''}>${core}</div>`;
  const rows=Array.from({length:18},()=>'<div class="twrow">'+'<span>TOTW</span>'.repeat(16)+'</div>').join('');
  return `<div class="fw"><div class="fut totw ${o.click?'click':''}" ${o.click?`onclick="${o.click}"`:''}><div class="twclip"><div class="twbg">${rows}</div></div>${twExtra(p.id)?`<div class="twseq" title="Sequência de seleções">+${twExtra(p.id)}</div>`:''}${core}</div><div class="totwlbl">Jogador da Semana</div></div>`;
}
function twRender(){
  const t=readTW(),act=actTW(t);
  const L=act?t.ids.map(id=>players.find(p=>p.id===id)).filter(Boolean).sort(byPos):[];
  const d=Math.max(1,Math.ceil((t.start+WEEK-Date.now())/864e5));
  const info=$('tw-info'),grid=$('tw-grid');
  const cy=t.cyc?` • sequência trimestral até ${new Date(t.cyc+TW_QUARTER).toLocaleDateString('pt-BR')}`:'';
  info.textContent=L.length?`${L.length} atleta(s) • +3 de overall (+1 extra por semana cumprida, até +${TW_MAXEXTRA}) • vale até ${new Date(t.start+WEEK).toLocaleDateString('pt-BR')} (${d} dia(s))${cy}`:'A Seleção da Semana só começa a valer quando tiver ao menos 1 atleta.';
  const admin=isAdmin();
  grid.innerHTML=L.length?L.map(p=>`<div style="display:flex;flex-direction:column;align-items:center;gap:.6rem">${admin?`<button class="btn dng" style="min-width:170px;font-size:.95rem" onclick="twRemoveOne('${p.id}')">✖ Remover da semana</button>`:''}${futCard(p,{})}<small style="color:var(--muted)">Bônus: +${twBonus(p.id)}${twExtra(p.id)?` (sequência ${twExtra(p.id)}/${TW_MAXEXTRA})`:''} • semanas cumpridas: ${t.hist[p.id]||0}</small></div>`).join(''):'<p style="color:var(--muted);grid-column:1/-1">Nenhum atleta na Seleção da Semana.</p>';
}
let thOff=0;
function renderTotwHome(){
  const box=$('totw-home');if(!box)return;
  const L=players.filter(p=>isTotw(p.id)).sort((a,b)=>b.ovr-a.ovr);
  if(!L.length){box.innerHTML='';return}
  const n=Math.min(3,L.length),show=[];
  for(let i=0;i<n;i++)show.push(L[(thOff+i)%L.length]);
  box.innerHTML=`<div class="row" style="justify-content:space-between;margin-bottom:.6rem"><h3 class="t" style="margin:0;color:#ffd65c">⭐ Seleção da Semana</h3><small style="color:var(--muted)">${L.length} atleta(s)${L.length>3?' • troca sozinha':''}</small></div><div class="row" style="justify-content:center;gap:1.2rem">${show.map(p=>futCard(p,{})).join('')}</div>`;
}
setInterval(()=>{if(players.filter(p=>isTotw(p.id)).length>3)thOff+=3;renderTotwHome()},6000);
function refreshTW(){renderPlayers();renderOvr();twRender();renderTotwHome();renderTactics();stats()}
function saveTW(ids){
  twSettle();
  const cur=readTW(),act=actTW(cur),now=Date.now();
  const start=ids.length===0?0:(act?cur.start:now);
  const keep=act?cur.ids:[];
  const ext={},ps={},hist={...cur.hist};
  ids.forEach(id=>{
    if(keep.includes(id)){ext[id]=cur.ext[id]||0;ps[id]=cur.ps[id]||cur.start}
    else{ext[id]=Math.min(TW_MAXEXTRA,hist[id]||0);ps[id]=now}   // nova seleção: +1 extra por semana cumprida antes
  });
  let cyc=cur.cyc;if(ids.length&&!cyc)cyc=start;
  twPersist({ids,start,ext,ps,hist,cyc,cred:act?cur.cred:false});
  refreshTW();
}
let SELV=new Set();
function openTotwPick(){
  if(!isAdmin())return toast('Apenas o MingauCoach pode definir a Seleção da Semana.');
  SELV=new Set(liveIds());$('tp-q').value='';
  $('tp-club').innerHTML='<option value="">Todos os clubes</option>'+[...teams].sort(byN).map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');
  twPickDraw();$('m-totw').classList.add('on');
}
function twPickDraw(){
  const q=$('tp-q').value.trim().toLowerCase(),c=$('tp-club').value;
  $('tp-n').textContent=SELV.size+'/30';
  $('tp-list').innerHTML=players.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!c||p.teamId===c)).sort(byPos).map(p=>`<button type="button" class="chip ${SELV.has(p.id)?'on':''}" onclick="twTog('${p.id}')"><img class="cph" src="${esc(p.photo||PH)}" alt="" onerror="this.src='${PH}'">${esc(p.pos)} • ${esc(p.name)} (${p.ovr}) • ${esc((teamOf(p.teamId)||{code:'—'}).code)}</button>`).join('')||'<span style="color:var(--muted)">Nenhum atleta encontrado.</span>';
}
function twTog(id){
  if(SELV.has(id))SELV.delete(id);else{if(SELV.size>=30)return toast('Máximo de 30 atletas na Seleção da Semana.');SELV.add(id)}
  twPickDraw();
}
function twSaveSel(){
  if(!isAdmin())return toast('Apenas o MingauCoach pode definir a Seleção da Semana.');
  const ids=[...SELV];
  closeM('m-totw');
  try{saveTW(ids);log(`Definiu a Seleção da Semana (${ids.length} atleta(s))`);toast(ids.length?`Seleção salva: ${ids.length} atleta(s).`:'Seleção da Semana limpa.')}
  catch(e){console.error(e);toast('Não foi possível salvar a seleção da semana.')}
}
function twRemoveOne(id){
  if(!isAdmin())return toast('Apenas o MingauCoach pode alterar a Seleção da Semana.');
  const p=players.find(x=>x.id===id);
  saveTW(readTW().ids.filter(x=>x!==id));
  if(p){log(`Removeu ${p.name} da Seleção da Semana`);toast(`${p.name} saiu da Seleção da Semana.`)}
}
async function twSync(){
  if(!cloudOn())return;
  try{
    const u=cloudUrl().replace(/\.json$/,'/totw_v1.json');
    const r=await fetch(u);if(!r.ok)throw new Error('HTTP '+r.status);
    const c=(await r.json())||{};
    const cids=Array.isArray(c.ids)?c.ids:Object.values(c.ids||{});
    const TW=readTW();
    if((c.upd||0)>(TW.upd||0)){
      try{localStorage.setItem('stars_totw',JSON.stringify({ids:cids,start:c.start||0,upd:c.upd,ext:c.ext||{},hist:c.hist||{},ps:c.ps||{},cyc:c.cyc||0,cred:!!c.cred}))}catch(e){}
      refreshTW();
    }else if((TW.upd||0)>(c.upd||0)&&isAdmin())await fetch(u,{method:'PUT',body:JSON.stringify(TW)});
  }catch(e){}
}
setInterval(twSync,30000);setTimeout(twSync,1800);
twSettle();setInterval(()=>{if(twSettle())refreshTW()},60000);
let lastAct=actTW(readTW());
setInterval(()=>{const a=actTW(readTW());if(a!==lastAct){lastAct=a;refreshTW()}},60000);
