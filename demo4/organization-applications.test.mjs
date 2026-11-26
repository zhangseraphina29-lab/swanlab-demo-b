import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import * as J from './src/organization-applications.js';
const setup=()=>{const s=M.seed();M.upgradePrototypeState(s);s.orgId='paid';s.registration={email:'applicant@example.com',name:'申请人',step:'join'};return s;};
test('application requires an ID, rejects duplicates, and persists without membership',()=>{
 const s=setup(),org=M.currentOrg(s),before=M.countMemberSlots(org);
 assert.throws(()=>J.submitApplication(s,org.name),/组织 ID/);
 const a=J.submitApplication(s,org.id,'希望加入研究');
 assert.equal(a.status,'pending');assert.equal(s.registration.joinSubmitted,true);assert.equal(M.countMemberSlots(org),before);
 assert.throws(()=>J.submitApplication(s,org.id),/不能重复申请/);
 assert.equal(org.joinApplications.length,1);
 J.submitApplication(s,'free');assert.equal(J.applicantApplications(s).length,2);
 assert.equal(J.applicantApplications(JSON.parse(JSON.stringify(s))).length,2);
 assert.throws(()=>J.enterApprovedOrganization(s,a.id));
 assert.throws(()=>J.submitApplication(s,'不存在'));
});
test('only managers review, approval adds contributor without switching reviewer, applicant can enter',()=>{
 const s=setup(),org=M.currentOrg(s),a=J.submitApplication(s,org.id);
 s.user='u2';assert.throws(()=>J.reviewApplication(s,a.id,'approved'));
 s.user='u0';J.reviewApplication(s,a.id,'approved');
 assert.equal(s.user,'u0');assert.equal(a.reviewedBy,'u0');assert.ok(a.reviewedAt);
 assert.equal(org.members.find(m=>m.email===a.email).role,'贡献者');
 assert.throws(()=>J.reviewApplication(s,a.id,'approved'));
 J.enterApprovedOrganization(s,a.id);assert.equal(s.registration,null);assert.equal(s.orgId,org.id);assert.equal(s.page,'orgOverview');
 assert.equal(s.orgs.some(o=>o.id==='personal:'+a.email),false);
});
test('rejection creates no membership and does not allow duplicate application',()=>{
 const s=setup(),org=M.currentOrg(s),a=J.submitApplication(s,org.id);
 J.reviewApplication(s,a.id,'rejected');assert.equal(a.status,'rejected');
 assert.equal(org.members.some(m=>m.email===a.email),false);
 assert.throws(()=>J.enterApprovedOrganization(s,a.id));
 assert.throws(()=>J.submitApplication(s,org.id),/不能重复申请/);
 assert.equal(org.joinApplications.length,1);
});
test('capacity and disabled members block approval without marking request processed',()=>{
 const s=setup(),org=M.currentOrg(s),a=J.submitApplication(s,org.id);
 org.paid=false;org.members=Array.from({length:10},(_,i)=>({id:'u'+i,email:'full'+i+'@example.com',role:i?'贡献者':'Owner',status:'active'}));org.invites=[];
 assert.throws(()=>J.reviewApplication(s,a.id,'approved'));assert.equal(a.status,'pending');
 org.paid=true;org.members.push({id:'disabled',email:a.email,status:'disabled',role:'贡献者'});
 assert.throws(()=>J.reviewApplication(s,a.id,'approved'));assert.equal(a.status,'pending');
});

test('organization switch entry uses current account and returns to the original page',()=>{
 const s=setup();s.registration=null;s.page='projects';const before={org:s.orgId,user:s.user,page:s.page};
 J.startJoinFlow(s);assert.equal(s.registration.email,'user0@example.com');assert.equal(s.registration.step,'join');
 assert.equal(s.registration.joinSubmitted,false);
 J.leaveJoinFlow(s);assert.equal(s.registration,null);assert.equal(s.user,before.user);assert.equal(s.orgId,before.org);assert.equal(s.page,before.page);
});
test('new user returns to onboarding with saved application, reopening shows submitted state',()=>{
 const s=setup();J.startJoinFlow(s);J.submitApplication(s,'paid');J.leaveJoinFlow(s);
 assert.equal(s.registration.step,'organizations');assert.equal(J.applicantApplications(s).length,1);
 J.startJoinFlow(s);assert.equal(s.registration.step,'join');assert.equal(s.registration.joinSubmitted,true);
});
