const types={
 'create-group':'新建权限组','update-group':'修改权限组','delete-group':'删除权限组',
 'restore-group':'恢复权限组','member-left-group':'移除成员关联','project-transferred':'移除项目关联'
};
export function groupChangeDetails(org,entry){
 const before=entry.type==='restore-group'?null:entry.before,after=entry.after;
 const member=id=>org.members.find(m=>m.id===id)?.name||id;
 const project=id=>[...org.projects,...(org.recycle||[])].find(p=>p.id===id)?.name||id;
 const details=[];
 if(before&&after&&before.name!==after.name)details.push(`名称：${before.name} → ${after.name}`);
 for(const id of new Set([...(before?.memberIds||[]),...(after?.memberIds||[])])){
  if(!before?.memberIds?.includes(id))details.push(`新增成员：${member(id)}`);
  else if(!after?.memberIds?.includes(id))details.push(`移除成员：${member(id)}`);
 }
 for(const id of new Set([...Object.keys(before?.projects||{}),...Object.keys(after?.projects||{})])){
  const old=before?.projects[id],next=after?.projects[id];
  if(!old)details.push(`新增项目：${project(id)} · ${next}`);
  else if(!next)details.push(`移除项目：${project(id)} · 原角色 ${old}`);
  else if(old!==next)details.push(`项目角色：${project(id)} · ${old} → ${next}`);
 }
 for(const uid of new Set([...Object.keys(before?.memberProjectRoles||{}),...Object.keys(after?.memberProjectRoles||{})])){
  for(const pid of new Set([...Object.keys(before?.memberProjectRoles?.[uid]||{}),...Object.keys(after?.memberProjectRoles?.[uid]||{})])){
   const old=before?.memberProjectRoles?.[uid]?.[pid],next=after?.memberProjectRoles?.[uid]?.[pid];
   const previous=before?.memberIds?.includes(uid)&&before?.projects?.[pid]?(old||'跟随组默认'):'无授权';
   const following=after?.memberIds?.includes(uid)&&after?.projects?.[pid]?(next||'跟随组默认'):'无授权';
   if(old!==next)details.push(`成员项目角色：${member(uid)} / ${project(pid)} · ${previous} → ${following}`);
  }
 }
 return details;
}
export function permissionGroupHistory(org,id){
 return (org.permissionChanges||[]).filter(e=>types[e.type]&&(!id||(e.after?.id||e.before?.id)===id)).toReversed().map(e=>({
  ...e,title:types[e.type],groupName:e.after?.name||e.before?.name||'权限组',
  actorName:e.actorName||org.members.find(m=>m.id===e.actor)?.name||e.actor,
  details:e.details||groupChangeDetails(org,e)
 }));
}
