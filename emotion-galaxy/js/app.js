(function(){const $=s=>document.querySelector(s);
EG.toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2200)};
document.addEventListener('click',e=>{if(e.target.closest('[data-go]'))location.hash='#/create'});
EG.cards=(el,fn)=>{el.innerHTML='';Object.entries(EG.CATS).forEach(([k,c])=>{const b=document.createElement('button');b.className='cat glass';b.innerHTML=`<span>${c.i}</span>${c.n}`;b.onclick=()=>fn(k);el.appendChild(b)})};
EG.cards($('#homeCats'),k=>{EG.builder.start(k);location.hash='#/create'});
EG.EXAMPLES.forEach(d=>{const b=document.createElement('button');b.className='cat glass';b.innerHTML=`<span>${EG.CATS[d.cat].i}</span>${d.title}<small>для ${d.to}</small>`;b.onclick=()=>EG.viewer.open(d,{preview:true});$('#examples').appendChild(b)});
async function renderMine(){const L=$('#mineList'),m=EG.storage.mine();$('#mine').hidden=!m.length;L.innerHTML='';
 for(const x of m){const r=document.createElement('div'),a=document.createElement('a'),s=document.createElement('span'),rp=await EG.storage.replies(x.id);r.className='row';
  a.href=x.url;a.textContent=(x.saved?'💾 ':'')+(x.title||'Без названия')+' — '+(x.to||'');s.textContent=rp.length?'Ответы: '+rp.map(y=>(y.from||'Аноним')+': '+y.text).join(' | '):'';r.append(a,s);L.appendChild(r)}}
async function route(){const h=location.hash,m=h.match(/^#\/(e|g)\/(.+)$/);
 EG.viewer.close();$('#cnt').textContent=EG.storage.count().toLocaleString('ru');
 $('#home').hidden=h==='#/create'||!!m;$('#builder').hidden=h!=='#/create';
 if(h==='#/create'&&!EG.builder.ready)EG.builder.start('birthday');
 if(m){try{const d=await EG.storage.load(m[1],m[2]);if(!d)throw 0;EG.viewer.open(d,{})}catch(e){EG.toast('Подарок не найден. Проверь ссылку.');location.hash='#/'}}
 else{await renderMine();h==='#/mine'?$('#mine').scrollIntoView():scrollTo(0,0)}}
addEventListener('hashchange',route);window.addEventListener('load',route);})();
