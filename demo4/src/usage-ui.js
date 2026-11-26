export function renderUsagePage({state:s,model,esc,btn,badge,fmt,date}){
 const org=model.currentOrg(s),owner=model.isOwner(s),r=model.checkCapacity(org);
 const known=Number.isFinite(org.used)&&Number.isFinite(org.capacity)&&org.capacity>0;
 const quantity=value=>Number.isFinite(value)?fmt(value)+' GB':'—';
 const link=(text,page)=>btn(text,'nav','small ghost',`data-page="${page}"`);
 const section=(title,body,action='')=>`<section class="billing-section"><div class="row between usage-section-heading"><h3>${title}</h3>${action}</div>${body}</section>`;
 const buy=owner?btn('购买存储包','storagePurchase','small'):'<span class="billing-secondary">购买资源请联系组织 Owner</span>';
 const updated=org.usageUpdatedAt?date(org.usageUpdatedAt):'—';
 const warning=!known||r.status==='normal'?'':`<div class="billing-usage-alert" role="status"><strong>${r.status==='full'?'组织存储容量已满':'组织存储容量即将用尽'}</strong><p>${r.status==='full'?'新增实验和文件上传已暂停，可读取和清理已有数据。':'可管理项目存储，或购买存储包增加容量。'}${owner?'':' 请联系组织 Owner 处理。'}</p></div>`;
 const metric=(label,value)=>`<div><small>${label}</small><strong>${value}</strong></div>`;
 const packs=(org.storagePacks||[]).filter(p=>p.status==='active');
 const packBytes=packs.reduce((n,p)=>n+p.capacityBytes,0);
 const storage=`<div class="billing-box">${warning}<div class="billing-usage-stats">${metric('已用存储',quantity(org.used))}${metric('总容量',quantity(org.capacity))}${metric('剩余容量',known?quantity(Math.max(0,org.capacity-org.used)):'—')}</div><div class="row between wrap">${badge(!known?'用量暂不可用':r.status==='full'?'容量已满':r.status==='warning'?'接近上限':'容量充足',!known?'':r.status==='normal'?'green':r.status==='full'?'red':'amber')}<span class="billing-secondary">当前占用快照 · 最近更新 ${esc(updated)}</span></div>${known?`<div class="bar ${r.status}" role="progressbar" aria-label="存储占用" aria-valuenow="${Math.min(100,Math.max(0,Math.round(r.ratio*100)))}" aria-valuemin="0" aria-valuemax="100" aria-valuetext="${quantity(org.used)} / ${quantity(org.capacity)}"><i style="width:${Math.min(100,r.ratio*100)}%"></i></div>`:''}<div class="usage-compact-facts"><span>基础容量 ${known?quantity(Math.max(0,org.capacity-packBytes)):'—'}</span><span>有效存储包 ${quantity(packBytes)}</span><span>1 GB = 1,000,000,000 字节</span></div><div class="usage-compact-facts"><span>项目 ${org.projects.length} 个</span>${link('成员 '+org.members.filter(m=>m.status==='active').length+' 人','members')}</div></div>`;
 const projects=org.projects.filter(p=>model.canAccessProject(s,p,org));
 const details=projects.length?`<div class="tablewrap"><table><thead><tr><th>项目</th><th>当前存储</th><th>最近更新</th><th>操作</th></tr></thead><tbody>${projects.map(p=>`<tr><td>${esc(p.name)}</td><td>${quantity(p.bytes)}</td><td class="member-date">${esc(date(p.lastExperimentAt||p.updated))}</td><td>${btn('管理存储','usageProject','small ghost',`data-id="${esc(p.id)}"`)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="billing-empty">暂无可展示的项目存储</div>';
 const recycleCount=(org.recycle||[]).length;
 const history=(org.storageHistory||[]).filter(point=>Number.isFinite(point.bytes)&&Number.isFinite(Date.parse(point.at)));
 const trend=history.length>1?`<div class="billing-box"><div class="usage-history" aria-label="存储占用趋势">${history.map(point=>`<div><span class="usage-history-track"><i style="height:${Math.max(1,point.bytes/Math.max(...history.map(p=>p.bytes))*100)}%"></i></span><strong>${quantity(point.bytes)}</strong><small>${esc(date(point.at))}</small></div>`).join('')}</div><p class="billing-secondary">每个时间点为存储占用快照，不累加为累计消耗。</p></div>`:'<div class="billing-empty">暂无存储历史记录<p class="billing-secondary">有历史快照后展示占用趋势。</p></div>';
 return `<p class="billing-org-context">${esc(org.name)}</p>`+section('当前资源',storage,`<div class="row wrap">${link('管理存储','projectAdmin')}${buy}</div>`)
 +section('存储占用趋势',trend)
 +section('按项目查看',details)
 +section('用量限制状态','<div class="billing-box usage-limit-placeholder"><h4>速率与连接限制</h4><p class="billing-secondary">暂未接入限制统计。</p></div>')
 +`<div class="usage-bottom-grid">${section('回收站',`<div class="billing-box"><strong>${recycleCount} 个待清理项目</strong><p class="billing-secondary">${org.paid?'Team · 保留 90 天':'Free · 保留 30 天'}</p>${link('进入回收站','trash')}</div>`)}${section('资源包状态',`<div class="billing-box">${packs.length?packs.map(p=>`<div class="billing-fact"><span>${quantity(p.capacityBytes)}</span><span>到期 ${esc(date(p.expiresAt))}</span></div>`).join(''):'<p class="billing-secondary">暂无有效存储包</p>'}${owner?link('前往账单管理','billing'):'<p class="billing-secondary">购买资源请联系组织 Owner</p>'}</div>`)}</div>`;
}
