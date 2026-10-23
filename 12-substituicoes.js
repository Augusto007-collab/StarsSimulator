/* ===================== SUBSTITUIÇÕES (arrastar e soltar) ===================== */
function openSub(side,force){
  const gk=M.gkMode;
  if(!force&&!gk&&M.status!=='paused'&&M.status!=='break')return toast('Use uma parada técnica ou espere o intervalo para substituir.');
  if(!gk&&M.subs[side]<=0)return toast('Limite de 5 substituições esgotado.');
  const l=side==='home'?M.lh:M.la;
  if(!gk&&(!l.on.length||!l.bench.length))return toast('Não há reservas disponíveis.');
  M.side=side;M.forced=force||(gk?{gk:1}:null);
  const outs=force?[force]:(gk?[...l.on].filter(p=>p.pos!=='GK'):[...l.on]).sort(byPos);
  const ins=gk==='pick'?[]:(gk?l.bench.filter(p=>p.pos==='GK'):[...l.bench]).sort(byPos);
  $('sub-out').innerHTML=outs.map(p=>`<option value="${p.id}">${esc(p.name)} (${p.pos} - ${p.ovr})</option>`).join('');
  $('sub-in').innerHTML=ins.map(p=>`<option value="${p.id}">${esc(p.name)} (${p.pos} - ${p.ovr})</option>`).join('');
  sdBuild(outs,ins,gk==='pick'?'pick':'sub');
  $('sub-title').textContent=gk?'🧤 Goleiro expulso — escolha a substituição':force?'🚑 Lesão — substituição obrigatória':'Realizar substituição';
  $('sub-close').style.display=(force||gk)?'none':'';
  $('m-sub').classList.add('on');
}
function closeSub(){$('m-sub').classList.remove('on');if(M)M.gkMode=null}
function confirmSub(){
  const side=M.side,l=side==='home'?M.lh:M.la;
  const out=l.on.find(p=>p.id===$('sub-out').value),inn=l.bench.find(p=>p.id===$('sub-in').value);
  if(!out||!inn)return;
  const forced=M.forced;M.forced=null;closeSub();
  swapPlayer(side,out,inn,!forced);btns();
}
function sdBuild(outs,ins,mode){
  let box=$('sub-drag');
  const fg=$('sub-out').closest('.fg');
  if(!box){box=document.createElement('div');box.id='sub-drag';fg.parentNode.insertBefore(box,fg)}
  fg.style.display='none';$('sub-in').closest('.fg').style.display='none';
  const outHtml=outs.map(p=>`<div class="chip dropzone" data-drop="o${p.id}" style="display:block;${mode==='pick'?'cursor:pointer':''}" ${mode==='pick'?`onclick="subPick('${p.id}')"`:''}>${esc(p.pos)} • ${esc(p.name)} (${p.ovr})</div>`).join('');
  const inHtml=ins.map(p=>`<div class="chip on" data-drag="${p.id}" data-ctx="sub" style="display:block;cursor:grab">${esc(p.pos)} • ${esc(p.name)} (${p.ovr})</div>`).join('')||'<span style="color:var(--muted)">Nenhum reserva disponível.</span>';
  box.innerHTML=`<p style="color:var(--muted);font-size:.85rem;margin-bottom:.6rem">${mode==='pick'?'Sem goleiro no banco: toque no atleta de linha que vai para o gol.':'Arraste um reserva sobre o jogador que sai.'}</p>
  <div class="row" style="gap:.8rem;align-items:flex-start;flex-wrap:nowrap">
    <div style="flex:1;min-width:0"><div style="color:var(--muted);font-size:.8rem;text-transform:uppercase;margin-bottom:.3rem">Em campo (sai)</div><div style="display:flex;flex-direction:column;gap:.35rem">${outHtml}</div></div>
    ${mode==='pick'?'':`<div style="flex:1;min-width:0"><div style="color:var(--muted);font-size:.8rem;text-transform:uppercase;margin-bottom:.3rem">No banco (entra)</div><div style="display:flex;flex-direction:column;gap:.35rem">${inHtml}</div></div>`}
  </div>`;
}
function subDrop(pid,drop){
  if(!drop||drop[0]!=='o'||!M)return;
  const oid=drop.slice(1),side=M.side,l=side==='home'?M.lh:M.la;
  if(M.gkMode==='pick'){const p=l.on.find(x=>x.id===oid);if(!p)return;closeSub();gkSet(side,p);return}
  if(!pid)return;
  $('sub-out').value=oid;$('sub-in').value=pid;confirmSub();
}
function subPick(oid){subDrop('','o'+oid)}
let mSig='';
function renderMBoard(){
  const box=$('mboard');if(!box||!M||!M.h||!M.a)return;
  const show=['paused','break','injury'].includes(M.status);
  box.style.display=show?'block':'none';
  if(!show){box.innerHTML='';mSig='';return}
  const sig=M.status+'|'+M.subs.home+M.subs.away+M.pauses.home+M.pauses.away+'|'+M.lh.on.map(p=>p.id).join()+'|'+M.la.on.map(p=>p.id).join()+'|'+M.lh.bench.map(p=>p.id).join()+'|'+M.la.bench.map(p=>p.id).join();
  if(sig===mSig)return;
  mSig=sig;
  box.innerHTML=['home','away'].filter(s=>M.ctl[s]).map(s=>{
    const l=s==='home'?M.lh:M.la,t=s==='home'?M.h:M.a,F=FORMS[t.formation]||FORMS['4-3-3'];
    const slots=F.map(([lb,x,y],i)=>{
      const p=l.on[i];
      return `<div class="mslot dropzone ${lb==='GK'?'gk':''}" data-drop="m${s}:${i}" style="left:${x}%;top:${y}%">${p?`<span data-drag="${p.id}" data-ctx="mt" data-src="slot" style="cursor:grab">${esc(p.name.split(' ').pop())}</span><small>${esc(p.pos)} ${p.ovr}</small>`:'<small>vazio</small>'}</div>`;
    }).join('');
    const bench=l.bench.map(p=>`<span class="chip on" data-drag="${p.id}" data-ctx="mt" data-src="bench" style="cursor:grab">${esc(p.pos)} • ${esc(p.name)} (${p.ovr})</span>`).join('')||'<span style="color:var(--muted)">Sem reservas</span>';
    return `<div class="mteam">${esc(t.name)} • trocas ${M.subs[s]} • paradas ${M.pauses[s]}</div><div class="mpitch">${slots}</div><div class="mbench">${bench}</div>`;
  }).join('');
}
function mDrop(pid,src,drop){
  if(!drop||drop[0]!=='m')return;
  const [side,iStr]=drop.slice(1).split(':');const i=+iStr;
  if(!['paused','break','injury'].includes(M.status))return toast('Substituições só com o jogo parado.');
  const l=side==='home'?M.lh:M.la;
  if(src==='bench'){
    const inn=l.bench.find(x=>x.id===pid),out=l.on[i];
    if(!inn||!out)return;
    if(M.subs[side]<=0)return toast('Limite de 5 substituições esgotado.');
    if(inn.pos==='GK'&&out.pos!=='GK')return toast('O goleiro reserva só pode entrar no gol.');
    if(out.pos==='GK'&&inn.pos!=='GK')return toast('Só um goleiro pode substituir o goleiro.');
    swapPlayer(side,out,inn,true);
    return;
  }
  const j=l.on.findIndex(x=>x.id===pid);
  if(j<0||j===i||!l.on[i])return;
  const a=l.on[j],b=l.on[i];
  if((a.pos==='GK'&&i!==0)||(b.pos==='GK'&&j!==0))return toast('O goleiro fica na posição de GK.');
  l.on[j]=b;l.on[i]=a;
  tick(`🔁 ${(side==='home'?M.h:M.a).name}: ${a.name} e ${b.name} trocam de posição (${clock()})`);
  mSig='';renderMBoard();
}
/* Arrastar e soltar (mouse e toque) */
const dropAt=(x,y)=>{const el=document.elementFromPoint(x,y);return el?el.closest('.dropzone'):null};
document.addEventListener('pointerdown',e=>{
  const s=e.target.closest&&e.target.closest('[data-drag]');if(!s)return;
  const ctx=s.dataset.ctx,id=s.dataset.drag,src=s.dataset.src;
  const sx=e.clientX,sy=e.clientY;let moved=false,g=null;
  const mv=ev=>{
    if(!moved){if(Math.hypot(ev.clientX-sx,ev.clientY-sy)<6)return;moved=true;g=document.createElement('div');g.className='drag-ghost';g.textContent=s.textContent.trim();document.body.appendChild(g)}
    g.style.left=ev.clientX+'px';g.style.top=ev.clientY+'px';
    document.querySelectorAll('.dropzone.over').forEach(x=>x.classList.remove('over'));
    const t=dropAt(ev.clientX,ev.clientY);if(t)t.classList.add('over');
  };
  const up=ev=>{
    window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);
    if(g)g.remove();
    document.querySelectorAll('.dropzone.over').forEach(x=>x.classList.remove('over'));
    if(!moved)return;
    const t=dropAt(ev.clientX,ev.clientY);if(!t)return;
    if(ctx==='tac')tacDrop(id,t.dataset.drop);
    else if(ctx==='mt')mDrop(id,src,t.dataset.drop);
    else if(ctx==='sub')subDrop(id,t.dataset.drop);
  };
  window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up);
});
