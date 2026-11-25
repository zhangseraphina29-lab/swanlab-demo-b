import {explicitSources, memberGroups} from './permission-groups.js';
export function memberProjectsFor(org, id) {
 return org.projects.filter(project => explicitSources(org,project,id).length>0);
}
export function permissionGroupCount(member, org) {
 return org ? memberGroups(org,member.id).length : new Set(member.permissionGroupIds || []).size;
}
export function formatMemberDate(value) {
 if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value) || Number.isNaN(Date.parse(value))) return '—';
 const date = new Date(value);
 const parts = new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date);
 const part = type => parts.find(item => item.type === type).value;
 return `${part('year')}-${part('month')}-${part('day')} ${part('hour')}:${part('minute')}:${part('second')}`;
}
