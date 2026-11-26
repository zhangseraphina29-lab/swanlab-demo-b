import {permissionGroupHistory} from './src/permission-group-history.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import * as G from './src/permission-groups.js';
import {memberProjectsFor,permissionGroupCount} from './src/member-directory.js';
const fixture=()=>{const s=M.upgradePrototypeState(M.seed()),o=M.currentOrg(s);o.paid=true;return {s,o,p:o.projects[2],q:o.projects[3]};};
const add=(s,o,p,role='贡献',memberIds=['u3'],name='算法组')=>G.savePermissionGroup(s,o,{name,memberIds,projects:{[p.id]:role}});
test('per-project group roles combine with direct grants by allowed actions; organization read-only is not a cap',()=>{const {s,o,p,q}=fixture();const g=G.savePermissionGroup(s,o,{name:'多项目',memberIds:['u3'],projects:{[p.id]:'贡献',[q.id]:'查看'}});s.user='u3';assert(M.canAccessProject(s,p));assert(M.canPerformAction(s,'write',p));assert(!M.canPerformAction(s,'write',q));p.members.u3='管理';assert(G.canAuthorize(o,p,'u3'));assert.equal(G.effectivePermission(o,p,'u3').sources.length,2);assert.equal(permissionGroupCount(o.members[3],o),1);assert(memberProjectsFor(o,'u3').includes(p));assert.equal(G.projectMemberIds(o,p).filter(id=>id==='u3').length,1);assert.equal(g.projects[q.id],'查看');});
test('organization administrator can govern but cannot automatically authorize project or add group members',()=>{const {s,o,p}=fixture();const g=add(s,o,p);s.user='u1';assert(M.canPerformAction(s,'manage',p));assert(!M.canPerformAction(s,'authorize',p));const before=JSON.stringify(o);assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberIds:['u3','u4']},g.id),/缺少.*授权管理权/);assert.equal(JSON.stringify(o),before);assert.throws(()=>G.savePermissionGroup(s,o,{name:'新组',memberIds:[],projects:{[p.id]:'查看'}}),/授权管理权/);});
test('member additions require authorization on every associated project, failures are atomic',()=>{const {s,o,p,q}=fixture();const g=G.savePermissionGroup(s,o,{name:'两项目',memberIds:['u3'],projects:{[p.id]:'查看',[q.id]:'贡献'}});p.members.u1='管理';delete q.members.u1;s.user='u1';assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberIds:['u3','u4']},g.id),new RegExp(q.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));q.members.u1='管理';G.savePermissionGroup(s,o,{...g,memberIds:['u3','u4']},g.id);assert(G.memberGroups(o,'u4').length);});
test('removal and deletion preview remaining rights from other groups/direct/org, preserve resources',()=>{const {s,o,p}=fixture(),g=add(s,o,p,'管理');add(s,o,p,'查看',['u3'],'另组');p.members.u3='贡献';const next={...g,memberIds:[]},row=G.groupImpact(o,g.id,next)[0];assert.equal(row.before,'管理');assert.equal(row.after,'贡献');assert.deepEqual(row.sources.map(x=>x.name),['直接授权','另组']);const experiments=p.experiments;G.deletePermissionGroup(s,o,g.id);assert.equal(p.experiments,experiments);assert.equal(G.effectivePermission(o,p,'u3').role,'贡献');assert.equal(o.members.length,9);assert(o.permissionChanges.every(x=>x.actor==='u0'&&Number.isFinite(Date.parse(x.at))));});
test('disabled members lose group access, leaving removes links permanently, rejoining does not restore',()=>{const {s,o,p}=fixture();add(s,o,p);M.setMemberStatus(s,'u3','disabled');s.user='u3';assert(!M.canAccessProject(s,p));assert.equal(G.memberGroups(o,'u3').length,0);s.user='u0';M.setMemberStatus(s,'u3','active');s.user='u3';M.leaveOrganization(s,o.id);assert(G.groupsFor(o).every(g=>!g.memberIds.includes('u3')));o.members.push({id:'u3',name:'返回',email:'user3@example.com',role:'查看者',status:'active'});assert.equal(G.memberGroups(o,'u3').length,0);});
test('only managers may edit groups; invalid/outside members, projects and roles rejected',()=>{const {s,o,p}=fixture();for(const draft of [{name:'',memberIds:[],projects:{}},{name:'a',memberIds:['outside'],projects:{}},{name:'a',memberIds:[],projects:{outside:'查看'}},{name:'a',memberIds:[],projects:{[p.id]:'Owner'}}])assert.throws(()=>G.savePermissionGroup(s,o,draft));s.user='u2';assert.throws(()=>add(s,o,p),/Owner/);});
test('Free cannot create groups or private projects; downgrade never clears existing grants; revocation remains possible',()=>{const {s,o,p}=fixture(),g=add(s,o,p);o.paid=false;const original=JSON.stringify(g);assert.equal(JSON.stringify(G.groupsFor(o)[0]),original);assert.throws(()=>G.savePermissionGroup(s,o,{name:'a',memberIds:[],projects:{}}),/付费/);assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberIds:['u3','u4']},g.id),/付费/);assert.throws(()=>M.createProject(s,{name:'new',desc:'',scope:'MEMBERS',members:{},tags:[]}),/付费/);G.savePermissionGroup(s,o,{...g,memberIds:[]},g.id);assert.equal(G.groupsFor(o)[0].memberIds.length,0);});
test('explicit replacement is required and can reduce effective rights; no silent direct revocation on join',()=>{const {s,o,p}=fixture();p.members.u3='管理';add(s,o,p,'查看');assert.equal(p.members.u3,'管理');const copy=structuredClone(p);delete copy.members.u3;assert.equal(G.effectivePermission(o,copy,'u3').role,'查看');G.replaceDirectGrant(s,o,p,'u3');assert.equal(p.members.u3,undefined);assert.equal(G.effectivePermission(o,p,'u3').role,'查看');assert.equal(o.permissionChanges.at(-1).type,'replace-direct');});
test('cross-org transfer detaches original groups and imports group people as direct grants when selected',()=>{const {s,o,p}=fixture(),g=add(s,o,p);p.name='unique-transfer';const target=s.orgs.find(x=>x.id==='trial');target.capacity=1e12;M.transferProject(s,p.id,o.id,target.id,true);assert(!g.projects[p.id]);assert.equal(target.projects.find(x=>x.id===p.id).members.u3,'贡献');assert(G.groupsFor(target).length===0);assert(G.groupsFor(o).some(x=>x.id===g.id));});
test('project form save is atomic across basic info, direct grants and group changes',()=>{const {s,o,p}=fixture(),g=add(s,o,p,'查看');s.user='u1';const before=JSON.stringify(o);assert.throws(()=>M.saveProjectWithPermissions(s,p.id,{...p,desc:'changed'}, {[g.id]:'管理'}),/授权管理权/);assert.equal(JSON.stringify(o),before);s.user='u0';const saved=M.saveProjectWithPermissions(s,p.id,{name:p.name,desc:'updated',scope:p.scope,tags:p.tags,members:p.members},{[g.id]:'贡献'});assert.equal(saved.desc,'updated');assert.equal(G.groupsFor(o)[0].projects[p.id],'贡献');});
test('new project can attach existing groups atomically; unrelated projects are never auto-added',()=>{const {s,o,p}=fixture(),g=add(s,o,p);const fresh=M.saveProjectWithPermissions(s,undefined,{name:'brand-new',desc:'',scope:'MEMBERS',tags:[],members:{}},{[g.id]:'查看'});assert.equal(G.groupsFor(o)[0].projects[fresh.id],'查看');assert.equal(G.effectivePermission(o,fresh,'u3').role,'查看');const second=M.createProject(s,{name:'separate',desc:'',scope:'SPACE',tags:[],members:{}});assert(!G.groupsFor(o)[0].projects[second.id]);});
test('simulated failures retain groups and audit trail unchanged',()=>{const {s,o,p}=fixture(),g=add(s,o,p),before=JSON.stringify(o);s.requestFailure=true;assert.throws(()=>G.deletePermissionGroup(s,o,g.id),/失败/);assert.throws(()=>G.savePermissionGroup(s,o,{...g,name:'changed'},g.id),/失败/);assert.equal(JSON.stringify(o),before);});
test('basic project edits preserve groups when access input is omitted; widening scope needs authorization',()=>{const {s,o,p}=fixture(),g=add(s,o,p);s.user='u1';const value={name:p.name,desc:'basic edit',scope:p.scope,tags:p.tags,members:p.members};const saved=M.saveProjectWithPermissions(s,p.id,value);assert.equal(G.groupsFor(o)[0].projects[p.id],g.projects[p.id]);assert.equal(saved.desc,'basic edit');assert.throws(()=>M.saveProjectWithPermissions(s,p.id,{...value,scope:'SPACE'}),/扩大访问范围/);});
test('recoverable project deletion preserves group relation without blocking unrelated group edits',()=>{const {s,o,p}=fixture(),g=add(s,o,p);M.recycleProject(s,p.id);G.savePermissionGroup(s,o,{...g,name:'新名称'},g.id);assert(G.groupsFor(o)[0].projects[p.id]);M.restoreProject(s,p.id);assert.equal(G.effectivePermission(o,p,'u3').role,'贡献');});
test('individual member roles replace group defaults, retain legacy defaults and merge other sources',()=>{
 const {s,o,p}=fixture();const g=G.savePermissionGroup(s,o,{name:'差异组',memberIds:['u3','u4'],projects:{[p.id]:'管理'},memberProjectRoles:{u3:{[p.id]:'查看'}}});
 assert.equal(G.effectivePermission(o,p,'u3').role,'查看');assert.equal(G.effectivePermission(o,p,'u4').role,'管理');assert(!G.canAuthorize(o,p,'u3'));
 p.members.u3='贡献';assert.equal(G.effectivePermission(o,p,'u3').role,'贡献');
 add(s,o,p,'管理',['u3'],'第二组');assert(G.canAuthorize(o,p,'u3'));
 const next=structuredClone(g);delete next.memberProjectRoles.u3[p.id];assert.equal(G.groupImpact(o,g.id,next)[0].member,o.members[3].name);
});
test('individual increases and restoring a higher default require authorization, failures remain atomic',()=>{
 const {s,o,p}=fixture();const g=G.savePermissionGroup(s,o,{name:'差异组',memberIds:['u3'],projects:{[p.id]:'管理'},memberProjectRoles:{u3:{[p.id]:'查看'}}});
 s.user='u1';const before=JSON.stringify(o);assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberProjectRoles:{}},g.id),/授权管理权/);assert.equal(JSON.stringify(o),before);
 s.user='u0';o.paid=false;assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberProjectRoles:{u3:{[p.id]:'贡献'}}},g.id),/付费/);
 o.paid=true;assert.throws(()=>G.savePermissionGroup(s,o,{...g,memberProjectRoles:{u3:{[p.id]:'invalid'}}},g.id),/有效.*角色/);
});
test('individual previews show effective changes and project form edits preserve overrides',()=>{
 const {s,o,p}=fixture();const g=G.savePermissionGroup(s,o,{name:'差异组',memberIds:['u3','u4'],projects:{[p.id]:'贡献'},memberProjectRoles:{u3:{[p.id]:'查看'}}});
 const rows=G.groupImpact(o,g.id,{...g,memberProjectRoles:{u3:{[p.id]:'管理'}}});assert.equal(rows.length,1);assert.equal(rows[0].before,'查看');assert.equal(rows[0].after,'管理');
 M.saveProjectWithPermissions(s,p.id,{...p},{[g.id]:'管理'});assert.equal(G.groupsFor(o)[0].memberProjectRoles.u3[p.id],'查看');assert.equal(G.effectivePermission(o,p,'u4').role,'管理');
 const cleaned=G.savePermissionGroup(s,o,{...G.groupsFor(o)[0],memberIds:['u4']},g.id);assert(!cleaned.memberProjectRoles.u3);
});
test('individual grants transfer correctly and stale overrides are cleared on project/member removal',()=>{
 const {s,o,p}=fixture();const g=G.savePermissionGroup(s,o,{name:'差异组',memberIds:['u3','u4'],projects:{[p.id]:'贡献'},memberProjectRoles:{u3:{[p.id]:'查看'},u4:{[p.id]:'管理'}}});
 p.name='individual-transfer';const target=s.orgs.find(x=>x.id==='trial');target.capacity=1e12;M.transferProject(s,p.id,o.id,target.id,true);
 const moved=target.projects.find(x=>x.id===p.id);assert.equal(moved.members.u3,'查看');assert.equal(moved.members.u4,'管理');assert(!g.memberProjectRoles.u3[p.id]);
 G.removeGroupMemberships(s,o,'u3');assert(!g.memberProjectRoles.u3);
});

test('deleted group revokes its source and can restore identity, roles and audit history',()=>{
 const {s,o,p}=fixture(),g=add(s,o,p);g.memberProjectRoles={u3:{[p.id]:'查看'}};
 G.deletePermissionGroup(s,o,g.id);
 assert.equal(G.memberGroups(o,'u3').length,0);assert(!G.explicitSources(o,p,'u3').some(x=>x.id===g.id));
 assert.equal(o.recycledPermissionGroups[0].deletedAt,s.now);
 const restored=G.restorePermissionGroup(s,o,g.id);
 assert.equal(restored.id,g.id);assert.equal(restored.memberProjectRoles.u3[p.id],'查看');
 assert.equal(G.groupMemberRole(restored,'u3',p.id),'查看');assert.equal(o.recycledPermissionGroups.length,0);
 assert.equal(o.permissionChanges.at(-1).type,'restore-group');
});
test('restoring checks name conflicts, authority, paid entitlement and simulated failure atomically',()=>{
 for(const reason of ['name','authority','plan','failure','member']){
  const {s,o,p}=fixture(),g=add(s,o,p);G.deletePermissionGroup(s,o,g.id);
  if(reason==='name')G.savePermissionGroup(s,o,{name:g.name,memberIds:[],projects:{}});
  if(reason==='authority')s.user='u1';if(reason==='member')s.user='u3';if(reason==='plan')o.paid=false;if(reason==='failure')s.requestFailure=true;
  const before=structuredClone(o);assert.throws(()=>G.restorePermissionGroup(s,o,g.id));assert.deepEqual(o,before);
 }
});
test('recycled group never revives departed members or transferred project relationships',()=>{
 const {s,o,p,q}=fixture();const g=G.savePermissionGroup(s,o,{name:'归档组',memberIds:['u3','u4'],projects:{[p.id]:'查看',[q.id]:'查看'}});
 G.deletePermissionGroup(s,o,g.id);G.removeGroupMemberships(s,o,'u3');G.detachProjectGroups(s,o,p.id);
 o.members.find(m=>m.id==='u4').status='disabled';
 const restored=G.restorePermissionGroup(s,o,g.id);
 assert.deepEqual(restored.memberIds,[]);assert.deepEqual(restored.projects,{[q.id]:'查看'});
});

test('history preserves actor and entity names, member changes and role transitions as snapshots',()=>{
 const {s,o,p}=fixture(),g=add(s,o,p,'查看',['u3']);
 const actor=s.profiles[s.user].name,oldName=o.members.find(m=>m.id==='u3').name,projectName=p.name;
 G.savePermissionGroup(s,o,{...g,memberIds:['u4'],projects:{[p.id]:'贡献'}},g.id);
 let entries=permissionGroupHistory(o,g.id);
 assert.equal(entries[0].title,'修改权限组');assert.equal(entries[0].actorName,actor);
 assert(entries[0].details.includes('移除成员：'+oldName));assert(entries[0].details.some(x=>x.startsWith('新增成员：')));
 assert(entries[0].details.includes(`项目角色：${projectName} · 查看 → 贡献`));
 o.members.find(m=>m.id==='u3').name='已改名';p.name='renamed';s.profiles[s.user].name='新操作者名称';
 entries=permissionGroupHistory(o,g.id);assert.equal(entries[0].actorName,actor);assert(entries[0].details.includes('移除成员：'+oldName));assert(entries[0].details.some(x=>x.includes(projectName)));
 const next=G.groupsFor(o).find(x=>x.id===g.id);G.savePermissionGroup(s,o,{...next,memberProjectRoles:{u4:{[p.id]:'查看'}}},g.id);
 assert(permissionGroupHistory(o,g.id)[0].details.some(x=>x.includes('跟随组默认 → 查看')));
 const count=o.permissionChanges.length;s.requestFailure=true;assert.throws(()=>G.savePermissionGroup(s,o,next,g.id));assert.equal(o.permissionChanges.length,count);
});
test('history includes lifecycle and legacy entries, excludes other project audit events',()=>{
 const {s,o,p}=fixture(),g=add(s,o,p);G.deletePermissionGroup(s,o,g.id);G.restorePermissionGroup(s,o,g.id);
 G.recordPermissionChange(s,o,'update-project-permissions',null,p);
 const entries=permissionGroupHistory(o,g.id);assert.deepEqual(entries.map(e=>e.type),['restore-group','delete-group','create-group']);
 assert(entries[0].details.some(x=>x.startsWith('新增成员')));assert(entries[1].details.some(x=>x.startsWith('移除项目')));
 const legacy=o.permissionChanges[0];delete legacy.details;delete legacy.actorName;
 assert(permissionGroupHistory(o,g.id).at(-1).details.length>0);assert.equal(permissionGroupHistory(o,'unrelated').length,0);
});
