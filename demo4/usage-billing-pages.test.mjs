import test from 'node:test';
import assert from 'node:assert/strict';
import * as model from './src/model.js';
import {renderUsagePage} from './src/usage-ui.js';
import {createBillingUI} from './src/billing-ui.js';
import {billingAdapter,BILLING_CONFIG} from './src/billing-adapter.js';
const helpers={esc:String,btn:(text,action,cls='',extra='')=>`<button data-action="${action}" ${extra}>${text}</button>`,badge:text=>`<span>${text}</span>`,fmt:n=>String(n/1e9),date:value=>value||'—'};
const usage=s=>renderUsagePage({...helpers,state:s,model});
test('usage does not disclose billing and preserves missing measurement rather than showing zero',()=>{
 const s=model.seed();s.user='u1';const org=model.currentOrg(s);org.used=null;org.capacity=null;
 const html=usage(s);
 assert.match(html,/用量暂不可用/);assert.match(html,/最近更新 —/);assert.match(html,/请联系组织 Owner/);
 for(const secret of ['user0@example.com','账单接收邮箱','Visa','CNY','data-action="storagePurchase"'])assert(!html.includes(secret));
 org.used=0;org.capacity=10e9;assert.match(usage(s),/已用存储<\/small><strong>0 GB/);
});
test('usage storage routes retain project identity and missing history does not create fake trend values',()=>{
 const s=model.seed(),org=model.currentOrg(s);const html=usage(s);
 assert.match(html,/data-action="storagePurchase"/);assert.match(html,/data-id="freep0"/);
 assert.match(html,/暂无存储历史记录/);assert(!html.includes('usage-history-track'));
 org.storageHistory=[{at:'2026-11-01T00:00:00+08:00',bytes:1e9},{at:'2026-11-02T00:00:00+08:00',bytes:2e9}];
 assert.match(usage(s),/usage-history-track/);assert.match(usage(s),/不累加为累计消耗/);
});
test('billing renders separately, rechecks owner access and new purchase grants no resources',async()=>{
 const s=model.seed(),org=model.currentOrg(s);let resolve;
 const loaded=new Promise(r=>resolve=r);
 const ui=createBillingUI({...helpers,state:()=>s,model,modal:()=>{},close:()=>{},render:()=>resolve(),save:()=>{},toast:()=>{}});
 ui.content();await loaded;const html=ui.content();
 assert.match(html,/当前订阅/);assert.match(html,/订单与付款记录/);assert.match(html,/data-page="usage"/);
 assert(!html.includes('存储占用趋势'));assert(!html.includes('按项目查看'));
 const capacity=org.capacity;const checkout=await billingAdapter.createCheckoutSession(s);
 assert.equal((await billingAdapter.getBill(s,checkout.orderId)).totalMinor,BILLING_CONFIG.plan.amountMinor);
 assert.equal(org.capacity,capacity);assert.equal(org.paid,false);
 s.user='u1';assert.equal(ui.content(),'');assert.equal(ui.action('billingStorage',{}),true);
});
