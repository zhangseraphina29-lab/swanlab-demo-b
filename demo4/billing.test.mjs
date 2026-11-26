import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,currentOrg} from './src/model.js';
import {billingAdapter as api,money,BILLING_CONFIG} from './src/billing-adapter.js';

test('billing denies non-owners and allows administrator usage',async()=>{
 const s=seed();s.user='u1';assert.equal(api.getUsage(s).orgId,'free');
 for(const user of ['u1','u2','u3','anonymous']){
  s.user=user;
  await assert.rejects(api.getBilling(s),/Owner/);
  await assert.rejects(api.listBills(s),/Owner/);
  await assert.rejects(api.createCheckoutSession(s),/Owner/);
  await assert.rejects(api.updateEmail(s,'demo@example.com'),/Owner/);
 }
 assert.equal(currentOrg(s).billingV1,undefined);
});
test('pending checkout is idempotent and grants no capacity',async()=>{
 const s=seed(),org=currentOrg(s),capacity=org.capacity;
 const a=await api.createCheckoutSession(s),b=await api.createCheckoutSession(s);
 assert.equal(a.orderId,b.orderId);assert.equal(org.billingV1.bills.length,1);
 assert.equal(org.capacity,capacity);assert.equal(org.paid,false);
 assert.equal((await api.queryPaymentResult(s,a.orderId)).verified,false);
 await assert.rejects(api.getDocument(s,a.orderId,'invoice'),/暂无凭证/);
});
test('renewal cancellation, failure and resume preserve entitlements',async()=>{
 const s=seed();api.setScene(s,'active');const org=currentOrg(s),capacity=org.capacity;
 await assert.rejects(api.createCheckoutSession(s),/无需重复/);
 assert.equal((await api.setRenewal(s,false)).status,'cancelled');
 s.requestFailure=true;await assert.rejects(api.setRenewal(s,true),/失败/);
 assert.equal(org.billingV1.subscription.status,'cancelled');
 s.requestFailure=false;assert.equal((await api.setRenewal(s,true)).status,'active');
 assert.equal(org.capacity,capacity);
});
test('email edits preserve historical snapshots and refund/payment independence',async()=>{
 const s=seed();api.setScene(s,'refunded');const first=(await api.listBills(s)).items[0];
 await api.updateEmail(s,'  billing@example.com  ');
 assert.equal((await api.getBilling(s)).profile.email,'billing@example.com');
 const bill=await api.getBill(s,first.id);
 assert.equal(bill.billingSnapshot.email,first.billingSnapshot.email);
 assert.equal(bill.paymentStatus,'paid');assert.equal(bill.refund.status,'refunded');
 assert.equal(bill.totalMinor,BILLING_CONFIG.plan.amountMinor);assert.equal(bill.refund.amountMinor,BILLING_CONFIG.plan.amountMinor);
 await assert.rejects(api.updateEmail(s,'bad'),/有效/);
});
test('pagination, load error, retry and cross-organization isolation',async()=>{
 const s=seed();api.setScene(s,'active');
 const a=await api.listBills(s),b=await api.listBills(s,{offset:5});
 assert.equal(a.items.length,5);assert.equal(a.hasMore,true);
 assert.equal(b.items.length,2);assert.equal(b.hasMore,false);
 const id=a.items[0].id,read=api.getBilling(s);s.orgId='paid';
 await assert.rejects(read,/组织已切换/);await assert.rejects(api.getBill(s,id),/不属于/);
 api.setScene(s,'failure');await assert.rejects(api.getBilling(s),/加载失败/);
 api.retry(s);assert.equal((await api.listBills(s)).items.length,0);
});
test('role change during renewal rejects mutation',async()=>{
 const s=seed();api.setScene(s,'active');const result=api.setRenewal(s,false);s.user='u1';
 await assert.rejects(result,/Owner/);
 assert.equal(currentOrg(s).billingV1.subscription.status,'active');
});
test('money uses currency-specific minor units and preserves missing values',()=>{
 assert.equal(money(null),'—');assert.equal(money(undefined),'—');
 assert.equal(money(9900),'CNY 99.00');assert.equal(money(123,'JPY'),'JPY 123');
 assert.equal(money(1234,'KWD'),'KWD 1.234');
});
