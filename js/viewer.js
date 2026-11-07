(function(){const v=document.getElementById('viewer');let D,pv,timer,stage;
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=s=>v.querySelector(s);
function scene(html,then){const old=stage,n=document.createElement('div');n.className='scr';n.innerHTML=html;
 const put=()=>{if(old)old.remove();stage=n;v.appendChild(n);gsap.from(n.children,{opacity:0,y:30,stagger:.15,duration:1});then&&then(n)};
 old?gsap.to(old,{opacity:0,duration:.5,onComplete:put}):put()}
function open(d,o){close();D=d;pv=!!o.preview;const t=EG.THEMES[d.theme]||EG.THEMES.aurora,c=EG.CATS[d.cat]||EG.CATS.custom;
 v.style.setProperty('--a1',t[0]);v.style.setProperty('--a2',t[1]);v.dataset.font=d.font||'serif';EG.galaxy.setColors(t[0],t[1]);EG.galaxy.reveal();
 v.hidden=false;v.innerHTML='<div class="veil"></div><button class="x" id="vx" aria-label="Закрыть">✕</button>';
 $('#vx').onclick=()=>{pv?close():location.hash='#/'};gsap.to($('.veil'),{opacity:0,duration:3,delay:.3,onComplete:()=>$('.veil').remove()});
 scene(`<p class="small">${c.i} ${esc(c.n)}</p><h2>Подарок для ${esc(d.to)}</h2><button class="btn" id="go">Открыть ✨</button>`,s=>s.querySelector('#go').onclick=envelope)}
function envelope(){EG.music.play(D.music);
 if(D.anim==='meteors')EG.fx.meteors(true);
 scene(`<div class="env tilt" id="env"><div class="flap"></div><div class="paper"></div><div class="pocket"><span>${esc(D.to)}</span></div></div><p class="small">Нажми на конверт</p>`,s=>{
  const e=s.querySelector('#env');e.onclick=()=>{e.onclick=null;const tl=gsap.timeline();
   tl.to(e.querySelector('.flap'),{rotationX:-180,duration:.9,ease:'power2.inOut'}).to(e.querySelector('.paper'),{y:-90,duration:.7},'-=.2')
   .add(()=>{if(D.anim==='burst')EG.fx.burst(innerWidth/2,innerHeight/2,[getComputedStyle(v).getPropertyValue('--a1'),'#fff'])}).add(letter,'+=.6')}})}
function letter(){const d=D.date?new Date(D.date).toLocaleString('ru',{dateStyle:'long',timeStyle:'short'}):'';
 scene(`<article class="letter tilt"><small>${esc(d)}</small><h3>${esc(D.title)}</h3><p id="typed"></p><button class="btn" id="nx" hidden>Дальше</button></article>`,s=>{
  const p=s.querySelector('#typed'),txt=D.msg||'';let i=0;clearInterval(timer);
  timer=setInterval(()=>{p.textContent=txt.slice(0,++i);if(i>=txt.length){clearInterval(timer);const b=s.querySelector('#nx');b.hidden=false;b.onclick=D.photos&&D.photos.length?polaroids:finale}},txt.length>400?15:32);
  s.querySelector('.letter').onclick=()=>{i=txt.length}})}
function polaroids(){scene(`<div class="polas">${D.photos.map((p,i)=>`<figure style="--r:${(i%2?1:-1)*(2+i*2)}deg"><img src="${esc(p.src)}" alt=""><figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div><button class="btn" id="nx">Дальше</button>`,s=>{
 s.querySelector('#nx').onclick=finale;gsap.from(s.querySelectorAll('figure'),{y:120,opacity:0,rotation:25,stagger:.4,duration:1,ease:'back.out(1.4)'})})}
function finale(){const c=EG.CATS[D.cat]||EG.CATS.custom;EG.fx.burst(innerWidth/2,innerHeight/2,[getComputedStyle(v).getPropertyValue('--a1'),getComputedStyle(v).getPropertyValue('--a2')]);
 scene(`<div class="big">${c.i}</div><h2>${esc(D.title)}</h2><p class="from">${D.from?'С любовью, '+esc(D.from):''}</p>
 ${pv?'<button class="btn ghost" id="cl">Закрыть</button>':`<div class="reply"><textarea id="rt" rows="2" placeholder="Напиши ответ…"></textarea><button class="btn sm" id="rs">Отправить ответ</button></div>
 <div class="acts"><button class="btn sm ghost" id="cp">Скопировать ссылку</button><button class="btn sm ghost" id="sh">Поделиться</button><button class="btn sm ghost" id="sv">💾 Сохранить</button><button class="btn sm ghost" id="rp">↻ Ещё раз</button></div>`}`,s=>{
 const q=x=>s.querySelector(x);if(pv){q('#cl').onclick=close;return}
 q('#rs').onclick=async()=>{const t=q('#rt').value.trim();if(!t)return EG.toast('Напиши пару слов');try{await EG.storage.reply(D.id,D.to,t);q('#rt').value='';EG.toast('Ответ отправлен создателю')}catch(e){EG.toast('Не удалось отправить')}};
 q('#cp').onclick=()=>navigator.clipboard.writeText(location.href).then(()=>EG.toast('Ссылка скопирована'));
 q('#sh').onclick=()=>navigator.share?navigator.share({title:D.title,url:location.href}).catch(()=>{}):q('#cp').click();
 q('#sv').onclick=()=>{EG.storage.keep(D,location.href,true);EG.toast('Сохранено в «Мои эмоции»')};
 q('#rp').onclick=()=>open(D,{preview:false})})}
function close(){clearInterval(timer);EG.music.stop();EG.fx&&EG.fx.meteors(false);v.hidden=true;v.innerHTML='';stage=null}
addEventListener('pointermove',e=>{if(v.hidden)return;gsap.to(v.querySelectorAll('.tilt'),{rotationY:(e.clientX/innerWidth-.5)*14,rotationX:-(e.clientY/innerHeight-.5)*14,transformPerspective:900,duration:.6})});
EG.viewer={open,close};})();
