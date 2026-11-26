import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import { organizationOverviewStats, organizationRecentUpdates } from './src/organization-overview.js';

test('entry and account switches default to organization overview', () => {
 const state = M.seed();
 assert.equal(state.page, 'orgOverview');
 state.page = 'projects';
 M.activateAccount(state, 'u1');
 assert.equal(state.page, 'orgOverview');
});
test('only active owners and administrators receive organization statistics', () => {
 const state = M.seed();
 for (const id of ['u0', 'u1']) { state.user = id; assert.ok(organizationOverviewStats(state)); }
 for (const id of ['u2', 'u3', 'anonymous']) { state.user = id; assert.equal(organizationOverviewStats(state), null); }
 state.user = 'u1';
 M.currentOrg(state).members.find(member => member.id === 'u1').status = 'disabled';
 assert.equal(organizationOverviewStats(state), null);
});
test('counts belong to the selected organization and exclude inactive members/recycled projects', () => {
 const state = M.seed();
 const org = M.currentOrg(state);
 org.members[2].status = 'disabled';
 org.recycle = [{ experiments: 900 }];
 const stats = organizationOverviewStats(state);
 assert.equal(stats.members, 8);
 assert.equal(stats.owners, 1);
 assert.equal(stats.administrators, 1);
 assert.equal(stats.projects, 4);
 assert.equal(stats.totalExperiments, 53);
 state.orgId = 'paid';
 assert.equal(organizationOverviewStats(state).members, 12);
});
test('demo activity is capped by organization totals; empty organizations have zero activity', () => {
 const state = M.seed();
 const stats = organizationOverviewStats(state);
 assert.equal(stats.runningProjects, 2);
 assert.equal(stats.runningExperiments, 8);
 assert.equal(stats.experimenters, 3);
 M.currentOrg(state).projects = [{ experiments: 1 }];
 const small = organizationOverviewStats(state);
 assert.equal(small.runningProjects, 1);
 assert.equal(small.runningExperiments, 1);
 M.currentOrg(state).projects = [];
 const empty = organizationOverviewStats(state);
 assert.equal(empty.totalExperiments, 0);
 assert.equal(empty.runningProjects, 0);
 assert.equal(empty.experimenters, 0);
});

test('resource transfer preserves experiment history and unrelated grants and checks permissions', () => {
 const state=M.seed(),org=M.currentOrg(state),project=org.projects[0];
 project.createdBy='u2';
 const experiments=project.experiments;
 assert.equal(M.transferMemberResources(state,'u2','u3'),1);
 assert.equal(project.createdBy,'u3');
 assert.equal(project.members.u3,'管理');
 assert.equal(project.members.u2,undefined);
 assert.equal(project.members.u0,'管理');
 assert.equal(project.experiments,experiments);
 assert.throws(()=>M.transferMemberResources(state,'u0','u3'));
 state.user='u2';
 assert.throws(()=>M.transferMemberResources(state,'u3','u1'));
});

test('recent updates filter inaccessible projects and sort experiment records by update time', () => {
 const state=M.seed();state.user='u3';
 const org=M.currentOrg(state),privateProject=org.projects.find(p=>p.scope==='MEMBERS');
 privateProject.experimentRecords=[{id:'private',name:'secret',updatedAt:'2099-01-01'}];
 let recent=organizationRecentUpdates(state);
 assert.ok(!recent.projects.some(p=>p.id===privateProject.id));
 assert.ok(!recent.experiments.some(e=>e.id==='private'));
 org.projects[0].experimentRecords=[{id:'old',name:'old',updatedAt:'2026-11-01'},{id:'new',name:'new',updatedAt:'2026-11-25'}];
 recent=organizationRecentUpdates(state);
 assert.equal(recent.experiments[0].id,'new');
 assert.equal(recent.projectCount,2);
 assert.equal(recent.experimentCount,3);
 assert.ok(recent.experiments.every(e=>recent.projects.some(p=>p.id===e.projectId)));
 org.projects=[];
 assert.deepEqual(organizationRecentUpdates(state),{projects:[],experiments:[],projectCount:0,experimentCount:0});
});

test('recent updates prioritize participation by default, retain others and respect an explicit opt-out',()=>{
 const state=M.upgradePrototypeState(M.seed()),org=M.currentOrg(state);state.user='u1';
 for(const p of org.projects){p.members={u0:'管理'};p.createdBy='u0';p.lastExperimentAt='2026-11-01';p.experimentRecords=[];}
 const [recent,mine]=org.projects;recent.lastExperimentAt='2026-11-25';recent.experimentRecords=[{id:'other',name:'other',createdBy:'u0',updatedAt:'2026-11-25'}];
 mine.members.u1='查看';mine.experimentRecords=[{id:'mine',name:'mine',createdBy:'u1',updatedAt:'2026-11-01'}];
 let result=organizationRecentUpdates(state);assert.equal(result.projects[0].id,mine.id);assert.equal(result.experiments[0].id,'mine');assert(result.projects.some(p=>p.id===recent.id));assert.equal(result.projectCount,4);
 state.profiles.u1.recentPrioritizeMine=false;result=organizationRecentUpdates(state);assert.equal(result.projects[0].id,recent.id);assert.equal(result.experiments[0].id,'other');
 state.profiles.u1.recentPrioritizeMine=true;assert.equal(organizationRecentUpdates(state).projects[0].id,mine.id);
});
