/* ===================== ATLETAS ===================== */
function savePlayer(e){
  e.preventDefault();
  if(!isAdmin())return toast(MSG_ADM);
  const teamId=$('p-team').value;if(!teamId)return toast('Cadastre um clube antes de criar atletas.');
  const ovr=Math.min(99,Math.max(40,parseInt($('p-ovr').value)||40));
  const p={id:editPlayerId||uid(),name:$('p-name').value.trim(),teamId,ovr,pos:$('p-pos').value,foot:$('p-foot').value,skills:3,photo:$('p-photo').value.trim()||PH,author:currentUser};
  const old=players.find(x=>x.id===p.id),i=players.findIndex(x=>x.id===p.id);
  if(i>=0){players[i]=p;log('Editou o atleta: '+p.name)}else{players.push(p);log('Cadastrou o atleta: '+p.name+' ('+teamOf(teamId).name+')')}
  if(old&&old.teamId!==teamId){const ot=teamOf(old.teamId);if(ot){Object.keys(ot.tactics||{}).forEach(k=>{if(ot.tactics[k]===p.id)delete ot.tactics[k]});store('stars_teams',teams)}}
  if(!store('stars_players',players))return;
  resetPlayer();refreshAll();toast('Atleta salvo.');
}
function editPlayer(id){
  if(!isAdmin())return;
  const p=players.find(x=>x.id===id);if(!p)return;
  editPlayerId=id;$('p-name').value=p.name;$('p-team').value=p.teamId;$('p-ovr').value=p.ovr;$('p-pos').value=p.pos;$('p-foot').value=p.foot||'Direita';$('p-photo').value=p.photo===PH?'':p.photo;
  $('pl-title').textContent='Editar atleta';$('p-cancel').style.display='inline-flex';
}
function resetPlayer(){editPlayerId=null;$('p-name').value=$('p-photo').value='';$('p-ovr').value=75;$('p-pos').value='GK';$('p-foot').value='Direita';$('pl-title').textContent='Cadastrar atleta';$('p-cancel').style.display='none'}
function deletePlayer(id,ev){
  if(ev)ev.stopPropagation();
  if(!isAdmin())return toast(MSG_ADM);
  const p=players.find(x=>x.id===id);if(!p)return;
  askConfirm(`Excluir o atleta "${p.name}"?`,()=>{
    players=players.filter(x=>x.id!==id);
    teams.forEach(t=>Object.keys(t.tactics||{}).forEach(k=>{if(t.tactics[k]===id)delete t.tactics[k]}));
    Object.keys(tactics).forEach(k=>{if(tactics[k]===id)delete tactics[k]});
    store('stars_players',players);store('stars_teams',teams);log(`Excluiu o atleta: ${p.name}`);
    if(editPlayerId===id)resetPlayer();refreshAll();
  });
}
function renderPlayers(){
  const q=$('f-search').value.trim().toLowerCase(),c=$('f-club').value;
  const list=players.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!c||p.teamId===c)).sort(byPos);
  $('players-grid').innerHTML=list.length?list.map(p=>futCard(p,{click:`editPlayer('${p.id}')`,actions:`<div class="acts"><button class="btn dng sm" onclick="deletePlayer('${p.id}',event)">🗑️ Excluir</button></div>`})).join(''):'<p style="color:var(--muted);grid-column:1/-1">Nenhum atleta encontrado.</p>';
}
