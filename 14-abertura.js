/* ===================== ABERTURA ANIMADA ===================== */
(function(){
  try{
    const ov=document.createElement('div');ov.id='intro';
    ov.innerHTML=`<canvas id="intro-cv"></canvas><div class="in-c"><div class="in-ring"></div><img class="in-logo" src="${BOT_URL}" alt=""><div class="in-t">${'STARS SIMULATOR'.split('').map((c,i)=>`<span style="animation-delay:${1+i*.06}s">${c===' '?'&nbsp;':c}</span>`).join('')}</div><div class="in-s">FUTEBOL • TÁTICA • EMOÇÃO</div></div><div class="in-skip">TOQUE PARA PULAR</div>`;
    document.body.appendChild(ov);
    let raf=0,done=false;
    const cv=$('intro-cv'),g=cv.getContext('2d');
    const W=cv.width=innerWidth,H=cv.height=innerHeight,R=Math.max(W,H)*.7;
    const st=Array.from({length:260},()=>({a:Math.random()*6.283,r:Math.random()*R,s:.4+Math.random()*1.6,t:Math.random()*6}));
    const t0=performance.now();
    function f(now){
      const t=(now-t0)/1000,warp=Math.max(0,1.7-t)/1.7;
      g.fillStyle='rgba(5,7,11,'+(warp>0?.28:.5)+')';g.fillRect(0,0,W,H);
      st.forEach(s=>{
        const pr=s.r;s.r+=(.6+warp*22)*s.s;if(s.r>R){s.r=Math.random()*40;s.a=Math.random()*6.283}
        const x=W/2+Math.cos(s.a)*s.r,y=H/2+Math.sin(s.a)*s.r,al=Math.min(1,s.r/(R*.4));
        if(warp>.05){g.strokeStyle='rgba(255,255,255,'+al*.9+')';g.lineWidth=s.s;g.beginPath();g.moveTo(W/2+Math.cos(s.a)*pr,H/2+Math.sin(s.a)*pr);g.lineTo(x,y);g.stroke()}
        else{g.fillStyle='rgba(255,255,255,'+al*(.45+.45*Math.sin(t*3+s.t))+')';g.fillRect(x,y,s.s,s.s)}
      });
      if(!done)raf=requestAnimationFrame(f);
    }
    raf=requestAnimationFrame(f);
    const end=()=>{
      if(done)return;done=true;ov.classList.add('out');
      const c=document.querySelector('#m-coach .mcard');if(c)c.classList.add('enter');
      setTimeout(()=>{cancelAnimationFrame(raf);ov.remove()},950);
    };
    ov.addEventListener('click',end);
    setTimeout(end,3700);
  }catch(e){const i=$('intro');if(i)i.remove();console.error(e)}
})();
