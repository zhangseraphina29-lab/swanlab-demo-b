import { currentOrg, isManager } from './model.js';

export function organizationOverviewStats(state) {
  if (!isManager(state)) return null;
  const org = currentOrg(state);
  const members = org.members.filter(member => member.status === 'active');
  const totalExperiments = org.projects.reduce((sum, project) => sum + project.experiments, 0);
  // The prototype stores experiment totals, not live execution or participant data.
  const liveCount = totalExperiments === 0 ? 0 : null;
  return {
    members: members.length,
    owners: members.filter(member => member.role === 'Owner').length,
    projects: org.projects.length,
    experimenters: liveCount,
    runningProjects: liveCount,
    runningExperiments: liveCount,
    totalExperiments,
  };
}
