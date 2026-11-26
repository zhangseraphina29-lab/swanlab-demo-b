export function storageTrendSeries(org,now){
 if(Array.isArray(org.storageHistory))return {simulated:false,points:org.storageHistory.filter(p=>Number.isFinite(p.bytes)&&p.bytes>=0&&Number.isFinite(Date.parse(p.at))).toSorted((a,b)=>Date.parse(a.at)-Date.parse(b.at))};
 if(!['free','paid','trial'].includes(org.id)||!Number.isFinite(org.used)||org.used<0||!Number.isFinite(Date.parse(now)))return {simulated:false,points:[]};
 const factors=[.42,.48,.60,.58,.72,.84,1];
 return {simulated:true,points:factors.map((factor,i)=>({at:new Date(Date.parse(now)-(6-i)*86400000).toISOString(),bytes:Math.round(org.used*factor)}))};
}

export function renderStorageTrend({series,esc,fmt}){
 const {points,simulated}=series;
 if(points.length<2)return '<div class="billing-empty">暂无存储历史记录<p class="billing-secondary">有历史快照后展示占用趋势。</p></div>';
 const width=720,left=48,right=20,top=20,bottom=174;
 const maximum=Math.max(1,...points.map(p=>p.bytes/1e9)),step=maximum<=5?1:maximum<=20?2:Math.ceil(maximum/4),ceiling=Math.ceil(maximum/step)*step;
 const x=i=>left+i*(width-left-right)/(points.length-1),y=bytes=>bottom-(bytes/1e9/ceiling)*(bottom-top);
 const line=points.map((p,i)=>`${i?'L':'M'}${x(i).toFixed(1)},${y(p.bytes).toFixed(1)}`).join(' ');
 const day=at=>new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit'}).format(new Date(at));
 const ticks=Array.from({length:5},(_,i)=>ceiling*i/4);
 const latest=points.at(-1);
 return `<div class="billing-box usage-trend"><div class="row between wrap"><span class="billing-secondary">${simulated?'模拟数据 · 最近 7 天':'历史存储占用'}</span><span class="usage-trend-latest">最新 <strong>${fmt(latest.bytes)} GB</strong></span></div><div class="usage-trend-scroll"><svg class="usage-trend-chart" viewBox="0 0 720 214" role="img" aria-label="${simulated?'模拟':'历史'}存储占用趋势，${esc(day(points[0].at))} 至 ${esc(day(latest.at))}，最新 ${fmt(latest.bytes)} GB"><text x="0" y="12" class="usage-trend-label">GB</text>${ticks.map(v=>{const py=y(v*1e9);return `<line x1="${left}" y1="${py}" x2="${width-right}" y2="${py}" class="usage-trend-grid"/><text x="${left-10}" y="${py+4}" text-anchor="end" class="usage-trend-label">${Number(v.toFixed(1))}</text>`;}).join('')}<path d="${line} L${x(points.length-1)},${bottom} L${left},${bottom} Z" class="usage-trend-area"/><path d="${line}" class="usage-trend-line"/>${points.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p.bytes)}" r="3" class="usage-trend-point"><title>${esc(day(p.at))} · ${fmt(p.bytes)} GB</title></circle>`).join('')}${points.filter((_,i)=>points.length<=8||i%Math.ceil(points.length/7)===0||i===points.length-1).map(p=>`<text x="${x(points.indexOf(p))}" y="200" text-anchor="middle" class="usage-trend-label">${esc(day(p.at))}</text>`).join('')}</svg></div><p class="billing-secondary">${simulated?'图表为演示快照，不代表真实计量。':'每个时间点为存储占用快照，不累加为累计消耗。'}</p></div>`;
}
