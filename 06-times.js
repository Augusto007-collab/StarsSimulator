/* ===================== TIMES ===================== */
const ATK={eq:{n:'Equilibrado',poss:0,shots:1,q:1},long:{n:'Bola longa',poss:-.04,shots:.96,q:1.05},counter:{n:'Contra-ataque',poss:-.07,shots:.92,q:1.18},posse:{n:'Posse de bola',poss:.09,shots:1.08,q:.95},pontas:{n:'Jogo pelas pontas',poss:.02,shots:1.12,q:.97}};
const DEF={eq:{n:'Equilibrada',poss:0,opp:1,foul:1,oq:1,fat:1},press:{n:'Pressão alta',poss:.05,opp:1.06,foul:1.35,oq:1.08,fat:1.5},recuar:{n:'Recuar o bloco',poss:-.04,opp:.86,foul:.8,oq:1,fat:.7},indiv:{n:'Marcação individual',poss:.02,opp:.95,foul:1.5,oq:1.05,fat:1.25},linha:{n:'Linha alta',poss:.04,opp:1,foul:1.1,oq:1.12,fat:1.1}};
Object.values(ATK).forEach(a=>{a.q*=.8;a.shots*=.9});
const SP={1:[50],2:[34,66],3:[20,50,80],4:[12,37,63,88],5:[8,29,50,71,92]};
const B4='LB CB CB RB',B5='LWB CB CB CB RWB';
const FS={
'3-1-4-2':'GK|CB CB CB|CDM|LM CM CM RM|ST ST','3-4-1-2':'GK|CB CB CB|LM CM CM RM|CAM|ST ST','3-4-2-1':'GK|CB CB CB|LM CM CM RM|CAM CAM|ST','3-4-3':'GK|CB CB CB|LM CM CM RM|LW ST RW','3-5-2':'GK|CB CB CB|LWB CM CAM CM RWB|ST ST',
'4-1-2-1-2':`GK|${B4}|CDM|CM CM|CAM|ST ST`,'4-1-2-1-2 (largo)':`GK|${B4}|CDM|LM RM|CAM|ST ST`,'4-1-3-2':`GK|${B4}|CDM|LM CM RM|ST ST`,'4-1-4-1':`GK|${B4}|CDM|LM CM CM RM|ST`,
'4-2-1-3':`GK|${B4}|CDM CDM|CAM|LW ST RW`,'4-2-2-2':`GK|${B4}|CDM CDM|CAM CAM|ST ST`,'4-2-3-1':`GK|${B4}|CDM CDM|LM CAM RM|ST`,'4-2-3-1 (estreito)':`GK|${B4}|CDM CDM|CAM CAM CAM|ST`,
'4-3-1-2':`GK|${B4}|CM CM CM|CAM|ST ST`,'4-3-2-1':`GK|${B4}|CM CM CM|CAM CAM|ST`,'4-3-3':`GK|${B4}|CM CM CM|LW ST RW`,'4-3-3 (volante)':`GK|${B4}|CDM CM CM|LW ST RW`,
'4-3-3 (armador)':`GK|${B4}|CDM CM CAM|LW ST RW`,'4-3-3 (falso 9)':`GK|${B4}|CM CM CM|LW CF RW`,'4-4-1-1':`GK|${B4}|LM CM CM RM|CAM|ST`,'4-4-2':`GK|${B4}|LM CM CM RM|ST ST`,
'4-5-1':`GK|${B4}|LM CM CM CM RM|ST`,'4-5-1 (2)':`GK|${B4}|LM CDM CAM CDM RM|ST`,'5-2-1-2':`GK|${B5}|CM CM|CAM|ST ST`,'5-2-3':`GK|${B5}|CM CM|LW ST RW`,'5-3-2':`GK|${B5}|CM CM CM|ST ST`,'5-4-1':`GK|${B5}|LM CM CM RM|ST`
};
const FORMS={};
Object.entries(FS).forEach(([k,v])=>{const rows=v.split('|').map(r=>r.split(' ')),R=rows.length;FORMS[k]=[];rows.forEach((r,ri)=>{const y=Math.round(88-ri*(74/(R-1)));r.forEach((lb,i)=>FORMS[k].push([lb,SP[r.length][i],y]))})});

function fillTeamSelects(){
  const sel=(id,html)=>{const e=$(id),v=e.value;e.innerHTML=html;if([...e.options].some(o=>o.value===v))e.value=v};
  sel('t-form',Object.keys(FORMS).map(k=>`<option>${k}</option>`).join(''));
  sel('t-atk',Object.entries(ATK).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join(''));
  sel('t-def',Object.entries(DEF).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join(''));
  sel('t-league','<option value="">Sem liga</option>'+leagues.filter(l=>!l.custom).map(l=>`<option value="${l.id}">${esc(l.name)} (máx. ${l.size})</option>`).join(''));
  const roster=(editTeamId?players.filter(p=>p.teamId===editTeamId):[]).sort(byPos);
  const ro='<option value="">(nenhum)</option>'+roster.map(p=>`<option value="${p.id}">${esc(p.name)} (${p.pos} ${p.ovr})</option>`).join('');
  ['t-cap','t-cor','t-fk','t-pk'].forEach(id=>sel(id,ro));
}
function renderTactics(){
  const box=$('t-board');if(!box)return;
  const f=FORMS[$('t-form').value]||FORMS['4-3-3'];
  const roster=editTeamId?players.filter(p=>p.teamId===editTeamId):[];
  let h='<div class="stripes"></div>';
  if(!editTeamId)h+='<div class="hint">Salve o clube, cadastre os atletas e clique em Editar para escalar os titulares.</div>';
  f.forEach(([lb,x,y],i)=>{
    const cur=roster.find(p=>p.id===tactics['s'+i]);
    const used=new Set(Object.entries(tactics).filter(([k])=>k!=='s'+i).map(([,v])=>v));
    const opts=roster.filter(p=>(i===0?p.pos==='GK':true)&&!used.has(p.id)).sort(byPos);
    const gold=cur&&isTotw(cur.id)?' goldfx':'';
    const sus=cur&&isSusV(cur.id)?'<i class="sredcard"></i>':'';
    h+=`<div class="slot dropzone ${i===0?'gk':''}${gold}" data-drop="${i}" style="left:${x}%;top:${y}%">
      ${cur?`<img class="sph" src="${esc(cur.photo||PH)}" alt="" data-drag="${cur.id}" data-ctx="tac" onerror="this.src='${PH}'">`:''}${sus}
      <label ${cur?`data-drag="${cur.id}" data-ctx="tac" style="cursor:grab"`:''}>${i===0?'GK':lb}${cur?' • '+esc(cur.name.split(' ').pop()):''}</label>
      <select onchange="tactics['s${i}']=this.value;renderTactics()"><option value="">(vazio)</option>${opts.map(p=>`<option value="${p.id}" ${tactics['s'+i]===p.id?'selected':''}>${esc(p.name)} (${p.ovr})</option>`).join('')}</select></div>`;
  });
  box.innerHTML=h;
  const st=new Set(Object.values(tactics)),bench=roster.filter(p=>!st.has(p.id)).sort(byPos);
  $('t-bench').innerHTML=editTeamId?`<div style="width:100%;color:var(--muted);font-size:.8rem">BANCO (${bench.length}) — arraste um atleta para cá para tirá-lo do time titular</div>`+bench.map(p=>`<span class="chip on${isTotw(p.id)?' goldfx':''}" data-drag="${p.id}" data-ctx="tac" style="cursor:grab"><img class="cph" src="${esc(p.photo||PH)}" alt="" onerror="this.src='${PH}'">${esc(p.pos)} • ${esc(p.name)} (${p.ovr})</span>`).join(''):'';
}
function tacDrop(pid,d){
  if(!editTeamId)return;
  const p=players.find(x=>x.id===pid);if(!p)return;
  if(d==='bench'){Object.keys(tactics).forEach(k=>{if(tactics[k]===pid)delete tactics[k]});return renderTactics()}
  const i=+d;if(isNaN(i))return;
  if(i===0&&p.pos!=='GK')return toast('O goleiro precisa ser um atleta GK.');
  let j=-1;Object.keys(tactics).forEach(k=>{if(tactics[k]===pid)j=+k.slice(1)});
  if(j===i)return;
  const old=tactics['s'+i]||'';
  if(j===0&&old){const op=players.find(x=>x.id===old);if(op&&op.pos!=='GK')return toast('Só um goleiro pode ocupar a posição do GK.')}
  tactics['s'+i]=pid;
  if(j>=0)tactics['s'+j]=old;
  renderTactics();
}
function saveTeam(e){
  e.preventDefault();
  if(!isAdmin())return toast(MSG_ADM);
  try{
    const val=id=>{const x=$(id);return x?x.value:''};
    const name=val('t-name').trim(),code=val('t-code').trim().toUpperCase();
    if(!name)return toast('Digite o nome do clube.');
    if(code.length!==3)return toast('A sigla precisa ter 3 letras.');
    if(teams.some(t=>t.id!==editTeamId&&t.name.toLowerCase()===name.toLowerCase()))return toast('Já existe um clube com esse nome.');
    const lg=val('t-league'),L=leagues.find(l=>l.id===lg);
    if(L&&teams.filter(t=>t.leagueId===lg&&t.id!==editTeamId).length>=L.size)return toast(`A liga ${L.name} já tem ${L.size} times (limite).`);
    const roster=players.filter(p=>p.teamId===editTeamId),clean={};
    Object.entries(tactics||{}).forEach(([k,v])=>{const p=roster.find(x=>x.id===v);if(p&&(k!=='s0'||p.pos==='GK'))clean[k]=v});
    const rid=v=>roster.some(p=>p.id===v)?v:'';
    const old=teams.find(t=>t.id===editTeamId)||{};
    const t={id:editTeamId||uid(),name,code,logo:val('t-logo').trim()||PH,formation:val('t-form')||'4-3-3',tactics:clean,color:val('t-c1')||'#1e5bd8',color2:val('t-c2')||'#ffffff',leagueId:lg,atk:val('t-atk')||'eq',def:val('t-def')||'eq',captain:rid(val('t-cap')),pk:rid(val('t-pk')),corner:rid(val('t-cor')),fk:rid(val('t-fk')),stadium:val('t-stadium').trim(),stadiumImg:val('t-stadimg').trim(),fans:Math.max(0,+val('t-fans')||0),priv:val('t-vis')==='priv',author:old.author||currentUser};
    const i=teams.findIndex(x=>x.id===t.id);
    if(i>=0){teams[i]=t;log(`Editou o clube: ${t.name}`)}else{teams.push(t);log(`Criou o clube: ${t.name}`)}
    if(!store('stars_teams',teams))return;
    resetTeam();refreshAll();
    toast(i>=0?'Clube atualizado.':'Clube salvo.');
  }catch(err){console.error('[Stars] salvar clube:',err);toast('Erro ao salvar o clube: '+(err&&err.message?err.message:err))}
}
function editTeam(id){
  if(!isAdmin())return toast(MSG_ADM);
  const t=teamOf(id);if(!t)return;
  editTeamId=id;tactics={...(t.tactics||{})};fillTeamSelects();
  $('t-name').value=t.name;$('t-code').value=t.code;$('t-logo').value=t.logo===PH?'':t.logo;$('t-form').value=FORMS[t.formation]?t.formation:'4-3-3';
  $('t-c1').value=c1(t);$('t-c2').value=c2(t);$('t-league').value=t.leagueId||'';$('t-atk').value=t.atk||'eq';$('t-def').value=t.def||'eq';
  $('t-cap').value=t.captain||'';$('t-pk').value=t.pk||'';$('t-cor').value=t.corner||'';$('t-fk').value=t.fk||'';
  $('t-vis').value=t.priv?'priv':'pub';$('t-stadium').value=t.stadium||'';$('t-stadimg').value=t.stadiumImg||'';$('t-fans').value=t.fans||'';
  $('team-title').textContent='Editar clube';$('t-cancel').style.display='inline-flex';renderTactics();
  $('tab-teams').scrollIntoView({behavior:'smooth'});
}
function resetTeam(){
  editTeamId=null;tactics={};
  ['t-name','t-code','t-logo','t-stadium','t-stadimg','t-fans'].forEach(i=>$(i).value='');
  $('t-c1').value='#1e5bd8';$('t-c2').value='#ffffff';
  fillTeamSelects();$('t-form').value='4-3-3';$('t-league').value='';$('t-atk').value='eq';$('t-def').value='eq';$('t-vis').value='pub';
  $('team-title').textContent='Gerenciar clube';$('t-cancel').style.display='none';renderTactics();
}
function deleteTeam(id){
  if(!isAdmin())return toast(MSG_ADM);
  const t=teamOf(id);if(!t)return;
  const n=players.filter(p=>p.teamId===id).length;
  askConfirm(`Excluir "${t.name}"? ${n} atleta(s) do clube também serão removidos.`,()=>{
    teams=teams.filter(x=>x.id!==id);players=players.filter(p=>p.teamId!==id);
    store('stars_teams',teams);store('stars_players',players);
    if(S&&S.teamIds.includes(id)){S=null;saveS()}
    log(`Excluiu o clube: ${t.name} (e ${n} atleta(s))`);
    if(editTeamId===id)resetTeam();refreshAll();
  });
}
window.TF_LG='__all';
function tfOpts(){
  const sel=$('tf-league');if(!sel)return;
  const ids=[...new Set(teams.map(t=>lgOf(t.id)))];
  const list=ids.map(id=>({id,name:id==='__none'?'Sem liga':leagues.find(l=>l.id===id).name})).sort((a,b)=>a.name.localeCompare(b.name,'pt'));
  const keep=window.TF_LG;
  sel.innerHTML='<option value="__all">Todas as ligas ('+teams.length+' clubes)</option>'+list.map(o=>'<option value="'+o.id+'">'+esc(o.name)+' ('+teams.filter(t=>lgOf(t.id)===o.id).length+')</option>').join('');
  sel.value=(keep==='__all'||list.some(o=>o.id===keep))?keep:'__all';
  window.TF_LG=sel.value;
}
function tfSet(v){window.TF_LG=v;renderTeams()}
function renderTeams(){
  teams.sort(byN);tfOpts();
  const L=window.TF_LG,list=teams.filter(t=>L==='__all'||lgOf(t.id)===L);
  $('tf-count').textContent=list.length+' de '+teams.length+' clube(s)';
  $('teams-grid').innerHTML=list.length?list.map(t=>{
    const lg=leagues.find(l=>l.id===t.leagueId);
    return `<div class="panel" style="text-align:center;border-top:5px solid ${esc(c1(t))}">${t.priv?'<div style="text-align:right;font-size:.8rem;color:var(--muted)">🔒 Privado</div>':''}
    <img src="${esc(t.logo)}" onerror="this.src='${PH}'" alt="" style="width:60px;height:60px;object-fit:contain;margin-bottom:.5rem">
    <div style="font:700 1.2rem var(--fs)">${esc(t.name)} (${esc(t.code)})</div>
    <div style="color:var(--muted);font-size:.85rem">${players.filter(p=>p.teamId===t.id).length} atleta(s) • ${esc(t.formation)}</div>
    <div style="color:var(--muted);font-size:.78rem;margin-bottom:.8rem">${(ATK[t.atk]||ATK.eq).n} • ${(DEF[t.def]||DEF.eq).n}${lg?' • '+esc(lg.name):''}</div>
    <div class="row" style="justify-content:center;gap:.4rem"><button class="btn sec sm" onclick="editTeam('${t.id}')">✏️ Editar</button><button class="btn dng sm" onclick="deleteTeam('${t.id}')">🗑️ Excluir</button></div></div>`;
  }).join(''):'<p style="color:var(--muted)">Nenhum clube nesta liga.</p>';
}
function stUpload(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=e=>shrinkImg(e.target.result,900,d=>{$('t-stadimg').value=d});r.readAsDataURL(f);ev.target.value=''}
