/* ===================== INICIALIZAÇÃO ===================== */
document.querySelectorAll('.modal').forEach(m=>{
  if(m.id==='m-coach')return;
  m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('on')});
});
window.addEventListener('error',e=>console.error('[Stars] erro:',e.message,e.filename,e.lineno));
rebuildSnap();
if(currentUser===ADMIN_NAME&&sessionStorage.getItem('stars_auth')!=='1'){currentUser='';sessionStorage.removeItem('stars_user')}
applyVis();
refreshAll();
if(currentUser){$('user-name').textContent=currentUser;$('m-coach').classList.remove('on')}
applyRole();pvChips();
twRender();renderTotwHome();renderLogs();renderLgLineup();
try{localStorage.setItem("__t","1");localStorage.removeItem("__t")}catch(e){alert("⚠️ Seu navegador está bloqueando o armazenamento local: nada será salvo. Abra o jogo pelo GitHub Pages (https) ou fora do modo anônimo, ou conecte a nuvem no botão ☁️.")}
setTimeout(sync,800);
