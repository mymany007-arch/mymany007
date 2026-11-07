(function(){let ctx,nodes=[],audio;
const CH={cosmos:[110,164.8,220,261.6,329.6],tender:[130.8,196,261.6,329.6,392,493.9]};
EG.music={stop(){nodes.forEach(o=>{try{o.stop()}catch(e){}});nodes=[];if(audio){audio.pause();audio=null}},
 play(m){this.stop();if(!m||m.kind==='none')return;
  if(m.kind==='url'){if(m.url){audio=new Audio(m.url);audio.loop=true;audio.volume=.6;audio.play().catch(()=>{})}return}
  ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume();
  const out=ctx.createGain();out.gain.value=0;out.gain.linearRampToValueAtTime(.12,ctx.currentTime+4);
  const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;out.connect(lp);lp.connect(ctx.destination);
  (CH[m.kind]||CH.cosmos).forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain(),l=ctx.createOscillator(),lg=ctx.createGain();
   o.type=i%2?'triangle':'sine';o.frequency.value=f;g.gain.value=.25;l.frequency.value=.07+i*.03;lg.gain.value=.12;
   l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(out);o.start();l.start();nodes.push(o,l)})}};})();
