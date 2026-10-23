/* ===================== LOGO / BOLA ===================== */
const BOT_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
<defs><linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#18202C"/><stop offset="50%" stop-color="#10151E"/><stop offset="100%" stop-color="#080B12"/></linearGradient>
<linearGradient id="steelMetal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8A99AD"/><stop offset="50%" stop-color="#4A5568"/><stop offset="100%" stop-color="#2D3748"/></linearGradient>
<linearGradient id="whiteTech" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="70%" stop-color="#EDF2F7"/><stop offset="100%" stop-color="#CBD5E1"/></linearGradient>
<filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter></defs>
<g transform="translate(250, 250)">
<circle cx="0" cy="0" r="175" fill="none" stroke="url(#steelMetal)" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
<circle cx="0" cy="0" r="145" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.7" filter="url(#whiteGlow)"/>
<line x1="0" y1="-190" x2="0" y2="190" stroke="url(#steelMetal)" stroke-width="2" opacity="0.3"/><line x1="-190" y1="0" x2="190" y2="0" stroke="url(#steelMetal)" stroke-width="2" opacity="0.3"/>
<polygon points="0,-165 135,-80 135,80 0,165 -135,80 -135,-80" fill="url(#darkBg)" stroke="#FFFFFF" stroke-width="3" filter="url(#whiteGlow)"/>
<polygon points="0,-150 120,-72 120,72 0,150 -120,72 -120,-72" fill="none" stroke="url(#steelMetal)" stroke-width="2" opacity="0.6"/>
<path d="M 0,-125 L 32,-35 L 120,-35 L 48,18 L 76,105 L 0,52 L -76,105 L -48,18 L -120,-35 L -32,-35 Z" fill="#000000" opacity="0.5" transform="translate(0, 6)"/>
<polygon points="0,-125 0,0 32,-35" fill="url(#whiteTech)"/><polygon points="120,-35 0,0 48,18" fill="url(#whiteTech)"/><polygon points="76,105 0,0 0,52" fill="url(#whiteTech)"/>
<polygon points="-76,105 0,0 -48,18" fill="#E2E8F0"/><polygon points="-120,-35 0,0 -32,-35" fill="#E2E8F0"/>
<polygon points="0,-125 0,0 -32,-35" fill="url(#steelMetal)"/><polygon points="-120,-35 0,0 -48,18" fill="#2D3748"/><polygon points="-76,105 0,0 0,52" fill="url(#steelMetal)"/>
<polygon points="76,105 0,0 48,18" fill="#4A5568"/><polygon points="120,-35 0,0 32,-35" fill="#4A5568"/>
<circle cx="0" cy="-165" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/><circle cx="135" cy="-80" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/><circle cx="-135" cy="-80" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/>
<circle cx="135" cy="80" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/><circle cx="-135" cy="80" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/><circle cx="0" cy="165" r="5" fill="#FFFFFF" filter="url(#whiteGlow)"/>
</g></svg>`;
const BOT_URL='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(BOT_SVG);
const BALL_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="bg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#aab4c2"/></radialGradient></defs><circle cx="50" cy="50" r="47" fill="url(#bg)" stroke="#1a1f27" stroke-width="3"/><g stroke="#1a1f27" stroke-width="3"><line x1="50" y1="34" x2="50" y2="8"/><line x1="65.2" y1="45.2" x2="92" y2="35"/><line x1="59.4" y1="63.1" x2="78" y2="90"/><line x1="40.6" y1="63.1" x2="22" y2="90"/><line x1="34.8" y1="45.2" x2="8" y2="35"/></g><polygon points="50,34 65.2,45.2 59.4,63.1 40.6,63.1 34.8,45.2" fill="#1a1f27"/><g fill="#1a1f27"><circle cx="50" cy="6" r="6"/><circle cx="94" cy="34" r="6"/><circle cx="78" cy="92" r="6"/><circle cx="22" cy="92" r="6"/><circle cx="6" cy="34" r="6"/></g></svg>`;
const BALL_URL='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(BALL_SVG);
(function(){
  const lk=document.createElement('link');lk.rel='icon';lk.type='image/svg+xml';lk.href=BOT_URL;document.head.appendChild(lk);
  document.head.insertAdjacentHTML('beforeend',`<style>.ball{background-image:url("${BALL_URL}")!important}.htb{background-image:url("${BALL_URL}")!important}</style>`);
  document.querySelector('header .logo').innerHTML=`<img class="botimg" src="${BOT_URL}" alt="">Stars Simulator`;
  const ico=document.querySelector('#m-coach .mcard>div');if(ico)ico.innerHTML=`<img src="${BOT_URL}" alt="" style="width:110px;height:110px">`;
  const h1=document.querySelector('.hero h1');if(h1)h1.insertAdjacentHTML('beforebegin',`<img src="${BOT_URL}" alt="" style="width:96px;height:96px;margin-bottom:1rem;display:block">`);
  $('pitch').insertAdjacentHTML('afterbegin',`<img class="wm" src="${BOT_URL}" alt="">`);
  $('lg-prev').src=PH;
})();
