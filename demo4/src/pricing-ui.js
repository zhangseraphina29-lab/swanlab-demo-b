const plans = [
 {id:'free',name:'Free',label:'免费版',intro:'免费开始，和团队一起记录实验',month:0,year:0,button:'免费开始',capacity:'10 GB 组织存储',includes:'包含以下权益：',groups:[['实验追踪',['记录实验指标、日志与媒体','查看图表，对比实验结果','最多 10 个项目']],['组织协作',['最多 10 名组织成员','支持公开、组织成员可见项目','基础组织角色管理']],['用量与支持',['基础存储用量统计','社区支持']]]},
 {id:'pro',name:'Pro',label:'专业版',intro:'让团队持续积累与共享实验成果',month:199,year:1990,save:398,button:'升级 Pro',capacity:'200 GB 组织存储',includes:'包含 Free 全部权益，以及：',groups:[['更多容量与项目',['项目数量不限','最多 100 名组织成员']],['指定成员协作',['解锁指定成员项目','按项目选择可访问的组织成员','基础项目授权管理']],['用量与支持',['详细用量统计与导出','存储用量预警','邮件技术支持']]]},
 {id:'team',name:'Team',label:'团队版',intro:'为高频实验与团队治理提供更多支持',month:999,year:9990,save:1998,button:'升级 Team',capacity:'1 TB 组织存储',includes:'包含 Pro 全部权益，以及：',groups:[['更大规模的实验记录',['最多 100 名组织成员','项目数量不限','更高的 API / SDK 写入配额']],['团队治理',['完整项目授权管理','成员变更记录']],['服务支持',['优先技术支持','企业采购与开票服务','服务等级约定']]]},
 {id:'enterprise',name:'Enterprise',label:'企业版',intro:'按需配置企业安全与服务能力',button:'联系销售',capacity:'定制组织存储与服务方案',includes:'包含 Team 全部权益，可按合同配置：',groups:[['容量与数据管理',['按需配置存储容量与保留周期','数据迁移支持']],['企业安全',['SSO 单点登录','SCIM 成员同步','完整审计日志']],['专属服务',['专属技术支持','定制 SLA 与采购方案']]]}
];
const notes=['所有套餐均以组织为单位订阅；注册后引导创建组织。','Free 最多 10 名成员，付费套餐最多 100 名成员；只读成员也占用成员名额，待接受邀请预留名额。','所有套餐均不支持 Guest。项目协作者需先加入组织。','Free 仅支持公开、组织成员可见项目；Pro 起支持指定成员项目。','存储额度由组织内所有项目共享。'];
export function createPricingUI({modal,esc,org,toast}) {
 let annual=false;
 const price=p=>p.id==='enterprise'?'定制报价':`<span class="pricing-currency">¥</span>${p[annual?'year':'month'].toLocaleString('en-US')}<small>/ 组织 / ${annual?'年':'月'}</small>`;
 function cards(){return plans.map(p=>`<article class="pricing-card"><header><h3>${p.name}<span>${p.label}</span></h3><p class="pricing-description">${p.intro}</p></header><div class="pricing-price">${price(p)}</div><p class="pricing-saving">${annual?(p.save?`较按月付费节省 ¥${p.save.toLocaleString('en-US')}`:p.id==='free'?'永久免费':'联系销售获取方案'):'按组织订阅'}</p><button type="button" class="${p.id==='pro'||p.id==='team'?'primary':'pricing-outline'}" data-pricing-plan="${p.id}">${p.button}</button><strong class="pricing-capacity">${p.capacity}</strong><div class="pricing-benefits"><p class="pricing-includes">${p.includes}</p>${p.groups.map(([title,items])=>`<section><h4>${title}${p.id==='enterprise'&&title==='企业安全'?'<small>规划中</small>':''}</h4><ul>${items.map(item=>`<li><span aria-hidden="true">✓</span>${item}</li>`).join('')}</ul></section>`).join('')}</div></article>`).join('');}
 function open(){
  modal('为你的实验，选择合适的计划',`<div class="pricing-intro"><div><p>从记录第一个实验，到组织协作与规模化管理。</p><span class="pricing-org">${esc(org().name)} · 组织订阅</span></div><span class="pricing-preview">方案预览</span></div><div class="pricing-cycle"><div role="group" aria-label="计费周期"><button type="button" data-pricing-cycle="month" aria-pressed="${!annual}">按月付费</button><button type="button" data-pricing-cycle="year" aria-pressed="${annual}">按年付费</button></div><span>年付享 10 个月价格</span></div><div class="pricing-grid">${cards()}</div><footer class="pricing-notes"><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul><p>价格与容量为待确认方案，当前仅预览，不会扣款或更改组织权益。高级能力仅在交付后可用，Team 写入配额、审计、SSO、SCIM 等尚待确认。私有化部署另行报价。</p></footer>`,'',dialog=>{
   dialog.classList.add('pricing-dialog');
   dialog.querySelector('.pricing-cycle').addEventListener('click',e=>{
    const button=e.target.closest('[data-pricing-cycle]');if(!button)return;
    annual=button.dataset.pricingCycle==='year';
    dialog.querySelectorAll('[data-pricing-cycle]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.pricingCycle==='year')===annual)));
    dialog.querySelector('.pricing-grid').innerHTML=cards();
   });
   dialog.querySelector('.pricing-grid').addEventListener('click',e=>{
    const button=e.target.closest('[data-pricing-plan]');if(!button)return;
    const p=plans.find(p=>p.id===button.dataset.pricingPlan);
    if(p.id==='free'){toast('免费版无需订阅，当前组织权益保持不变');return;}
    modal(p.id==='enterprise'?'联系销售':`升级 ${p.name}`,`<div class="pricing-selection"><p>${esc(org().name)} · ${p.label}</p><strong>${price(p)}</strong><p>${p.capacity}</p><p>${p.id==='enterprise'?'销售联系渠道尚未配置，暂不发送咨询。':'此套餐价格与权益待最终确认，暂未接入结账。不会创建订单或更改当前订阅。'}</p><button type="button" class="primary" id="pricing-return">返回套餐</button></div>`,'',d=>{d.querySelector('#pricing-return').onclick=open;});
   });
  });
 }
 return {open};
}
