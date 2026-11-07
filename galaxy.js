(function(){const cv=document.getElementById('galaxy'),fx=document.getElementById('fx'),c2=fx.getContext('2d');
const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);
const N=24000,pos=new Float32Array(N*3),col=new Float32Array(N*3),rad=new Float32Array(N);
for(let i=0;i<N;i++){const r=Math.pow(Math.random(),1.6)*8,arm=(i%4)/4*Math.PI*2,a=arm+r*.6,s=(Math.random()-.5)*.35*(r/3+.3);
 pos[i*3]=Math.cos(a)*r+s*2;pos[i*3+1]=(Math.random()-.5)*.5*Math.exp(-r/4);pos[i*3+2]=Math.sin(a)*r+s*2;rad[i]=r/8}
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
const m=new THREE.PointsMaterial({size:.045,vertexColors:true,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});
const gal=new THREE.Points(g,m);gal.rotation.x=.35;S.add(gal);
function setColors(a,b){const A=new THREE.Color(a),B=new THREE.Color(b),c=new THREE.Color();for(let i=0;i<N;i++){c.copy(A).lerp(B,Math.min(1,rad[i]*1.3));col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b}g.attributes.color.needsUpdate=true}
function size(){const w=innerWidth,h=innerHeight;R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(w,h,false);fx.width=w;fx.height=h;cam.aspect=w/h;cam.position.z=w<700?13:9;cam.updateProjectionMatrix()}
cam.position.set(0,5,9);addEventListener('resize',size);size();setColors(...EG.THEMES.aurora);
let mx=0,my=0,heavy=false,P=[],stars=[];
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
for(let i=0;i<90;i++)stars.push({x:Math.random(),y:Math.random(),r:Math.random()*1.2+.2,s:Math.random()*.0002+.00005});
function shoot(){P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight*.5,vx:-9,vy:5,l:60,m:1})}
setInterval(()=>{if(!document.hidden&&Math.random()<.35)shoot()},1800);
setInterval(()=>{if(heavy&&!document.hidden)shoot()},250);
function frame(t){gal.rotation.y+=.0007;cam.position.x+=(mx*2-cam.position.x)*.03;cam.position.y+=(5-my*2-cam.position.y)*.03;cam.lookAt(0,0,0);R.render(S,cam);
 c2.clearRect(0,0,fx.width,fx.height);c2.fillStyle='#fff';
 stars.forEach(s=>{s.y=(s.y+s.s*16)%1;c2.globalAlpha=.4+.4*Math.sin(t/700+s.x*20);c2.beginPath();c2.arc(s.x*fx.width,s.y*fx.height,s.r,0,6.3);c2.fill()});
 P=P.filter(p=>(p.l--)>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.m){c2.strokeStyle='#fff';c2.globalAlpha=p.l/60;c2.beginPath();c2.moveTo(p.x,p.y);c2.lineTo(p.x-p.vx*6,p.y-p.vy*6);c2.stroke()}else{p.vy+=.05;c2.fillStyle=p.c;c2.globalAlpha=p.l/70;c2.beginPath();c2.arc(p.x,p.y,p.r,0,6.3);c2.fill()}});
 requestAnimationFrame(frame)}requestAnimationFrame(frame);
EG.galaxy={setColors,reveal(){gsap.fromTo(m,{opacity:0},{opacity:.95,duration:3.5,ease:'power2.out'});gsap.fromTo(gal.scale,{x:.1,y:.1,z:.1},{x:1,y:1,z:1,duration:4,ease:'expo.out'})}};
EG.fx={burst(x,y,c){for(let i=0;i<110;i++){const a=Math.random()*6.3,v=Math.random()*6+1;P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-2,l:70,r:Math.random()*2.5+.8,c:c[i%2]})}},meteors(on){heavy=on}};
EG.galaxy.reveal();})();
