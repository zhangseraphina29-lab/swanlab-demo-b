import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import * as I from './src/invitation-reception.js';
const setup=()=>{const s=M.seed();M.upgradePrototypeState(s);s.orgId='paid';return s;};
test('logged-out recipient must authenticate; registration does not join or create organizations',()=>{
 const s=setup(),link=M.createInviteLink(s,'查看者'),count=s.orgs.length;s.loggedOut=true;
 assert.equal(I.invitationIdentity(s),null);assert.throws(()=>I.acceptAuthenticatedInvitation(s,link.id),/先登录/);
 I.loginForInvitation(s,'接收者','receiver@example.com');
 assert.equal(s.orgs.length,count);assert.equal(M.currentOrg(s).members.some(m=>m.email==='receiver@example.com'),false);
 assert.equal(I.invitationIdentity(s).email,'receiver@example.com');
 I.acceptAuthenticatedInvitation(s,link.id);
 assert.equal(M.member(s).name,'接收者');assert.equal(M.member(s).role,'查看者');assert.equal(s.registration,null);
});
test('confirmation uses authenticated account and preserves existing role; invalid links cannot join',()=>{
 const s=setup(),link=M.createInviteLink(s,'查看者');
 I.loginForInvitation(s,'Owner','user0@example.com');I.acceptAuthenticatedInvitation(s,link.id);
 assert.equal(M.member(s).role,'Owner');
 link.status='revoked';I.loginForInvitation(s,'新用户','revoked@example.com');
 assert.throws(()=>I.acceptAuthenticatedInvitation(s,link.id),/失效/);
 assert.equal(M.currentOrg(s).members.some(m=>m.email==='revoked@example.com'),false);
});
