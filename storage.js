(function(){const C=window.EG_CONFIG,sb=()=>C.supabaseUrl&&C.supabaseKey;
const H=()=>({apikey:C.supabaseKey,Authorization:'Bearer '+C.supabaseKey,'Content-Type':'application/json'});
const rid=()=>Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-3);
const enc=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_');
const dec=s=>JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const lset=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const base=()=>location.href.split('#')[0];
EG.storage={
 async save(d){d.id=rid();d.created=Date.now();let url;
  if(sb()){const r=await fetch(C.supabaseUrl+'/rest/v1/emotions',{method:'POST',headers:H(),body:JSON.stringify({id:d.id,data:d})});if(!r.ok)throw new Error('Supabase '+r.status);url=base()+'#/e/'+d.id}
  else url=base()+'#/g/'+enc(d);
  lset('eg_g_'+d.id,d);lset('eg_count',ls('eg_count',0)+1);
  this.keep(d,url,false);return url},
 keep(d,url,saved){const m=ls('eg_mine',[]).filter(x=>x.id!==d.id);m.unshift({id:d.id,title:d.title,to:d.to,url,saved});lset('eg_mine',m.slice(0,30))},
 mine:()=>ls('eg_mine',[]),count:()=>12480+ls('eg_count',0),
 async load(kind,key){if(kind==='g')return dec(key);
  if(sb()){const r=await fetch(C.supabaseUrl+'/rest/v1/emotions?id=eq.'+encodeURIComponent(key)+'&select=data',{headers:H()});const j=await r.json();if(j[0])return j[0].data}
  return ls('eg_g_'+key,null)},
 async reply(id,from,text){
  if(sb()){const x=await fetch(C.supabaseUrl+'/rest/v1/replies',{method:'POST',headers:H(),body:JSON.stringify({emotion_id:id,sender:from,text})});if(!x.ok)throw new Error('reply')}
  else{const a=ls('eg_r_'+id,[]);a.push({from,text});lset('eg_r_'+id,a)}},
 async replies(id){if(sb()){try{const r=await fetch(C.supabaseUrl+'/rest/v1/replies?emotion_id=eq.'+id+'&select=sender,text',{headers:H()});return(await r.json()).map(x=>({from:x.sender,text:x.text}))}catch(e){return[]}}
  return ls('eg_r_'+id,[])}};})();
