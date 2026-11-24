export function mountAuthParticles(){
 const host=document.querySelector('.auth-particle-field');if(!host)return;
 const canvas=host.querySelector('canvas'),ctx=canvas.getContext('2d');
 if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const pointer={x:-1000,y:-1000},particles=[];
 let width=0,height=0,frame=0,last=0,time=0,burst=0,foreground='',guide='',accent='',disposed=false;
 let seed=2718;
 const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
 function colors(){const css=getComputedStyle(host);foreground=css.color;guide=css.getPropertyValue('--particle-guide').trim();accent=css.getPropertyValue('--particle-accent').trim();}
 function resize(){const box=host.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);width=box.width;height=box.height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);colors();if(reduced.matches)draw(0,true);}
 function guides(){
  const left=width*.12,right=width*.88,top=height*.15,bottom=height*.85;
  ctx.strokeStyle=guide;ctx.lineWidth=.7;
  ctx.setLineDash([]);ctx.beginPath();
  for(const x of [left,width*.43,width*.57,right]){ctx.moveTo(x,top-18);ctx.lineTo(x,bottom+18);}
  for(const y of [top,bottom]){ctx.moveTo(left-22,y);ctx.lineTo(right+22,y);}
  ctx.stroke();ctx.setLineDash([2,6]);ctx.beginPath();
  for(let i=1;i<24;i++){const x=left+(right-left)*i/24;ctx.moveTo(x,top-18);ctx.lineTo(x,top);ctx.moveTo(x,bottom);ctx.lineTo(x,bottom+18);}
  for(let i=1;i<13;i++){const y=top+(bottom-top)*i/13;ctx.moveTo(left-22,y);ctx.lineTo(left,y);ctx.moveTo(right,y);ctx.lineTo(right+22,y);}
  ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=foreground;ctx.globalAlpha=.45;
  for(const [x,y] of [[left,top],[right,bottom],[width*.43,top-18],[width*.57,bottom+18]]){ctx.beginPath();ctx.arc(x,y,1.2,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
 }
 function draw(delta,staticFrame=false){
  if(!width||!height)return;
  time+=delta;ctx.clearRect(0,0,width,height);guides();
  const size=Math.min(width*.56,height*.76),cx=width*.5,cy=height*.5;
  const cycle=time%20000,morph=staticFrame?0:cycle<13000?0:Math.sin(Math.PI*(cycle-13000)/7000)**2;
  const tilt=staticFrame?0:Math.sin(time*.00035)*.045;
  burst*=.91;
  for(const p of particles){
   const angle=p.angle+time*.000055,radius=.33+p.depth*.12;
   const orbitX=Math.cos(angle)*radius,orbitY=Math.sin(angle)*radius*.8;
   let x=p.homeX*(1-morph)+orbitX*morph,y=p.homeY*(1-morph)+orbitY*morph;
   const targetX=cx+(x*Math.cos(tilt)-y*Math.sin(tilt))*size,targetY=cy+(x*Math.sin(tilt)+y*Math.cos(tilt))*size;
   if(staticFrame||p.x===null){p.x=targetX;p.y=targetY;p.vx=p.vy=0;}
   else{
    const dx=p.x-pointer.x,dy=p.y-pointer.y,distance=Math.hypot(dx,dy),range=85;
    if(distance<range&&distance>0){const force=(1-distance/range)*2.5;p.vx+=dx/distance*force;p.vy+=dy/distance*force;}
    p.vx+=(targetX-p.x)*.045+Math.cos(p.angle)*burst*.35;
    p.vy+=(targetY-p.y)*.045+Math.sin(p.angle)*burst*.35;
    p.vx*=.82;p.vy*=.82;p.x+=p.vx;p.y+=p.vy;
   }
   ctx.globalAlpha=p.alpha;ctx.fillStyle=p.accent?accent:foreground;ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;
 }
 function tick(now){if(disposed)return;frame=requestAnimationFrame(tick);if(document.hidden||reduced.matches){last=now;return;}if(now-last<30)return;const delta=Math.min(now-last||33,50);last=now;draw(delta);}
 host.onpointermove=e=>{if(!fine.matches||reduced.matches)return;const box=host.getBoundingClientRect();pointer.x=e.clientX-box.left;pointer.y=e.clientY-box.top;};
 host.onpointerleave=()=>{pointer.x=pointer.y=-1000;};
 host.onpointerdown=()=>{if(!reduced.matches)burst=7;};
 const themeObserver=new MutationObserver(()=>{colors();if(reduced.matches)draw(0,true);});
 themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-palette']});
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
 const motionChange=()=>{pointer.x=pointer.y=-1000;draw(0,reduced.matches);};reduced.addEventListener('change',motionChange);
 const removalObserver=new MutationObserver(()=>{if(host.isConnected)return;disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();themeObserver.disconnect();removalObserver.disconnect();reduced.removeEventListener('change',motionChange);});
 removalObserver.observe(document.querySelector('#app'),{childList:true});
 const image=new Image();image.onload=()=>{
  if(disposed)return;
  const mask=document.createElement('canvas');mask.width=mask.height=128;
  const painter=mask.getContext('2d');painter.drawImage(image,0,0,128,128);const pixels=painter.getImageData(0,0,128,128).data,points=[];
  for(let y=2;y<126;y++)for(let x=2;x<126;x++)if(pixels[(y*128+x)*4+3]>100)points.push([x,y]);
  for(let i=0;i<1800&&points.length;i++){const [x,y]=points[Math.floor(random()*points.length)];particles.push({homeX:(x+random()-.5)/128-.5,homeY:(y+random()-.5)/128-.5,angle:random()*Math.PI*2,depth:random(),radius:.55+random()*.65,alpha:.35+random()*.55,accent:pixels[(y*128+x)*4]>pixels[(y*128+x)*4+1]*1.3,x:null,y:null,vx:0,vy:0});}
  resize();draw(0,true);frame=requestAnimationFrame(tick);
 };image.src='assets/swanlab-logo-dark.png';
 resize();
}
