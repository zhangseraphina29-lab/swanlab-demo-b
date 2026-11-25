const plans = [
 {id:'free',name:'Free',label:'公有云免费版',intro:'开始记录实验',month:0,year:0,button:'免费开始',capacity:'资源额度待定',includes:'协作权限：',groups:[['组织协作',['公开、组织成员可见项目','基础组织角色','不提供新增指定成员项目和权限组']]]},
 {id:'team',name:'Team',label:'公有云付费版',intro:'按组织订阅，统一管理项目协作',button:'了解 Team',capacity:'价格与资源额度待定',includes:'权限组与项目授权：',groups:[['协作权限',['指定成员项目','权限组按项目配置现有角色','多来源有效权限与撤销预览']]]},
 {id:'enterprise',name:'Enterprise',label:'私有化部署',intro:'按部署和合同确定交付范围',button:'联系销售',capacity:'许可、资源和服务按合同确定',includes:'付费协作能力：',groups:[['组织权限',['权限组与指定成员项目按合同授权和交付']]]}
];
const notes=['套餐权益以当前组织为单位，其他组织付费不会解锁当前组织。','资源包不解锁指定成员项目与权限组。','已有授权不因到期或降级直接清空；保留期限及修改限制待定。','本期不支持自定义项目角色或权限动作勾选。'];
export function createPricingUI({modal,esc,org,toast}) {
 let annual=false;
 const price=p=>p.id==='enterprise'?'按合同报价':p.id==='team'?'价格待定':`<span class="pricing-currency">¥</span>${p[annual?'year':'month'].toLocaleString('en-US')}<small>/ 组织 / ${annual?'年':'月'}</small>`;
 function cards(){return plans.map(p=>`<article class="pricing-card"><header><h3>${p.name}<span>${p.label}</span></h3><p class="pricing-description">${p.intro}</p></header><div class="pricing-price">${price(p)}</div><p class="pricing-saving">${annual?(p.save?`较按月付费节省 ¥${p.save.toLocaleString('en-US')}`:p.id==='free'?'永久免费':'联系销售获取方案'):'按组织订阅'}</p><button type="button" class="${p.id==='team'?'primary':'pricing-outline'}" data-pricing-plan="${p.id}">${p.button}</button><strong class="pricing-capacity">${p.capacity}</strong><div class="pricing-benefits"><p class="pricing-includes">${p.includes}</p>${p.groups.map(([title,items])=>`<section><h4>${title}${p.id==='enterprise'&&title==='企业安全'?'<small>规划中</small>':''}</h4><ul>${items.map(item=>`<li><span aria-hidden="true">✓</span>${item}</li>`).join('')}</ul></section>`).join('')}</div></article>`).join('');}
 function open(){
  modal('为你的实验，选择合适的计划',`<div class="pricing-intro"><div><p>从记录第一个实验，到组织协作与规模化管理。</p><span class="pricing-org">${esc(org().name)} · 组织订阅</span></div><span class="pricing-preview">方案预览</span></div><div class="pricing-cycle"><div role="group" aria-label="计费周期"><button type="button" data-pricing-cycle="month" aria-pressed="${!annual}">按月付费</button><button type="button" data-pricing-cycle="year" aria-pressed="${annual}">按年付费</button></div><span>计费细则待定</span></div><div class="pricing-grid">${cards()}</div><footer class="pricing-notes"><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul><p>价格与容量为待确认方案，当前仅预览，不会扣款或更改组织权益。高级能力仅在交付后可用，具体资源额度与到期规则尚待确认。私有化部署另行报价。</p></footer>`,'',dialog=>{
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
