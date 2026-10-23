/* ===================== SELEÇÃO DE EQUIPES (liga → clube) ===================== */
function tOptsFor(lg){
  const list=teams.filter(t=>lgOf(t.id)===lg).sort(byN);
  return list.map(t=>`<option value="${t.id}">${esc(t.name)} (${esc(t.code)})</option>`).join('')||'<option value="">Nenhum time nesta liga</option>';
}
function renderOvr(){
  ['home','away'].forEach(s=>{
    const el=$('ovr-'+s),t=teamOf($('sel-'+s).value);if(!el)return;
    if(!t){el.innerHTML='';return}
    const ps=players.filter(p=>p.teamId===t.id).map(boost),avg=ps.length?ps.reduce((a,p)=>a+p.ovr,0)/ps.length:0;
    el.innerHTML=`<img src="${esc(t.logo)}" onerror="this.src='${PH}'" alt=""><div style="min-width:0;flex:1"><b style="font:700 1rem var(--fs);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(t.name)}</b><small style="color:var(--muted);font-size:.7rem">${ps.length} atleta(s)</small></div><div class="ov">${avg?avg.toFixed(1):'--'}<small>OVR médio</small></div>`;
  });
}
function renderStadium(){
  const t=teamOf($('sel-home').value);
  $('stadbg').style.backgroundImage=t&&t.stadiumImg?`url("${t.stadiumImg}")`:'none';
  $('stadinfo').textContent=t?`🏟️ ${t.stadium||'Estádio não informado'}${t.fans?' • '+(+t.fans).toLocaleString('pt-BR')+' torcedores':''}`:'';
}
function fillSelects(){
  teams.sort(byN);
  const ids=[...new Set(teams.map(t=>lgOf(t.id)))];
  const lgs=ids.map(id=>({id,name:id==='__none'?'Sem liga':leagues.find(l=>l.id===id).name})).sort((a,b)=>a.name.localeCompare(b.name,'pt'));
  const cur={home:$('sel-home').value,away:$('sel-away').value};
  ['home','away'].forEach(s=>{
    const lgEl=$('lg-'+s),tEl=$('sel-'+s),ct=teamOf(cur[s]);
    lgEl.innerHTML=lgs.map(o=>`<option value="${o.id}">${esc(o.name)}</option>`).join('')||'<option value="">Nenhuma liga</option>';
    let L=ct?lgOf(ct.id):(lgs[0]?lgs[0].id:'');
    if(!lgs.some(o=>o.id===L))L=lgs[0]?lgs[0].id:'';
    lgEl.value=L;tEl.innerHTML=tOptsFor(L);
    if(ct&&lgOf(ct.id)===L)tEl.value=ct.id;
  });
  if($('sel-away').value===$('sel-home').value){const alt=[...$('sel-away').options].find(o=>o.value&&o.value!==$('sel-home').value);if(alt)$('sel-away').value=alt.value}
  const pv=$('p-team').value,fv=$('f-club').value;
  $('p-team').innerHTML=teams.map(t=>`<option value="${t.id}">${esc(t.name)} (${esc(t.code)})</option>`).join('')||'<option value="">Nenhum time cadastrado</option>';
  $('p-team').value=teamOf(pv)?pv:(teams[0]?teams[0].id:'');
  $('f-club').innerHTML='<option value="">Todos os clubes</option>'+teams.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');
  $('f-club').value=teamOf(fv)?fv:'';
  renderOvr();
}
function lgPick(s){
  $('sel-'+s).innerHTML=tOptsFor($('lg-'+s).value);
  if($('sel-home').value===$('sel-away').value){const alt=[...$('sel-away').options].find(o=>o.value&&o.value!==$('sel-home').value);if(alt)$('sel-away').value=alt.value}
  onTeamChange();
}
function syncLg(s,tid){
  if(!teamOf(tid))return;const L=lgOf(tid);
  $('lg-'+s).value=L;$('sel-'+s).innerHTML=tOptsFor(L);$('sel-'+s).value=tid;
}
function refreshAll(){
  fillSelects();fillTeamSelects();renderTeams();renderPlayers();renderTactics();renderLeagues();renderSeason();stats();onTeamChange();renderStadium();renderTotwHome();
}
