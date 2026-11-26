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

test('member removal blocks owned resources in active projects and recycle until transfer',async()=>{
 const M=await import('./src/model.js'),s=M.seed();M.upgradePrototypeState(s);const org=M.currentOrg(s),source=org.members.find(m=>m.id==='u2'),target=org.members.find(m=>m.id==='u3');
 org.projects[0].createdBy=source.id;org.projects[0].members[source.id]='管理';
 const recycled=structuredClone(org.projects[1]);recycled.id='recycled-owned';recycled.createdBy=source.id;org.recycle=[recycled];
 M.setMemberStatus(s,source.id,'disabled');const before=structuredClone(s);
 assert.throws(()=>M.removeMember(s,source.id),/先转移/);assert.deepEqual(s,before);
 assert.equal(M.memberOwnedProjects(s,source.id).length,2);
 assert.equal(M.transferMemberResources(s,source.id,target.id),2);
 assert.equal(M.memberOwnedProjects(s,source.id).length,0);
 M.removeMember(s,source.id);assert.equal(org.members.some(m=>m.id===source.id),false);
 assert.equal(org.projects[0].createdBy,target.id);assert.equal(recycled.createdBy,target.id);
 assert.equal(org.projects[0].members[target.id],'管理');assert.equal(recycled.members[target.id],'管理');
});
test('failed resource transfer does not mutate resources or unlock member removal',async()=>{
 const M=await import('./src/model.js'),s=M.seed();M.upgradePrototypeState(s);const org=M.currentOrg(s);
 org.projects[0].createdBy='u2';M.setMemberStatus(s,'u2','disabled');const before=structuredClone(s);
 assert.throws(()=>M.transferMemberResources(s,'u2','u2'),/有效成员/);assert.deepEqual(s,before);
 assert.throws(()=>M.removeMember(s,'u2'),/先转移/);
 s.user='u3';assert.throws(()=>M.transferMemberResources(s,'u2','u0'),/无权/);assert.equal(org.projects[0].createdBy,'u2');
});

test('member directory defaults to all statuses and supports multiple status filters',async()=>{
 const {directoryEntries}=await import('./src/member-directory.js'),org=seed().orgs[0];
 org.members[2].status='disabled';org.invites.push({id:'old',email:'old@example.com',status:'expired'},{id:'done',email:'done@example.com',status:'accepted'});
 const all=directoryEntries(org);assert.equal(all.length,org.members.length+2);assert(all.some(m=>m.status==='disabled'));assert(!all.some(m=>m.id==='done'));
 const filtered=directoryEntries(org,['disabled','pending']);assert.deepEqual(new Set(filtered.map(m=>m.status)),new Set(['disabled','pending']));assert.equal(filtered.length,2);
 assert.equal(directoryEntries(org,[]).length,all.length);
});
