// Original implementation based on the public Ghost Type interaction reference.
export function mountAuthMotion(){
 const root=document.querySelector('.auth-story');if(!root)return;
 const prefix=root.querySelector('[data-ghost-prefix]'),ending=root.querySelector('[data-ghost-ending]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const intro='让每一次实验，',suggestions=['都有迹可循。','都能连接发现。','都能携手向前。'];
 let index=0,count=0,phase='thinking',elapsed=0,hover=false;
 const sync=()=>{prefix.textContent=intro;ending.textContent=reduced.matches?suggestions[0]:'';phase='thinking';count=0;elapsed=0;root.dataset.ghostPhase=reduced.matches?'static':phase;};
 root.querySelector('.auth-story-title').onpointerenter=()=>hover=true;
 root.querySelector('.auth-story-title').onpointerleave=()=>hover=false;
 reduced.addEventListener('change',sync);sync();
 const timer=setInterval(()=>{
  if(!root.isConnected){clearInterval(timer);reduced.removeEventListener('change',sync);return;}
  if(reduced.matches||hover||document.hidden)return;
  elapsed+=50;
  if(phase==='thinking'&&elapsed>=600){phase='suggesting';count=0;elapsed=0;root.dataset.ghostPhase=phase;}
  else if(phase==='suggesting'&&elapsed>=85){elapsed=0;ending.textContent=suggestions[index].slice(0,++count);if(count>=suggestions[index].length)phase='waiting';}
  else if(phase==='waiting'&&elapsed>=1200){phase='accepted';elapsed=0;root.dataset.ghostPhase=phase;}
  else if(phase==='accepted'&&elapsed>=2400){phase='clearing';elapsed=0;root.dataset.ghostPhase=phase;}
  else if(phase==='clearing'&&elapsed>=350){index=(index+1)%suggestions.length;ending.textContent='';phase='thinking';elapsed=0;root.dataset.ghostPhase=phase;}
 },50);
}
