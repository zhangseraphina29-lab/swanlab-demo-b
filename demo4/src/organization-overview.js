import {explicitSources} from './permission-groups.js';
import { currentOrg, isManager, canAccessProject } from './model.js';

export function organizationOverviewStats(state) {
  if (!isManager(state)) return null;
  const org = currentOrg(state);
  const members = org.members.filter(member => member.status === 'active');
  const totalExperiments = org.projects.reduce((sum, project) => sum + project.experiments, 0);
  // Fixed demo activity counts, capped by the selected organization totals.
  const hasExperiments = totalExperiments > 0;
  return {
    members: members.length,
    administrators: members.filter(member => member.role === '管理员').length,
    owners: members.filter(member => member.role === 'Owner').length,
    projects: org.projects.length,
    experimenters: hasExperiments ? Math.min(3, members.length) : 0,
    runningProjects: hasExperiments ? Math.min(2, org.projects.length) : 0,
    runningExperiments: Math.min(8, totalExperiments),
    totalExperiments,
  };
}

export function organizationRecentUpdates(state){
 const visible=currentOrg(state).projects.filter(project=>canAccessProject(state,project));
 const prioritize=state.profiles?.[state.user]?.recentPrioritizeMine!==false;
 const mine=p=>p.createdBy===state.user||explicitSources(currentOrg(state),p,state.user).length>0;
 const projects=[...visible].sort((a,b)=>(prioritize?Number(mine(b))-Number(mine(a)):0)||(b.lastExperimentAt||b.updated||'').localeCompare(a.lastExperimentAt||a.updated||'')).slice(0,5);
 const experiments=visible.flatMap(project=>{
  if(project.experimentRecords?.length)return project.experimentRecords.map(record=>({...record,projectId:project.id,projectName:project.name,updatedBy:record.updatedBy||record.createdBy||project.lastExperimentBy,updated:record.updatedAt||record.updated||record.createdAt||project.lastExperimentAt||project.updated}));
  return project.experiments>0?[{id:project.id+'-latest',name:project.name+' / latest',projectId:project.id,projectName:project.name,updatedBy:project.lastExperimentBy,updated:project.lastExperimentAt||project.updated}]:[];
 });
 const experimentMine=e=>e.createdBy===state.user||e.updatedBy===state.user||(!e.createdBy&&!e.updatedBy&&mine(visible.find(p=>p.id===e.projectId)));
 experiments.sort((a,b)=>(prioritize?Number(experimentMine(b))-Number(experimentMine(a)):0)||(b.updated||'').localeCompare(a.updated||''));
 return {projects,experiments:experiments.slice(0,5),projectCount:visible.length,experimentCount:experiments.length};
}
