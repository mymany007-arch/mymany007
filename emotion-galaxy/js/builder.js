(function(){const $=s=>document.querySelector(s),T=['Повод','Содержание','Оформление','Готово'];let step=0,S;
function init(cat){const c=EG.CATS[cat];S={cat,to:'',from:'',title:c.h,msg:c.m,photos:[],font:'serif',theme:c.t,music:{kind:'cosmos'},anim:'burst',date:''};
 ['to','from','title','msg','date'].forEach(k=>$('#'+k).value=S[k]||'');$('#font').value='serif';$('#music').value='cosmos';$('#anim').value='burst';$('#murl').value='';$('#urlWrap').hidden=true;$('#result').hidden=true;photos();themes();show(1);EG.builder.ready=true}
function show(n){step=n;document.querySelectorAll('.pane').forEach(p=>p.hidden=+p.dataset.s!==n);
 $('#prog').innerHTML=T.map((t,i)=>`<span class="${i<=n?'on':''}">${t}</span>`).join('');$('#back').hidden=n===0;$('#next').hidden=n===3;
 if(n===0)EG.cards($('#cats'),k=>init(k))}
function themes(){const w=$('#themes');w.innerHTML='';Object.entries(EG.THEMES).forEach(([k,c])=>{const b=document.createElement('button');b.type='button';b.className='sw'+(S.theme===k?' on':'');b.style.background=`linear-gradient(135deg,${c[0]},${c[1]})`;b.setAttribute('aria-label',k);b.onclick=()=>{S.theme=k;EG.galaxy.setColors(c[0],c[1]);themes()};w.appendChild(b)})}
function photos(){const w=$('#photoList');w.innerHTML='';S.photos.forEach((p,i)=>{const r=document.createElement('div'),im=new Image(),ip=document.createElement('input'),x=document.createElement('button');r.className='ph';im.src=p.src;ip.placeholder='Подпись';ip.value=p.cap;ip.oninput=()=>p.cap=ip.value;x.textContent='✕';x.type='button';x.onclick=()=>{S.photos.splice(i,1);photos()};r.append(im,ip,x);w.appendChild(r)})}
function shrink(f){return new Promise(res=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,520/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.68))};im.src=fr.result};fr.readAsDataURL(f)})}
function collect(){['to','from','title','msg','date'].forEach(k=>S[k]=$('#'+k).value.trim());S.font=$('#font').value;S.anim=$('#anim').value;S.music={kind:$('#music').value,url:$('#murl').value.trim()};return JSON.parse(JSON.stringify(S))}
$('#photos').onchange=async e=>{for(const f of e.target.files){if(S.photos.length>=4){EG.toast('Максимум 4 фото');break}S.photos.push({src:await shrink(f),cap:''})}e.target.value='';photos()};
$('#music').onchange=e=>$('#urlWrap').hidden=e.target.value!=='url';
$('#next').onclick=()=>{if(step===1){collect();if(!S.to)return EG.toast('Укажи имя получателя');if(!S.msg)return EG.toast('Напиши сообщение')}show(step+1)};
$('#back').onclick=()=>show(step-1);
$('#prev').onclick=()=>EG.viewer.open(collect(),{preview:true});
$('#pub').onclick=async()=>{const b=$('#pub');b.disabled=true;try{const u=await EG.storage.save(collect());$('#link').value=u;$('#openL').href=u;$('#result').hidden=false;EG.toast('Эмоция создана')}catch(e){EG.toast('Ошибка сохранения: '+e.message)}b.disabled=false};
$('#copy').onclick=()=>{$('#link').select();navigator.clipboard.writeText($('#link').value).then(()=>EG.toast('Ссылка скопирована'))};
$('#share').onclick=()=>navigator.share?navigator.share({title:S.title,url:$('#link').value}).catch(()=>{}):$('#copy').click();
EG.builder={ready:false,start(cat){init(cat)}};})();
