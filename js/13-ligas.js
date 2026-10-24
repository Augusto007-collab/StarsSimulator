/* ===================== LIGAS E CAMPEONATOS ===================== */
const FMT={points:'Pontos corridos',knockout:'Mata-mata',both:'Pontos corridos + mata-mata'};
const tn=id=>teamOf(id)?teamOf(id).name:'—';
const tlogo=id=>`<img src="${esc(teamOf(id)?teamOf(id).logo:PH)}" onerror="this.src='${PH}'" alt="">`;
const lgImg=l=>`<img class="lglogo" src="${esc(l.logo||PH)}" onerror="this.src='${PH}'" alt="">`;
const saveS=()=>store('stars_season',S);
const isCoach=f=>S.coached.includes(f.h)||S.coached.includes(f.a);
const lTeams=l=>l.custom?l.teamIds.filter(teamOf):teams.filter(t=>t.leagueId===l.id).map(t=>t.id);
const pois=l=>{const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};
function tStr(id){const r=players.filter(p=>p.teamId===id).map(boost).sort((a,b)=>b.ovr-a.ovr).slice(0,11);return r.length?r.reduce((s,p)=>s+p.ovr,0)/r.length:70}
const isSusV=id=>!!(S&&S.sus&&S.sus[id]>0);
const effTeam=t=>{
  if(!t||!S||!S.lu||!S.lu[t.id]||!(S.coached||[]).includes(t.id))return t;
  const L=S.lu[t.id];return{...t,formation:L.formation,atk:L.atk,def:L.def,tactics:L.tactics};
};
const PVSEL=new Set();
function pvChips(){
  $('l-privteams').innerHTML=teams.map(t=>`<button type="button" class="chip ${PVSEL.has(t.id)?'on':''}" onclick="pvTog('${t.id}')">${esc(t.name)}</button>`).join('')||'<span style="color:var(--muted)">Cadastre clubes primeiro.</span>';
}
function pvToggleBox(v){$('l-privbox').style.display=v?'':'none';pvChips()}
function pvTog(id){PVSEL.has(id)?PVSEL.delete(id):PVSEL.add(id);pvChips()}
function saveLeague(e){
  e.preventDefault();
  if(!isAdmin()&&!$('l-priv').checked)return toast('Você só pode criar ligas personalizadas (só você vê).');
  const name=$('l-name').value.trim();
  if(!name)return toast('Dê um nome à liga.');
  const l={id:uid(),name,logo:$('l-logo').value.trim(),format:$('l-format').value,size:Math.min(32,Math.max(2,+$('l-size').value||8)),turns:+$('l-turns').value,koN:+$('l-ko').value,tb:$('l-tb').value,susY:+$('l-susy').value||0,susR:+$('l-susr').value||1,author:currentUser};
  if($('l-priv').checked){
    l.custom=true;l.priv=true;l.teamIds=[...PVSEL].filter(id=>teamOf(id));
    if(l.teamIds.length<2)return toast('Escolha pelo menos 2 times para a liga personalizada.');
    l.size=l.teamIds.length;
  }
  if(leagues.some(x=>x.name.toLowerCase()===name.toLowerCase()))return toast('Já existe uma liga com esse nome.');
  leagues.push(l);store('stars_leagues',leagues);log(`Criou a liga${l.priv?' personalizada (privada)':''}: ${name}`);
  $('l-name').value='';$('l-logo').value='';if(isAdmin())$('l-priv').checked=false;$('l-privbox').style.display=isAdmin()?'none':'';PVSEL.clear();pvChips();refreshAll();
}
const lgOk=id=>{if(isAdmin())return true;const l=leagues.find(x=>x.id===id);return !!(l&&(l.custom||l.priv))};
function deleteLeague(id){
  if(!lgOk(id))return toast(MSG_ADM);
  const l=leagues.find(x=>x.id===id);if(!l)return;
  askConfirm(`Excluir a liga "${l.name}"? Os clubes ficam sem liga.`,()=>{
    leagues=leagues.filter(x=>x.id!==id);teams.forEach(t=>{if(t.leagueId===id)t.leagueId=''});
    store('stars_leagues',leagues);store('stars_teams',teams);
    if(S&&S.leagueId===id){S=null;saveS()}
    log(`Excluiu a liga: ${l.name}`);refreshAll();
  });
}
function renderLeagues(){
  const vis=leagues.filter(canSee);
  $('leagues-grid').innerHTML=vis.length?vis.map(l=>`<div class="panel" style="display:flex;flex-direction:column;gap:.6rem">
  <div class="row" style="gap:.7rem;flex-wrap:nowrap">${lgImg(l)}<div><div style="font:700 1.3rem var(--fs)">${esc(l.name)}${l.custom?' <small style="color:var(--muted)">(personalizada'+(l.priv?', só você vê':'')+')</small>':''}</div>
  <div style="color:var(--muted);font-size:.85rem">${FMT[l.format]} • ${lTeams(l).length}/${l.size} times<br>${l.format==='knockout'?'Jogo único':l.turns===2?'Ida e volta':'Só ida'}${l.format==='both'?' • '+l.koN+' no mata-mata':''}${l.format!=='points'?' • desempate: '+(l.tb==='et_pen'?'prorrogação + pênaltis':'pênaltis'):''}</div></div></div>
  <div class="row" style="gap:.4rem"><button class="btn sm" onclick="openSeason('${l.id}')">▶ Jogar</button><button class="btn sec sm" onclick="openLeagueEdit('${l.id}')">✏️ Editar</button><button class="btn dng sm" onclick="deleteLeague('${l.id}')">🗑️</button></div></div>`).join(''):'<p style="color:var(--muted)">Nenhuma liga disponível. Crie uma ao lado ou use "Jogar liga" para montar uma personalizada.</p>';
}
function lgUpload(ev){upload(ev,'lg-logo')}
function openLeagueEdit(id){
  if(!lgOk(id))return toast(MSG_ADM);
  const L=leagues.find(x=>x.id===id);if(!L)return;
  const locked=!!(S&&S.leagueId===id);
  $('lg-id').value=id;$('lg-name').value=L.name;$('lg-logo').value=L.logo||'';$('lg-prev').src=L.logo||PH;
  $('lg-format').value=L.format;$('lg-turns').value=L.turns||1;$('lg-size').value=L.size;$('lg-ko').value=L.koN||4;$('lg-tb').value=L.tb||'pen';
  $('lg-susy').value=String(L.susY||0);$('lg-susr').value=String(L.susR||1);
  ['lg-format','lg-turns','lg-ko','lg-tb'].forEach(i=>$(i).disabled=locked);
  $('lg-size').disabled=locked||!!L.custom;
  $('lg-warn').textContent=locked?'Campeonato em andamento: só o nome, a logo e as regras de suspensão podem ser alterados. Encerre o campeonato para mudar o formato.':(L.custom?'Liga personalizada: o número de times é definido pelos clubes escolhidos.':'');
  $('m-lg').classList.add('on');
}
function saveLeagueEdit(){
  const id=$('lg-id').value;
  if(!lgOk(id))return toast(MSG_ADM);
  const L=leagues.find(x=>x.id===id);if(!L)return;
  const name=$('lg-name').value.trim();
  if(!name)return toast('Dê um nome à liga.');
  if(leagues.some(x=>x.id!==id&&x.name.toLowerCase()===name.toLowerCase()))return toast('Já existe uma liga com esse nome.');
  const size=Math.min(32,Math.max(2,+$('lg-size').value||8));
  if(!L.custom&&!$('lg-size').disabled&&size<teams.filter(t=>t.leagueId===id).length)return toast(`Esta liga já tem ${teams.filter(t=>t.leagueId===id).length} clube(s) vinculados. Escolha um número maior.`);
  L.name=name;L.logo=$('lg-logo').value.trim();
  if(!$('lg-format').disabled){
    L.format=$('lg-format').value;L.turns=+$('lg-turns').value;L.koN=+$('lg-ko').value;L.tb=$('lg-tb').value;
    if(!L.custom)L.size=size;else L.size=L.teamIds?L.teamIds.length:L.size;
  }
  L.susY=+$('lg-susy').value||0;L.susR=+$('lg-susr').value||1;
  if(S&&S.leagueId===id){S.name=L.name;saveS()}
  store('stars_leagues',leagues);log(`Editou a liga: ${L.name}`);
  $('m-lg').classList.remove('on');refreshAll();
}

let SM={lid:'',coach:new Set(),tb:undefined,_l:null,custom:{name:'Liga personalizada',format:'points',turns:1,koN:4,teams:new Set()}};
const tg=(set,id)=>{set.has(id)?set.delete(id):set.add(id)};
function openSeason(lid){SM.lid=lid;SM.coach=new Set();SM.custom.teams=new Set();SM.tb=undefined;SM._l=null;renderSeasonModal();$('m-season').classList.add('on')}
function renderSeasonModal(){
  if(SM._l!==SM.lid){SM.tb=undefined;SM._l=SM.lid}
  const L=leagues.find(l=>l.id===SM.lid),isNew=!L,C=SM.custom;
  if(SM.tb===undefined)SM.tb=(L&&L.tb)||'pen';
  const ids=isNew?teams.filter(t=>C.teams.has(t.id)).map(t=>t.id):lTeams(L);
  [...SM.coach].forEach(x=>{if(!ids.includes(x))SM.coach.delete(x)});
  const chip=(on,id,set)=>`<button type="button" class="chip ${on?'on':''}" onclick="tg(${set},'${id}');renderSeasonModal()">${esc(tn(id))}</button>`;
  let h=`<div class="fg"><label>Liga</label><select class="fc" onchange="SM.lid=this.value;SM.coach=new Set();renderSeasonModal()"><option value="">➕ Criar liga personalizada agora</option>${leagues.filter(canSee).map(l=>`<option value="${l.id}" ${l.id===SM.lid?'selected':''}>${esc(l.name)}</option>`).join('')}</select></div>`;
  if(isNew){
    h+=`<div class="fg"><label>Nome</label><input class="fc" value="${esc(C.name)}" oninput="SM.custom.name=this.value"></div>
    <div class="row" style="gap:.5rem;align-items:flex-start"><div class="fg" style="flex:1"><label>Formato</label><select class="fc" onchange="SM.custom.format=this.value">${Object.entries(FMT).map(([k,v])=>`<option value="${k}" ${C.format===k?'selected':''}>${v}</option>`).join('')}</select></div>
    <div class="fg" style="flex:1"><label>Turnos</label><select class="fc" onchange="SM.custom.turns=+this.value"><option value="1" ${C.turns===1?'selected':''}>Só ida</option><option value="2" ${C.turns===2?'selected':''}>Ida e volta</option></select></div>
    <div class="fg" style="flex:1"><label>Mata-mata</label><select class="fc" onchange="SM.custom.koN=+this.value">${[2,4,8,16].map(n=>`<option ${C.koN===n?'selected':''}>${n}</option>`).join('')}</select></div></div>
    <div class="fg"><label>Times da liga (${C.teams.size})</label><div class="chips">${teams.map(t=>chip(C.teams.has(t.id),t.id,'SM.custom.teams')).join('')||'<span style="color:var(--muted)">Cadastre clubes primeiro.</span>'}</div></div>`;
  }
  h+=`<div class="fg"><label>Clubes que você vai comandar</label><div class="chips">${ids.map(id=>chip(SM.coach.has(id),id,'SM.coach')).join('')||'<span style="color:var(--muted)">Escolha os times da liga.</span>'}</div></div>
  <div class="fg"><label>Critério de desempate (mata-mata)</label><select class="fc" onchange="SM.tb=this.value"><option value="pen" ${SM.tb==='pen'?'selected':''}>Somente pênaltis</option><option value="et_pen" ${SM.tb==='et_pen'?'selected':''}>Prorrogação + pênaltis</option></select><small style="color:var(--muted);font-size:.75rem">Vale para as fases de mata-mata (mata-mata puro ou pontos corridos + mata-mata).</small></div>
  <div class="row"><button class="btn" onclick="startSeason()">Iniciar campeonato</button><button class="btn sec" onclick="closeM('m-season')">Cancelar</button></div>`;
  $('ss-body').innerHTML=h;
}
function roundRobin(ids,turns){
  const t=[...ids];if(t.length%2)t.push(null);
  const n=t.length,rounds=[];
  for(let r=0;r<n-1;r++){const rd=[];for(let i=0;i<n/2;i++){const a=t[i],b=t[n-1-i];if(a&&b)rd.push(r%2?{h:b,a,r:null}:{h:a,a:b,r:null})}rounds.push(rd);t.splice(1,0,t.pop())}
  const out=[...rounds];
  if(turns===2)rounds.forEach(rd=>out.push(rd.map(f=>({h:f.a,a:f.h,r:null}))));
  return out;
}
function startKO(ids){
  const s=[...ids].sort((a,b)=>tStr(b)-tStr(a));let n=1;while(n<s.length)n*=2;
  const seeds=s.concat(Array(n-s.length).fill(null)),ties=[];
  for(let i=0;i<n/2;i++){const h=seeds[i],a=seeds[n-1-i];ties.push({h,a,r:a?null:{hg:1,ag:0,bye:1}})}
  S.ko={rounds:[ties],ri:0};S.phase='ko';
}
function startSeason(){
  try{
    let L=leagues.find(l=>l.id===SM.lid),ids;
    if(!L){
      const c=SM.custom;ids=teams.filter(t=>c.teams.has(t.id)).map(t=>t.id);
      if(ids.length<2)return toast('Escolha pelo menos 2 times.');
      L={id:uid(),name:(c.name||'Liga personalizada').trim(),format:c.format,size:ids.length,turns:c.turns,koN:c.koN,tb:SM.tb||'pen',susY:0,susR:1,custom:true,priv:true,teamIds:ids,author:currentUser};
      leagues.push(L);store('stars_leagues',leagues);
    }else{ids=lTeams(L);if(ids.length<2)return toast('A liga precisa de pelo menos 2 times. Vincule clubes a ela na aba Times.')}
    const coached=[...SM.coach].filter(x=>ids.includes(x));
    if(!coached.length)return toast('Escolha pelo menos 1 clube para comandar.');
    S={id:uid(),leagueId:L.id,name:L.name,format:L.format,turns:L.turns||1,koN:L.koN||4,tb:SM.tb||'pen',teamIds:ids,coached,phase:'league',rounds:[],ri:0,ko:null,champ:null,sus:{},cy:{},lu:{}};
    if(L.format==='knockout')startKO(ids);else S.rounds=roundRobin(ids,S.turns);
    saveS();$('m-season').classList.remove('on');log(`Iniciou o campeonato: ${S.name}`);
    goTab('leagues');refreshAll();
  }catch(err){console.error(err);toast('Não foi possível iniciar o campeonato. Veja o console (F12).')}
}
function table(){
  const m={};S.teamIds.forEach(id=>m[id]={id,j:0,v:0,e:0,d:0,gp:0,gc:0,pts:0});
  S.rounds.forEach(rd=>rd.forEach(f=>{if(!f.r)return;const H=m[f.h],A=m[f.a];H.j++;A.j++;H.gp+=f.r.hg;H.gc+=f.r.ag;A.gp+=f.r.ag;A.gc+=f.r.hg;
    if(f.r.hg>f.r.ag){H.v++;H.pts+=3;A.d++}else if(f.r.hg<f.r.ag){A.v++;A.pts+=3;H.d++}else{H.e++;A.e++;H.pts++;A.pts++}}));
  return Object.values(m).sort((a,b)=>b.pts-a.pts||(b.gp-b.gc)-(a.gp-a.gc)||b.gp-a.gp||tn(a.id).localeCompare(tn(b.id)));
}
const curFix=()=>S?(S.phase==='league'?S.rounds[S.ri]:S.phase==='ko'?S.ko.rounds[S.ko.ri]:[]):[];
function shootout(f){
  const bias=(tStr(f.h)-tStr(f.a))/400;let h=0,a=0;
  for(let i=0;i<5;i++){if(Math.random()<.76+bias)h++;if(Math.random()<.76-bias)a++}
  while(h===a){if(Math.random()<.76+bias)h++;if(Math.random()<.76-bias)a++}
  return{h,a};
}
function lgDecSus(hId,aId){
  if(!S||!S.sus)return;
  Object.keys(S.sus).forEach(id=>{
    const p=players.find(x=>x.id===id);
    if(p&&(p.teamId===hId||p.teamId===aId)&&S.sus[id]>0)S.sus[id]--;
  });
}
function lgApplyCards(m){
  if(!S)return;
  const L=leagues.find(x=>x.id===S.leagueId)||{};
  const susR=L.susR||1,susY=L.susY||0;
  S.sus=S.sus||{};S.cy=S.cy||{};
  (m.redCards||[]).forEach(id=>{S.sus[id]=Math.max(S.sus[id]||0,susR)});
  (m.yelCards||[]).forEach(id=>{
    if(!susY)return;
    S.cy[id]=(S.cy[id]||0)+1;
    if(S.cy[id]>=susY){S.sus[id]=Math.max(S.sus[id]||0,1);S.cy[id]=0}
  });
}
function simFix(f){
  const ko=S&&S.phase==='ko',op=openness();
  const diff=(tStr(f.h)-tStr(f.a))/40;
  const fh=Math.exp(gauss()*.25),fa=Math.exp(gauss()*.25);
  const lh=Math.min(4.5,1.25*Math.exp(diff)*fh*op),la=Math.min(4.5,1.1*Math.exp(-diff)*fa*op);
  let hg=Math.min(9,pois(lh)),ag=Math.min(9,pois(la));
  if(ko&&hg===ag){hg+=pois(.3);ag+=pois(.3)}
  f.r={hg,ag};
  if(hg===ag&&ko)f.r.pen=shootout(f);
  if(S&&S.phase!=='done')lgDecSus(f.h,f.a);
}
const winnerOf=f=>!f.a?f.h:!f.h?f.a:f.r.hg>f.r.ag?f.h:f.r.hg<f.r.ag?f.a:(f.r.pen.h>f.r.pen.a?f.h:f.a);
function advance(){
  if(S.phase==='league'){
    S.ri++;
    if(S.ri>=S.rounds.length){
      if(S.format==='both')startKO(table().slice(0,Math.min(S.koN,S.teamIds.length)).map(r=>r.id));
      else{S.champ=table()[0].id;S.phase='done'}
    }
  }else{
    const w=S.ko.rounds[S.ko.ri].map(winnerOf);
    if(w.length===1){S.champ=w[0];S.phase='done'}
    else{const nx=[];for(let i=0;i<w.length;i+=2)nx.push({h:w[i],a:w[i+1],r:null});S.ko.rounds.push(nx);S.ko.ri++}
  }
  saveS();
}
function prepRound(){
  let g=0;
  while(S&&S.phase!=='done'&&g++<80){
    const fx=curFix();
    fx.forEach(f=>{if(!f.r&&f.h&&f.a&&!isCoach(f))simFix(f)});
    if(fx.every(f=>f.r))advance();else break;
  }
  if(S)saveS();
}
function recordResult(m,pen){
  const cx=m.ctx;m.ctx=null;
  if(!S||!cx||!cx.f||cx.f.r){if(m.lg){lgRestore();m.lg=0}return}
  const f=cx.f;
  f.r={hg:m.sh,ag:m.sa};
  if(S.phase==='ko'&&m.sh===m.sa){
    f.r.pen=pen?{h:pen.h,a:pen.a}:shootout(f);
    if(!pen)tick(`🥅 Pênaltis: ${tn(f.h)} ${f.r.pen.h} x ${f.r.pen.a} ${tn(f.a)}`);
  }
  lgDecSus(f.h,f.a);
  lgApplyCards(m);
  saveS();
  if(m.lg){lgRestore();m.lg=0}
  renderSeason();
  log(`Resultado da liga: ${tn(f.h)} ${f.r.hg} x ${f.r.ag} ${tn(f.a)}`,'match');
}
function playFix(i){
  const f=curFix()[i];if(!f||f.r)return;
  if(M&&M.ctx)return toast('Termine a partida atual antes de jogar outra.');
  const bad=[f.h,f.a].filter(id=>S.coached.includes(id)).flatMap(id=>{
    const tac=effTeam(teamOf(id)).tactics||{};
    return Object.values(tac).filter(pid=>pid&&isSusV(pid)).map(pid=>players.find(p=>p.id===pid)).filter(Boolean);
  });
  if(bad.length)return toast('Substitua antes de jogar (suspenso): '+bad.map(p=>p.name).join(', '));
  syncLg('home',f.h);syncLg('away',f.a);
  $('sel-home').value=f.h;$('sel-away').value=f.a;onTeamChange();
  const H=effTeam(teamOf(f.h)),A=effTeam(teamOf(f.a));
  M.h=H;M.a=A;M.lh=lineup(H);M.la=lineup(A);
  M.tac={home:{atk:H.atk||'eq',def:H.def||'eq'},away:{atk:A.atk||'eq',def:A.def||'eq'}};
  M.hid={home:new Set(),away:new Set()};
  M.ctx={f,ri:S.ri,phase:S.phase};M.lg=1;
  M.ctl={home:S.coached.includes(f.h),away:S.coached.includes(f.a)};
  lockSel(true);
  paint();layoutDots();buildTac();btns();renderStats();
  const mg=document.querySelector('#tab-match .match-grid');
  if(mg)$('lg-play').appendChild(mg);
  goTab('leagues');renderRoundBox();
}
function simMine(i){const f=curFix()[i];if(!f||f.r)return;simFix(f);saveS();renderSeason()}
function giveUp(){
  if(M){M.ctx=null;M.lg=0;if(M.timer)stopTimer()}
  lgRestore();lockSel(false);onTeamChange();renderSeason();
}
function endSeason(){askConfirm('Encerrar a temporada atual? O progresso será perdido.',()=>{S=null;saveS();lockSel(false);renderSeason()})}
function roundTitle(){
  if(S.phase==='league')return `Rodada ${S.ri+1} de ${S.rounds.length}`;
  const n=curFix().length;return n===1?'Final':n===2?'Semifinal':n===4?'Quartas de final':n===8?'Oitavas de final':`Mata-mata • fase de ${n*2}`;
}
function fixRow(f,i,btn){
  const live=M&&M.ctx&&M.ctx.f===f;
  const res=live?`${M.sh} x ${M.sa} ⚽`:f.r?`${f.r.hg} x ${f.r.ag}${f.r.pen?` (${f.r.pen.h}-${f.r.pen.a} pên.)`:''}${f.r.bye?' (folga)':''}`:'x';
  const b=btn&&!f.r&&f.h&&f.a&&isCoach(f)?`<span class="row" style="gap:.3rem"><button class="btn sm" onclick="playFix(${i})">▶ Jogar</button><button class="btn sec sm" onclick="simMine(${i})">⏩</button></span>`:'';
  return `<div class="tick fx"><span>${tlogo(f.h)}${esc(tn(f.h))}</span><b>${res}</b><span>${esc(f.a?tn(f.a):'(folga)')}${f.a?tlogo(f.a):''}</span>${b}</div>`;
}
function addLeagueLogos(){
  if(!S)return;
  const L=leagues.find(l=>l.id===S.leagueId);if(!L)return;
  document.querySelectorAll('#season-box h3.t, #round-box h3.t').forEach(h=>{
    if(!h.querySelector('.lglogo'))h.insertAdjacentHTML('afterbegin',lgImg(L).replace('class="lglogo"','class="lglogo sm"'));
  });
}
function renderRoundBox(){
  const b=$('round-box');
  if(!S||S.champ){b.style.display='none';return}
  const all=curFix()||[];
  if(!all.some(f=>!f.r&&f.h&&f.a)){b.style.display='none';return}
  const up=all.map((f,i)=>f.r||!f.h||!f.a?'':fixRow(f,i,false)).join('');
  b.style.display='block';
  b.innerHTML=`<h3 class="t">${esc(S.name)}</h3><p style="color:var(--muted);margin-bottom:.6rem">${roundTitle()} — próximos jogos</p><div class="ticker-list" style="max-height:260px">${up}</div>`+(M&&M.ctx?'<button class="btn dng sm" style="margin-top:.7rem" onclick="giveUp()">Desistir desta partida</button>':'');
  addLeagueLogos();
}
function renderSeason(){
  const box=$('season-box');
  if(!S){box.innerHTML='';renderRoundBox();renderLgLineup();return}
  prepRound();
  const fx=curFix()||[];
  let h=`<div class="panel" style="margin-top:1.4rem"><h3 class="t">🏆 ${esc(S.name)} <small style="color:var(--muted);font-size:1rem">${FMT[S.format]}</small></h3>`;
  if(S.champ)h+=`<div class="champ">${tlogo(S.champ)}<div><small>CAMPEÃO</small><b>${esc(tn(S.champ))}</b></div></div>`;
  else h+=`<p style="color:var(--muted);margin-bottom:.7rem">${roundTitle()}</p>`;
  if(S.ko){
    const q=[...new Set(S.ko.rounds[0].flatMap(f=>[f.h,f.a]).filter(Boolean))],alive=new Set(S.champ?[S.champ]:(S.ko.rounds[S.ko.ri]||[]).flatMap(f=>[f.h,f.a]).filter(Boolean));
    h+=`<p style="color:var(--muted);font-size:.8rem;margin-bottom:.3rem">CLASSIFICADOS AO MATA-MATA</p><div class="chips" style="margin-bottom:.8rem">${q.map(id=>`<span class="chip ${alive.has(id)?'on':''}" style="${alive.has(id)?'':'opacity:.45'}">${esc(tn(id))}${S.coached.includes(id)?' ⭐':''}</span>`).join('')}</div>`;
  }
  h+=`<div class="ticker-list" style="max-height:none">${fx.map((f,i)=>fixRow(f,i,true)).join('')}</div>`;
  if(S.rounds.length){
    const tbl=`<table class="tb"><tr><th>#</th><th>Time</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>Pts</th></tr>${table().map((r,i)=>`<tr><td>${i+1}</td><td>${tlogo(r.id)}${esc(tn(r.id))}${S.coached.includes(r.id)?' ⭐':''}</td><td>${r.j}</td><td>${r.v}</td><td>${r.e}</td><td>${r.d}</td><td>${r.gp-r.gc}</td><td><b>${r.pts}</b></td></tr>`).join('')}</table>`;
    h+=S.ko?`<details style="margin-top:1rem"><summary style="cursor:pointer">Ver a fase de pontos corridos</summary>${tbl}</details>`:tbl;
  }
  if(S.ko){
    h+=`<h3 class="t" style="margin-top:1.2rem">Mata-mata</h3>`;
    S.ko.rounds.forEach(rd=>{const n=rd.length;h+=`<p style="color:var(--muted);margin:.6rem 0 .3rem">${n===1?'Final':n===2?'Semifinal':n===4?'Quartas de final':n===8?'Oitavas de final':'Fase de '+n*2}</p>`+rd.map(f=>fixRow(f,0,false)).join('')});
  }
  h+=`<button class="btn dng sm" style="margin-top:1rem" onclick="endSeason()">Encerrar temporada</button></div>`;
  box.innerHTML=h;renderRoundBox();addLeagueLogos();renderLgLineup();
}

/* ---------- escalação e tática da liga (não altera o clube) ---------- */
function lgSave(){
  const box=$('lg-lineup'),cur=box.dataset.team;
  if(M&&M.lg&&M.ctx&&(M.h.id===cur||M.a.id===cur))return toast('Não dá para mudar a escalação durante a partida desta equipe.');
  const f=$('lgl-f').value,atk=$('lgl-a').value,def=$('lgl-d').value;
  const F=FORMS[f]||[],tac={},used=new Set();
  for(let i=0;i<F.length;i++){
    const v=box.querySelector(`select[data-slot="${i}"]`).value;
    if(!v)continue;
    if(used.has(v))return toast('Um atleta não pode ocupar duas posições.');
    const p=players.find(x=>x.id===v);
    if(i===0&&p&&p.pos!=='GK')return toast('O goleiro precisa ser um atleta GK.');
    used.add(v);tac['s'+i]=v;
  }
  S.lu=S.lu||{};S.lu[cur]={formation:f,atk,def,tactics:tac};
  saveS();toast('Escalação da liga salva.');renderLgLineup();
}
function lgReset(){
  const cur=$('lg-lineup').dataset.team;
  if(S&&S.lu)delete S.lu[cur];saveS();toast('Escalação da liga voltou ao padrão do clube.');renderLgLineup();
}
function lgSelTeam(id){$('lg-lineup').dataset.team=id;renderLgLineup()}
function renderLgLineup(){
  const box=$('lg-lineup');if(!box)return;
  if(!S||!S.coached||!S.coached.length){box.innerHTML='';return}
  const ids=S.coached,cur=ids.includes(box.dataset.team)?box.dataset.team:ids[0];
  box.dataset.team=cur;
  const t=teamOf(cur);if(!t){box.innerHTML='';return}
  const E=(S.lu&&S.lu[cur])||{formation:t.formation||'4-3-3',atk:t.atk||'eq',def:t.def||'eq',tactics:{...(t.tactics||{})}};
  const F=FORMS[E.formation]||FORMS['4-3-3'];
  const roster=players.filter(p=>p.teamId===cur).sort(byPos);
  const fOpts=Object.keys(FORMS).map(k=>`<option value="${k}" ${k===E.formation?'selected':''}>${k}</option>`).join('');
  const aOpts=Object.entries(ATK).map(([k,v])=>`<option value="${k}" ${k===E.atk?'selected':''}>${v.n}</option>`).join('');
  const dOpts=Object.entries(DEF).map(([k,v])=>`<option value="${k}" ${k===E.def?'selected':''}>${v.n}</option>`).join('');
  const slots=F.map(([lb],i)=>{
    const pid=E.tactics['s'+i];
    const opts=roster.filter(p=>i===0?p.pos==='GK':true).map(p=>`<option value="${p.id}" ${p.id===pid?'selected':''}>${isSusV(p.id)?'🟥 ':''}${esc(p.name)} (${p.pos} ${p.ovr})</option>`).join('');
    return `<label style="display:flex;flex-direction:column;font-size:.75rem;color:var(--muted)">${i===0?'GK':lb}<select class="fc" data-slot="${i}" style="padding:.3rem .4rem"><option value="">(vazio)</option>${opts}</select></label>`;
  }).join('');
  box.innerHTML=`<div class="panel" style="margin-top:1rem"><h3 class="t">Escalação e tática na liga</h3>
    <p style="color:var(--muted);font-size:.85rem;margin-bottom:.6rem">Ajustes só valem para esta liga. O clube não é alterado. 🟥 = suspenso (precisa ser trocado antes de jogar).</p>
    <div class="row" style="gap:.5rem"><select id="lgl-team" class="fc" style="flex:1" onchange="lgSelTeam(this.value)">${ids.map(id=>`<option value="${id}" ${id===cur?'selected':''}>${esc(tn(id))}</option>`).join('')}</select>
      <select id="lgl-f" class="fc" style="flex:1">${fOpts}</select><select id="lgl-a" class="fc" style="flex:1">${aOpts}</select><select id="lgl-d" class="fc" style="flex:1">${dOpts}</select></div>
    <div class="lgl-grid">${slots}</div>
    <div class="row" style="margin-top:.8rem"><button class="btn" onclick="lgSave()">Salvar escalação da liga</button><button class="btn sec" onclick="lgReset()">Voltar ao padrão do clube</button></div></div>`;
}
