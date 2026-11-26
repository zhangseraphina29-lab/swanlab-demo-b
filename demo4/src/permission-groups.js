import {groupChangeDetails} from './permission-group-history.js';
export const PROJECT_ROLES=['查看','贡献','管理'];
const ROLE_ACTIONS={查看:['read','media'],贡献:['read','media','write'],管理:['read','media','write','manage','authorize','download','export']};
export const groupsFor=org=>org.permissionGroups||[];
export const activeMember=(org,id)=>org.members.find(m=>m.id===id&&m.status==='active');
export const memberGroups=(org,id)=>activeMember(org,id)?groupsFor(org).filter(g=>g.memberIds.includes(id)):[];
export const groupMemberRole=(group,uid,pid)=>group?.memberIds.includes(uid)&&group.projects[pid]?(group.memberProjectRoles?.[uid]?.[pid]||group.projects[pid]):undefined;
export function explicitSources(org,p,id){if(!activeMember(org,id))return [];return [...(p.members?.[id]?[{kind:'direct',name:'直接授权',role:p.members[id]}]:[]),...memberGroups(org,id).filter(g=>g.projects[p.id]).map(g=>({kind:'group',id:g.id,name:g.name,role:groupMemberRole(g,id,p.id)}))];}
export function permissionSources(org,p,id){const m=activeMember(org,id);if(!m)return [];const sources=explicitSources(org,p,id);if(['Owner','管理员'].includes(m.role))sources.push({kind:'governance',name:'组织治理',role:'管理',actions:['read','media','write','manage','download','export']});else if(p.scope==='SPACE')sources.push({kind:'organization',name:'组织成员可见',role:m.role==='贡献者'?'贡献':'查看'});if(p.scope==='PUBLIC_READONLY')sources.push({kind:'public',name:'公开只读',role:'查看',actions:['read']});return sources;}
export function effectivePermission(org,p,id){const sources=permissionSources(org,p,id),actions=[...new Set(sources.flatMap(x=>x.actions||ROLE_ACTIONS[x.role]||[]))];return {sources,actions,role:actions.includes('manage')?'管理':actions.includes('write')?'贡献':actions.includes('read')?'查看':'无权限'};}
export const canAuthorize=(org,p,id)=>explicitSources(org,p,id).some(x=>(ROLE_ACTIONS[x.role]||[]).includes('authorize'));
export const projectMemberIds=(org,p)=>org.members.filter(m=>m.status==='active'&&explicitSources(org,p,m.id).length).map(m=>m.id);
function manager(s,org){if(!['Owner','管理员'].includes(activeMember(org,s.user)?.role))throw Error('仅组织 Owner / 管理员可维护权限组');if(s.requestFailure)throw Error('保存失败，输入已保留，请关闭失败模拟后重试');}
export function groupDraft(org,id){const g=groupsFor(org).find(g=>g.id===id);return g?structuredClone(g):{name:'',memberIds:[],projects:{},memberProjectRoles:{}};}
export function validateGroup(s,org,draft,id){
 manager(s,org);
 const before=groupsFor(org).find(g=>g.id===id);
 if(id&&!before)throw Error('权限组不存在');
 const name=draft.name.trim();
 if(!name||name.length>80)throw Error('权限组名称必填，最多 80 字符');
 if(groupsFor(org).some(g=>g.id!==id&&g.name===name))throw Error('组织内已有同名权限组');
 const memberIds=[...new Set(draft.memberIds)],projects={...draft.projects},memberProjectRoles={};
 if(memberIds.some(uid=>!activeMember(org,uid)&&!before?.memberIds.includes(uid)))throw Error('只能添加本组织有效成员');
 for(const [pid,role] of Object.entries(projects))if((!org.projects.some(p=>p.id===pid)&&!(before?.projects[pid]&&(org.recycle||[]).some(p=>p.id===pid)))||!PROJECT_ROLES.includes(role))throw Error('请选择本组织项目及有效项目角色');
 for(const [uid,roles] of Object.entries(draft.memberProjectRoles||{})){
  if(!memberIds.includes(uid))continue;
  for(const [pid,role] of Object.entries(roles)){
   if(!projects[pid])continue;
   if(!PROJECT_ROLES.includes(role))throw Error('请选择有效的成员项目角色');
   (memberProjectRoles[uid]??={})[pid]=role;
  }
 }
 const value={name,memberIds,projects,memberProjectRoles},required=new Set();
 const added=memberIds.some(uid=>!before?.memberIds.includes(uid));
 for(const [pid,role] of Object.entries(projects)){
  if(!before?.projects[pid]||PROJECT_ROLES.indexOf(role)>PROJECT_ROLES.indexOf(before.projects[pid])||added)required.add(pid);
  for(const uid of memberIds)if(PROJECT_ROLES.indexOf(groupMemberRole(value,uid,pid))>PROJECT_ROLES.indexOf(groupMemberRole(before,uid,pid)))required.add(pid);
 }
 if(!org.paid&&(!before||added||required.size))throw Error('权限组新增授权为付费能力，请升级当前组织');
 const restricted=[...org.projects,...(org.recycle||[])].filter(p=>required.has(p.id)&&!canAuthorize(org,p,s.user));
 if(restricted.length)throw Error('缺少以下项目的授权管理权：'+restricted.map(p=>p.name).join('、'));
 return value;
}
export function groupImpact(org,id,draft){const before=groupsFor(org).find(g=>g.id===id),copy=structuredClone(org);copy.permissionGroups=groupsFor(copy).filter(g=>g.id!==id);if(draft)copy.permissionGroups.push({...draft,id:id||'draft'});const people=new Set([...(before?.memberIds||[]),...(draft?.memberIds||[])]),projects=new Set([...Object.keys(before?.projects||{}),...Object.keys(draft?.projects||{})]),rows=[];for(const uid of people)for(const pid of projects){const p=org.projects.find(p=>p.id===pid),m=activeMember(org,uid);if(!p||!m)continue;const oldGroup=groupMemberRole(before,uid,pid),newGroup=groupMemberRole(draft,uid,pid);if(oldGroup!==newGroup){const next=effectivePermission(copy,p,uid);rows.push({member:m.name,project:p.name,before:effectivePermission(org,p,uid).role,after:next.role,sources:next.sources});}}return rows;}
export function recordPermissionChange(s,org,type,before,after){org.permissionChanges??=[];const entry={id:crypto.randomUUID(),actor:s.user,actorName:s.profiles?.[s.user]?.name||org.members.find(m=>m.id===s.user)?.name||s.user,at:new Date().toISOString(),type,before:structuredClone(before),after:structuredClone(after)};entry.details=groupChangeDetails(org,entry);org.permissionChanges.push(entry);}
export function savePermissionGroup(s,org,draft,id){const value=validateGroup(s,org,draft,id),before=groupsFor(org).find(g=>g.id===id)||null,g={...value,id:id||'group-'+crypto.randomUUID(),updatedAt:s.now,createdAt:before?.createdAt||s.now};org.permissionGroups=groupsFor(org).filter(g=>g.id!==id).concat(g);recordPermissionChange(s,org,before?'update-group':'create-group',before,g);return g;}
export function deletePermissionGroup(s,org,id){manager(s,org);const before=groupsFor(org).find(g=>g.id===id);if(!before)throw Error('权限组不存在');org.recycledPermissionGroups??=[];org.recycledPermissionGroups.push({...structuredClone(before),deletedAt:s.now});org.permissionGroups=groupsFor(org).filter(g=>g.id!==id);recordPermissionChange(s,org,'delete-group',before,null);}
export function replaceDirectGrant(s,org,p,id){manager(s,org);if(!canAuthorize(org,p,s.user))throw Error('缺少该项目的授权管理权');if(!memberGroups(org,id).some(g=>g.projects[p.id]))throw Error('该成员没有可替换的权限组授权');if(!p.members[id])throw Error('直接授权已不存在');const before={projectId:p.id,userId:id,role:p.members[id]};delete p.members[id];recordPermissionChange(s,org,'replace-direct',before,{projectId:p.id,userId:id,permission:effectivePermission(org,p,id)});}
export function removeGroupMemberships(s,org,id){for(const g of [...groupsFor(org),...(org.recycledPermissionGroups||[])].filter(g=>g.memberIds.includes(id))){const before=structuredClone(g);g.memberIds=g.memberIds.filter(x=>x!==id);if(g.memberProjectRoles)delete g.memberProjectRoles[id];g.updatedAt=s.now;recordPermissionChange(s,org,'member-left-group',before,g);}}
export function detachProjectGroups(s,org,pid){for(const g of [...groupsFor(org),...(org.recycledPermissionGroups||[])].filter(g=>g.projects[pid])){const before=structuredClone(g);delete g.projects[pid];for(const roles of Object.values(g.memberProjectRoles||{}))delete roles[pid];g.updatedAt=s.now;recordPermissionChange(s,org,'project-transferred',before,g);}}

export function restoredGroupDraft(org,id){
 const group=org.recycledPermissionGroups?.find(g=>g.id===id);
 if(!group)throw Error('回收站中没有此权限组');
 const value=structuredClone(group);
 value.memberIds=value.memberIds.filter(uid=>activeMember(org,uid));
 value.projects=Object.fromEntries(Object.entries(value.projects).filter(([pid])=>[...org.projects,...(org.recycle||[])].some(p=>p.id===pid)));
 return value;
}
export function previewGroupRestore(s,org,id){
 const draft=restoredGroupDraft(org,id);
 const value=validateGroup(s,{...org,projects:[...org.projects,...(org.recycle||[])]},draft);
 if(groupsFor(org).some(g=>g.id===id))throw Error('权限组已存在');
 return value;
}
export function restorePermissionGroup(s,org,id){
 const value=previewGroupRestore(s,org,id),before=org.recycledPermissionGroups.find(g=>g.id===id);
 const group={...value,id,createdAt:before.createdAt,updatedAt:s.now};
 org.permissionGroups=groupsFor(org).concat(group);
 org.recycledPermissionGroups=org.recycledPermissionGroups.filter(g=>g.id!==id);
 recordPermissionChange(s,org,'restore-group',before,group);
 return group;
}
