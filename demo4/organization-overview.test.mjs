import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import { organizationOverviewStats } from './src/organization-overview.js';

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
 assert.equal(stats.projects, 4);
 assert.equal(stats.totalExperiments, 53);
 state.orgId = 'paid';
 assert.equal(organizationOverviewStats(state).members, 12);
});
test('unknown live metrics remain unknown; an empty organization has zero activity', () => {
 const state = M.seed();
 const stats = organizationOverviewStats(state);
 assert.equal(stats.runningProjects, null);
 assert.equal(stats.runningExperiments, null);
 assert.equal(stats.experimenters, null);
 M.currentOrg(state).projects = [];
 const empty = organizationOverviewStats(state);
 assert.equal(empty.totalExperiments, 0);
 assert.equal(empty.runningProjects, 0);
 assert.equal(empty.experimenters, 0);
});
