import test from 'node:test';
import assert from 'node:assert/strict';
import {memberProjectsFor, permissionGroupCount, formatMemberDate} from './src/member-directory.js';
import {seed, upgradePrototypeState, createOrganization, inviteMember, acceptInvite} from './src/model.js';
test('member project filter counts explicit membership, not default visibility',()=>{
 const org=seed().orgs[0];
 assert.equal(memberProjectsFor(org,'u1').length,1);
 assert.equal(memberProjectsFor(org,'u2').length,3);
 assert.equal(memberProjectsFor(org,'u3').length,0);
 assert.equal(memberProjectsFor(org,'u0').length,4);
});
test('permission groups count unique memberships with empty default',()=>{
 assert.equal(permissionGroupCount({}),0);
 assert.equal(permissionGroupCount({permissionGroupIds:['a','b','a']}),2);
});
test('date includes seconds in consistent China timezone, never treats ordering as epoch',()=>{
 assert.equal(formatMemberDate('2026-11-25T01:02:03Z'),'2026-11-25 09:02:03');
 assert.equal(formatMemberDate(0),'—');
 assert.equal(formatMemberDate('invalid'),'—');
});
test('upgrade preserves actual dates and adds demo fixture only to demo members',()=>{
 const s=seed(),m=s.orgs[0].members[0];
 delete m.joinedAtTime;
 upgradePrototypeState(s);
 assert.equal(formatMemberDate(m.joinedAtTime),'2026-10-01 09:30:00');
 m.joinedAtTime='2026-09-01T00:00:00Z';upgradePrototypeState(s);
 assert.equal(m.joinedAtTime,'2026-09-01T00:00:00Z');
});
test('new organization and invited member store actual state clock',()=>{
 const s=seed();const org=createOrganization(s,'测试组织','region-a');
 assert.equal(org.members[0].joinedAtTime,s.now);
 const invite=inviteMember(s,'new@example.com','贡献者');
 assert.equal(acceptInvite(s,invite.id,invite.email).joinedAtTime,s.now);
});

test('role edits enforce actor permissions and preserve sole Owner',async()=>{
 const {updateMemberRole}=await import('./src/model.js');const s=seed();
 assert.throws(()=>updateMemberRole(s,'u0','贡献者'),/转移/);
 assert.throws(()=>updateMemberRole(s,'u2','Owner'),/有效/);
 updateMemberRole(s,'u2','查看者');assert.equal(s.orgs[0].members[2].role,'查看者');
 s.user='u1';
 assert.throws(()=>updateMemberRole(s,'u2','管理员'),/Owner/);
 assert.throws(()=>updateMemberRole(s,'u1','贡献者'),/Owner/);
 updateMemberRole(s,'u2','贡献者');
 s.user='u3';assert.throws(()=>updateMemberRole(s,'u2','查看者'),/无权/);
});
