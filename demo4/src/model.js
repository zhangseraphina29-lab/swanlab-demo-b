import {groupsFor, savePermissionGroup, effectivePermission, explicitSources, canAuthorize, projectMemberIds, detachProjectGroups, removeGroupMemberships, recordPermissionChange} from './permission-groups.js';
export const CONFIG={freeMemberLimit:10,warningRatio:.8,GB:1e9,inviteDays:7,plans:[{gb:100,price:49},{gb:500,price:199}]};
export const names=['林知远','陈雨','张楠','许墨','王宁','周舟','李可','杨帆','赵一','苏青','郑言','何川'];
export function seed(){
 const org=(id,name,n,paid=false,region='region-a',trial=false)=>({id,name,region,owner:'u0',paid,capacity:(paid?100:10)*1e9,used:8e9,billing:'中国 · 企业主体（演示）',members:Array.from({length:n},(_,i)=>({id:'u'+i,name:names[i],email:`user${i}@example.com`,role:i===0?'Owner':i===1?'管理员':i===3?'查看者':'贡献者',status:'active',joinedAt:i,joinedAtTime:`2026-10-${String(1+i).padStart(2,'0')}T09:30:00+08:00`})),invites:paid?[]:[{id:'i0',email:'guest@example.com',role:'贡献者',status:'pending',createdAt:'2026-11-11T12:00:00+08:00',expires:'2026-11-18T12:00:00+08:00'}],tags:['Baseline','NLP','Vision'],orders:[],trial:trial?{start:'2026-10-15T00:00:00+08:00',end:'2026-11-15T00:00:00+08:00',keep:Array.from({length:10},(_,i)=>'u'+i),finalized:false}:null,projects:[
 {id:id+'p0',name:'Qwen3 · Instruction Tuning',desc:'Explore lightweight training with traceable experiments.',scope:'SPACE',tags:['NLP','Baseline'],members:{u0:'管理',u2:'贡献'},experiments:24,bytes:3.2e9,lastExperimentAt:'2026-11-11T10:00:00+08:00',updated:'2026-11-11',metric:'0.284',color:0,createdBy:'u0'},
 {id:id+'p1',name:'ImageNet / ResNet-50',desc:'Image classification baseline comparing learning rates and augmentation strategies.',scope:'PUBLIC_READONLY',tags:['Vision','Baseline'],members:{u0:'管理',u2:'贡献'},experiments:16,bytes:2.4e9,lastExperimentAt:'2026-11-10T10:00:00+08:00',updated:'2026-11-10',metric:'94.82%',color:1,createdBy:'u0'},
 {id:id+'p2',name:'Multimodal Retrieval · Evaluation Set',desc:'Unified text and image representations for cross-modal retrieval.',scope:'MEMBERS',tags:['Vision'],members:{u0:'管理',u2:'查看'},experiments:8,bytes:1.6e9,lastExperimentAt:'2026-11-09T10:00:00+08:00',updated:'2026-11-09',metric:'0.891',color:2,createdBy:'u0'},
 {id:id+'p3',name:'Research / Unreleased Model',desc:'An internal research project protected for specific members.',scope:'MEMBERS',tags:['NLP'],members:{u0:'管理',u1:'管理'},experiments:5,bytes:.8e9,lastExperimentAt:'2026-11-08T10:00:00+08:00',updated:'2026-11-08',metric:'0.412',color:3,createdBy:'u0'}]});
 return {version:1,user:'u0',country:'中国',now:'2026-11-11T12:00:00+08:00',orgId:'free',page:'orgOverview',projectId:null,regionFailure:false,requestFailure:false,orgs:[org('free','SwanLab Research',9),org('paid','Open Research Lab',12,true,'region-b'),org('trial','Vision Intelligence Lab',12,false,'region-a',true)]};
}
export const currentOrg=s=>s.orgs.find(o=>o.id===s.orgId);
export const member=(s,o=currentOrg(s))=>o.members.find(m=>m.id===s.user&&m.status==='active');
export const isManager=(s,o=currentOrg(s))=>['Owner','管理员'].includes(member(s,o)?.role);
export const isOwner=(s,o=currentOrg(s))=>member(s,o)?.role==='Owner';
export function countMemberSlots(o){return new Set([...o.members.filter(m=>m.status==='active').map(m=>m.email.toLowerCase()),...o.invites.filter(i=>i.status==='pending').map(i=>i.email.toLowerCase())]).size;}
export function expireInvites(s){s.orgs.forEach(o=>o.invites.forEach(i=>{if(i.status==='pending'&&Date.parse(i.expires)<Date.parse(s.now))i.status='expired'}));}
export function canAccessProject(s,p,o=currentOrg(s)){return p.scope==='PUBLIC_READONLY'||!!member(s,o)&&(p.scope==='SPACE'||isManager(s,o)||explicitSources(o,p,s.user).length>0);}
export function canPerformAction(s,action,p=null,o=currentOrg(s)){
 const m=member(s,o);if(!m)return false;
 if(['billing','transfer','migration'].includes(action))return isOwner(s,o);
 if(['members','categories','usage'].includes(action))return isManager(s,o);
 if(action==='create')return m.role!=='查看者';
 if(action==='authorize')return !!p&&canAuthorize(o,p,s.user);
 if(action==='manage')return isManager(s,o)||!!p&&effectivePermission(o,p,s.user).actions.includes('manage');
 if(action==='write')return !!p&&canAccessProject(s,p,o)&&effectivePermission(o,p,s.user).actions.includes('write');
 if(action==='media')return !!p&&canAccessProject(s,p,o);
 if(['download','export'].includes(action))return canPerformAction(s,'manage',p,o);
 return false;
}
export function checkCapacity(o,bytes=1){return {ratio:o.used/o.capacity,status:o.used>=o.capacity?'full':o.used/o.capacity>=CONFIG.warningRatio?'warning':'normal',allowed:o.used+bytes<=o.capacity};}
export function inviteMember(s,email,role){const o=currentOrg(s);if(!canPerformAction(s,'members'))throw Error('只有 Owner 和组织管理员可邀请成员');email=email.trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('请输入有效的邮箱地址');if(role==='管理员'&&!isOwner(s))throw Error('仅 Owner 可任命管理员');if(o.members.some(m=>m.email===email&&m.status==='active'))throw Error('对方已是组织成员');const old=o.invites.find(i=>i.email===email&&i.status==='pending');if(old)return old;if(!o.paid&&countMemberSlots(o)>=10)throw Error('免费组织名额已满。撤回待邀请以释放名额，或购买容量升级。');const i={id:'i'+Date.now(),email,role,status:'pending',createdAt:s.now,expires:new Date(Date.parse(s.now)+7*864e5).toISOString()};o.invites.push(i);return i;}
export function acceptInvite(s,id,email){const o=currentOrg(s),i=o.invites.find(x=>x.id===id);if(s.regionFailure&&(!s.failureRegion||s.failureRegion===o.region))throw Error('目标区域暂不可用，请重试');if(!i)throw Error('邀请不存在');if(i.email!==email.trim().toLowerCase())throw Error('当前账号与受邀邮箱不匹配');if(i.status==='accepted'){const existing=o.members.find(m=>m.email===i.email);if(!existing||existing.status!=='active')throw Error('本组织协作已禁用，请联系管理员');s.user=existing.id;return existing;}if(i.status!=='pending'||Date.parse(i.expires)<Date.parse(s.now))throw Error('邀请已撤回或过期');let m=o.members.find(m=>m.email===i.email);if(m){m.status='active';m.role=i.role}else{o.members.push(m={id:'guest'+i.id,name:i.email.split('@')[0],email:i.email,role:i.role,status:'active',joinedAt:o.members.length,joinedAtTime:s.now})}i.status='accepted';initializeAccount(s,m.email,m.name,s.country,m.id);s.user=m.id;return m;}
export function applyPaymentResult(s,id,result){const o=currentOrg(s);if(!isOwner(s))throw Error('仅 Owner 可购买容量');const order=o.orders.find(x=>x.id===id);if(!order)throw Error('订单不存在');if(order.applied)return;order.status=result;if(result==='success'){o.capacity=order.gb*1e9;o.paid=true;order.applied=true;}}
export function finalizeMigrationTrial(s){s.orgs.forEach(o=>{const t=o.trial;if(!t||t.finalized||Date.parse(s.now)<Date.parse(t.end))return;if(!o.paid){const keep=new Set([o.owner,...t.keep.filter(id=>id!==o.owner)].slice(0,10));o.members.forEach(m=>{if(m.status==='active'&&!keep.has(m.id))m.status='disabled'});o.invites.forEach(i=>{if(i.status==='pending'&&!keep.has(i.id))i.status='revoked'});}t.finalized=true;});}
export function setMemberStatus(s,id,status){const o=currentOrg(s),m=o.members.find(m=>m.id===id);if(!canPerformAction(s,'members')||m.role==='Owner'||m.role==='管理员'&&!isOwner(s))throw Error('无权修改此成员');if(status==='active'&&!o.paid&&countMemberSlots(o)>=10)throw Error('无空余名额，请先释放名额或升级');m.status=status;}
export function publicProject(p){return {id:p.id,name:p.name,desc:p.desc,experiments:p.experiments,metric:p.metric,scope:p.scope};}
export function setUsage(o,gb){o.used=gb*1e9;const total=o.projects.reduce((n,p)=>n+p.bytes,0);o.projects.forEach(p=>p.bytes=total?o.used*p.bytes/total:o.used/o.projects.length);}
export function writeExperiment(s,p){const o=currentOrg(s);if(s.regionFailure&&(!s.failureRegion||s.failureRegion===o.region))throw Error('区域暂不可用，未记录本次数据');if(!canPerformAction(s,'write',p))throw Error('没有实验写入权限');if(!checkCapacity(o,1e8).allowed)throw Error('组织容量已满，未记录本次数据');o.used+=1e8;p.bytes+=1e8;p.experiments++;p.lastExperimentAt=s.now;p.lastExperimentBy=s.user;p.updated=s.now.slice(0,10);}
export function createProject(s,data){const o=currentOrg(s);if(data.scope==='MEMBERS'&&!o.paid)throw Error('指定成员项目为付费能力，请升级当前组织');if(!canPerformAction(s,'create'))throw Error('没有创建权限');const name=data.name.trim();if(!name||name.length>80)throw Error('项目名称必填，最多 80 字符');if(o.projects.some(p=>p.name===name))throw Error('同组织已存在同名项目');if(data.desc.length>500)throw Error('描述最多 500 字符');const p={...data,createdBy:s.user,id:o.id+'p'+crypto.randomUUID(),createdAt:s.now,name,members:{...data.members,[s.user]:'管理'},experiments:0,bytes:0,updated:s.now.slice(0,10),metric:'—',color:0};o.projects.push(p);return p;}
export function initializeAccount(s,email,name,country,id){
 email=email.trim().toLowerCase();let own=s.orgs.find(o=>o.members.some(m=>m.email===email&&m.id===o.owner));
 if(!own){const uid=id||'account:'+email;own={id:'personal:'+email,name:name+'的组织',region:'region-a',owner:uid,paid:false,capacity:1e10,used:0,billing:'未设置（演示）',members:[{id:uid,name,email,role:'Owner',status:'active',joinedAt:0,joinedAtTime:s.now}],invites:[],tags:[],orders:[],projects:[],trial:null};s.orgs.push(own)}s.country=country;return own;
}
export function upgradePrototypeState(s){
 if(s.page==='migration')s.page='members';
 for(const org of s.orgs){
  if(org.legacyCollaboratorsV1)continue;
  org.legacyCollaborators??=[];
  const old=org.trial?org.members.filter(m=>!['Owner','管理员'].includes(m.role)):[];
  for(const m of old){const grants=org.projects.filter(p=>p.members[m.id]).map(p=>({projectId:p.id,role:p.members[m.id]}));org.legacyCollaborators.push({...m,grants,status:'removed'});org.members=org.members.filter(x=>x.id!==m.id);for(const p of org.projects)delete p.members[m.id];}
  if(!org.legacyCollaborators.length&&['free','paid'].includes(org.id))org.legacyCollaborators=[{id:'legacy:'+org.id+':1',name:'许言',email:'xuyan@example.com',status:'removed',grants:org.projects.slice(0,2).map((p,i)=>({projectId:p.id,role:i?'查看':'贡献'}))},{id:'legacy:'+org.id+':2',name:'陆遥',email:'luyao@example.com',status:'removed',grants:org.projects.slice(2,3).map(p=>({projectId:p.id,role:'管理'}))}];
  org.trial=null;org.legacyCollaboratorsV1=true;
 }
 s.profiles??={};
 if(!s.cardUpdateFixtures){for(const org of s.orgs){for(const [index,hours,user] of [[0,2,'u0'],[1,5,'u2'],[2,24,'u1']]){const p=org.projects.find(p=>p.id===org.id+'p'+index);if(p&&!p.lastExperimentBy){p.lastExperimentAt=new Date(Date.parse(s.now)-hours*3600000).toISOString();p.lastExperimentBy=user;}}}s.cardUpdateFixtures=true;}

 for(const org of s.orgs){delete org.folders;for(const p of org.projects){delete p.folder;p.createdBy??=org.owner;p.createdAt??=p.updated+'T00:00:00Z';}for(const m of org.members){if(!m.joinedAtTime&&typeof m.joinedAt==='number'&&/^u\d+$/.test(m.id)&&['free','paid','trial'].includes(org.id)){m.joinedAtTime=`2026-10-${String(1+Number(m.id.slice(1))).padStart(2,'0')}T09:30:00+08:00`;}s.profiles[m.id]??={name:m.name,bio:m.id==='u0'?'让实验可复现，让探索有迹可循。':'记录实验，与团队一起探索。'};}}
 s.version=2;if(s.page==='categories')s.page='projects';return s;
}
export function profileProjects(s){
 return s.orgs.flatMap(org=>org.projects.filter(p=>!!member(s,org)&&canAccessProject(s,p,org)).map(project=>({org,project})));
}
export function searchDestinations(s,query=''){
 const org=currentOrg(s),q=query.trim().toLowerCase();
 const pages=[{id:'page:profile',group:'页面',label:'个人主页',detail:'个人资料、参与组织与项目',page:'profile',icon:'user'},{id:'page:projects',group:'页面',label:'所有项目',detail:org.name,page:'projects',icon:'grid'},
 ...[['members','成员管理','users','members'],['usage','用量与账单','chart','usage'],['settings','组织设置','settings','members']].filter(([, , ,action])=>canPerformAction(s,action)).map(([page,label,icon])=>({id:'page:'+page,group:'页面',label,detail:org.name,page,icon}))];
 const orgs=s.orgs.filter(o=>member(s,o)).map(o=>({id:'org:'+o.id,group:'组织',label:o.name,detail:o.region==='region-a'?'演示区域 A':'演示区域 B',orgId:o.id,icon:'users'}));
 const projects=profileProjects(s).map(({org,project:p})=>({id:'project:'+p.id,group:'项目',label:p.name,detail:org.name,orgId:org.id,projectId:p.id,icon:'project'}));
 return [...pages,...orgs,...projects].filter(x=>!q||(x.label+' '+x.detail).toLowerCase().includes(q));
}
export function renameTag(s,name,next){
 if(!canPerformAction(s,'categories'))throw Error('仅组织管理者可管理标签');const org=currentOrg(s),val=next.trim();if(!val||val.length>16)throw Error('标签名称必填，最多 16 字符');if(org.tags.includes(val)&&val!==name)throw Error('标签已存在');if(name&&!org.tags.includes(name))throw Error('标签不存在');
 if(name){org.tags=org.tags.map(t=>t===name?val:t);org.projects.forEach(p=>p.tags=p.tags.map(t=>t===name?val:t));if(org.tagColors&&Object.hasOwn(org.tagColors,name)){const color=org.tagColors[name];delete org.tagColors[name];Object.defineProperty(org.tagColors,val,{value:color,writable:true,enumerable:true,configurable:true});}}else org.tags.push(val);return val;
}
export function deleteTag(s,name){if(!canPerformAction(s,'categories'))throw Error('仅组织管理者可管理标签');const org=currentOrg(s);org.tags=org.tags.filter(t=>t!==name);if(org.tagColors)delete org.tagColors[name];org.projects.forEach(p=>p.tags=p.tags.filter(t=>t!==name));}
export function setProjectTags(s,id,tags,orgId=s.orgId){const org=s.orgs.find(o=>o.id===orgId),p=org?.projects.find(p=>p.id===id);if(!p||!canPerformAction(s,'manage',p,org))throw Error('只有项目管理者可编辑项目标签');if(tags.some(t=>!org.tags.includes(t)))throw Error('标签不存在，请重新选择');p.tags=[...new Set(tags)];return p;}
export function rememberAccount(s){if(s.loggedOut||s.user==='anonymous')return;s.accounts??=[];if(!s.accounts.includes(s.user))s.accounts.push(s.user);}
export function activateAccount(s,id){const org=s.orgs.find(o=>o.members.some(m=>m.id===id&&m.status==='active'));if(!org)throw Error('账号没有有效组织，请重新登录');s.user=id;s.orgId=org.id;s.loggedOut=false;s.page='orgOverview';rememberAccount(s);}
export function signOut(s){s.accounts=(s.accounts||[]).filter(id=>id!==s.user);const next=s.accounts[0];if(next){activateAccount(s,next);return;}s.loggedOut=true;s.page='auth';}

export function recycleProject(s,id){const org=currentOrg(s);if(!isManager(s))throw Error('仅组织管理者可删除');const p=org.projects.find(p=>p.id===id);if(!p)throw Error('项目不存在');org.recycle??=[];org.recycle.push({...p,deletedAt:s.now});org.projects=org.projects.filter(p=>p.id!==id);}
export function restoreProject(s,id){const org=currentOrg(s);if(!isManager(s))throw Error('仅组织管理者可恢复');const p=org.recycle?.find(p=>p.id===id);if(!p)throw Error('项目不存在');if(org.projects.some(x=>x.name===p.name))throw Error('存在同名项目，请先重命名现有项目');delete p.deletedAt;org.projects.push(p);org.recycle=org.recycle.filter(p=>p.id!==id);}
export function purgeProject(s,id){const org=currentOrg(s);if(!isManager(s))throw Error('仅组织管理者可彻底删除');const p=org.recycle?.find(p=>p.id===id);if(!p)throw Error('项目不存在');org.used=Math.max(0,org.used-p.bytes);org.recycle=org.recycle.filter(p=>p.id!==id);}
export function createOrganization(s,name,region){name=name.trim();const current=member(s);if(!current||s.loggedOut)throw Error('请先登录有效账户');if(!name||name.length>80)throw Error('组织名称必填，最多 80 字符');if(!['region-a','region-b'].includes(region))throw Error('请选择有效数据区');const org={id:'org-'+Date.now()+'-'+s.orgs.length,name,region,owner:s.user,paid:false,capacity:1e10,used:0,billing:'未设置（演示）',members:[{...current,role:'Owner',status:'active',joinedAt:0,joinedAtTime:s.now}],invites:[],tags:[],orders:[],projects:[],trial:null};s.orgs.push(org);s.orgId=org.id;s.page='orgOverview';return org;}
export function createInviteLink(s,role){if(!canPerformAction(s,'members'))throw Error('没有成员管理权限');if(!['贡献者','查看者','管理员'].includes(role)||role==='管理员'&&!isOwner(s))throw Error('无权设置此角色');const org=currentOrg(s);org.linkInvites??=[];const link={id:'link-'+crypto.randomUUID(),role,status:'active',expires:new Date(Date.parse(s.now)+7*864e5).toISOString()};org.linkInvites.push(link);return link;}
export function redeemInviteLink(s,id,email){email=email.trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('请输入有效邮箱');const org=s.orgs.find(o=>o.linkInvites?.some(x=>x.id===id)),link=org?.linkInvites.find(x=>x.id===id);if(!link||link.status!=='active'||Date.parse(link.expires)<=Date.parse(s.now))throw Error('链接已失效');let m=org.members.find(x=>x.email===email);if(m?.status==='disabled')throw Error('协作已禁用，请联系管理员');if(m?.status!=='active'){const pending=org.invites.find(x=>x.email===email&&x.status==='pending'&&Date.parse(x.expires)>Date.parse(s.now));if(!org.paid&&countMemberSlots(org)>=10&&!pending)throw Error('组织名额已满，请联系 Owner 扩容');if(pending)pending.status='accepted';if(!m){const existing=s.orgs.flatMap(o=>o.members).find(x=>x.email===email);m={id:existing?.id||'linkuser:'+email,name:existing?.name||email.split('@')[0],email};org.members.push(m)}m.status='active';m.role=pending?.role||link.role;}s.orgId=org.id;s.user=m.id;s.loggedOut=false;s.page='orgOverview';upgradePrototypeState(s);rememberAccount(s);return m;}
export function moveProject(s,id,sourceId,targetId){const source=s.orgs.find(o=>o.id===sourceId),target=s.orgs.find(o=>o.id===targetId),p=source?.projects.find(p=>p.id===id);if(!p||!target||source===target)throw Error('请选择其他有效组织');if(!isManager(s,source)||!isManager(s,target))throw Error('需要两个组织的管理权限');if(source.region!==target.region)throw Error('跨数据区移动暂不支持');if(target.projects.some(x=>x.name===p.name))throw Error('目标组织存在同名项目');if(!checkCapacity(target,p.bytes).allowed)throw Error('目标组织容量不足');detachProjectGroups(s,source,p.id);p.members=Object.fromEntries(Object.entries(p.members).filter(([id])=>target.members.some(m=>m.id===id&&m.status==='active')));source.projects=source.projects.filter(x=>x.id!==id);source.used=Math.max(0,source.used-p.bytes);target.projects.push(p);target.used+=p.bytes;target.tags=[...new Set([...target.tags,...p.tags])];s.orgId=target.id;s.page='projectAdmin';return p;}

export function isBillingEmail(org,email){return (org.billingContacts||[]).some(c=>c.email===String(email||'').trim().toLowerCase());}
export function isBillingContact(s,id,org=currentOrg(s)){const email=s.orgs.flatMap(o=>o.members).find(m=>m.id===id)?.email;return (org.billingContacts||[]).some(c=>c.id===id||email&&c.email===email);}
export function addBillingContact(s,name,email){const org=currentOrg(s);if(!isOwner(s))throw Error('仅 Owner 可管理账单联系人');email=email.trim().toLowerCase();name=name.trim();if(!name||name.length>40)throw Error('请输入姓名，最多 40 字符');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('请输入有效邮箱');if(isBillingEmail(org,email))throw Error('该账单联系人已存在');org.billingContacts??=[];const c={id:'billing:'+email,name,email};org.billingContacts.push(c);return c;}
export function removeBillingContact(s,id){if(!isOwner(s))throw Error('仅 Owner 可管理账单联系人');const org=currentOrg(s);org.billingContacts=(org.billingContacts||[]).filter(c=>c.id!==id);}

export function removeMember(s,id){const org=currentOrg(s),m=org.members.find(m=>m.id===id);if(!m||m.status!=='disabled')throw Error('仅可彻底移出已禁用成员');if(!canPerformAction(s,'members')||m.role==='Owner'||m.role==='管理员'&&!isOwner(s))throw Error('无权移出此成员');removeGroupMemberships(s,org,id);org.members=org.members.filter(x=>x.id!==id);for(const p of [...org.projects,...(org.recycle||[])])delete p.members[id];}

export function leaveOrganization(s,id){const org=s.orgs.find(o=>o.id===id),m=org?.members.find(m=>m.id===s.user);if(!m)throw Error('你不是该组织成员');if(m.role==='Owner'||org.owner===s.user)throw Error('请先转移 Owner 后退出组织');removeGroupMemberships(s,org,s.user);org.members=org.members.filter(m=>m.id!==s.user);for(const p of [...org.projects,...(org.recycle||[])])delete p.members[s.user];for(const i of org.invites)if(i.email.toLowerCase()===m.email.toLowerCase()&&i.status==='pending')i.status='revoked';if(s.orgId===id){const next=s.orgs.find(o=>o.members.some(m=>m.id===s.user&&m.status==='active'));if(next)s.orgId=next.id;}s.page='myOrganizations';}

export function saveTag(s,name,next,color){if(!/^#[0-9a-f]{6}$/i.test(color))throw Error('请输入有效的六位十六进制色值，如 #6699cc');const val=renameTag(s,name,next),org=currentOrg(s);org.tagColors??={};Object.defineProperty(org.tagColors,val,{value:color.toLowerCase(),writable:true,enumerable:true,configurable:true});return val;}

export function addLegacyCollaborator(s,id,role='贡献者',restorePermissions=true){
 const org=currentOrg(s);if(!canPerformAction(s,'members'))throw Error('仅组织管理者可添加成员');
 if(!['贡献者','查看者'].includes(role))throw Error('请选择有效组织角色');
 const c=org.legacyCollaborators?.find(x=>x.id===id);if(!c||c.status==='added')throw Error('该协作者已处理');
 let m=org.members.find(x=>x.id===id||x.email.toLowerCase()===c.email.toLowerCase());
 const pending=org.invites.filter(i=>i.email.toLowerCase()===c.email.toLowerCase()&&i.status==='pending');
 if(m?.status!=='active'&&!org.paid&&countMemberSlots(org)>=CONFIG.freeMemberLimit&&!pending.length)throw Error('组织成员名额已满，请先释放名额或升级');
 if(!m){m={id:c.id,name:c.name,email:c.email,role,status:'active',joinedAt:org.members.length,joinedAtTime:s.now};org.members.push(m)}else if(m.status!=='active'){m.status='active';m.role=role;}
 pending.forEach(i=>i.status='accepted');
 for(const g of restorePermissions?c.grants:[]){const p=org.projects.find(p=>p.id===g.projectId);if(p){const rank={'查看':0,'贡献':1,'管理':2};if(!(m.id in p.members)||rank[g.role]>rank[p.members[m.id]])p.members[m.id]=g.role;}}
 c.status='added';c.permissionsRestored=restorePermissions;return m;
}

export function restoreExperiment(s,id){const org=currentOrg(s);if(!isManager(s))throw Error('仅组织管理者可恢复');const e=org.recycledExperiments?.find(e=>e.id===id);if(!e)throw Error('实验不存在');const p=org.projects.find(p=>p.id===e.projectId);if(!p)throw Error('请先恢复所属项目');p.experiments++;p.experimentRecords??=[];const restored={...e};delete restored.deletedAt;p.experimentRecords.push(restored);org.recycledExperiments=org.recycledExperiments.filter(e=>e.id!==id);}
export function purgeExperiment(s,id){const org=currentOrg(s);if(!isManager(s))throw Error('仅组织管理者可彻底删除');const e=org.recycledExperiments?.find(e=>e.id===id);if(!e)throw Error('实验不存在');org.used=Math.max(0,org.used-(e.bytes||0));const p=[...org.projects,...(org.recycle||[])].find(p=>p.id===e.projectId);if(p)p.bytes=Math.max(0,p.bytes-(e.bytes||0));org.recycledExperiments=org.recycledExperiments.filter(e=>e.id!==id);}

export function transferMemberResources(s,sourceId,targetId){
 const org=currentOrg(s),source=org.members.find(m=>m.id===sourceId),target=org.members.find(m=>m.id===targetId);
 if(!isManager(s)||!source||source.role==='Owner'||source.role==='管理员'&&!isOwner(s))throw Error('无权转移此成员资源');
 if(!target||target.status!=='active'||sourceId===targetId)throw Error('请选择其他有效成员');
 const projects=[...org.projects,...(org.recycle||[])].filter(p=>p.createdBy===sourceId);
 for(const project of projects){project.createdBy=targetId;project.members[targetId]='管理';delete project.members[sourceId];}
 return projects.length;
}

export function updateMemberRole(s,id,role){
 const org=currentOrg(s),target=org.members.find(m=>m.id===id);
 if(!isManager(s)||!target||target.status!=='active')throw Error('无权修改此成员角色');
 if(target.role==='Owner')throw Error('Owner 只能通过转移流程交接');
 if(!['管理员','贡献者','查看者'].includes(role))throw Error('请选择有效组织角色');
 if(!isOwner(s)&&(target.role==='管理员'||role==='管理员'))throw Error('仅 Owner 可任免管理员');
 target.role=role;return target;
}

export function transferProject(s,id,sourceId,targetId,includeMembers=false){
 const source=s.orgs.find(org=>org.id===sourceId),target=s.orgs.find(org=>org.id===targetId),project=source?.projects.find(p=>p.id===id);
 if(!project||!target||source===target)throw Error('请选择其他有效组织');
 if(!isManager(s,source)||!isManager(s,target))throw Error('需要两个组织的管理权限');
 if(source.region!==target.region)throw Error('跨数据区转移暂不支持');
 if(target.projects.some(p=>p.name===project.name))throw Error('接收组织存在同名项目');
 if(!checkCapacity(target,project.bytes).allowed)throw Error('接收组织容量不足');
 const members=target.members.map(m=>({...m})),grants={};
 for(const userId of projectMemberIds(source,project)){
  const explicit=explicitSources(source,project,userId),role=explicit.some(x=>x.role==='管理')?'管理':explicit.some(x=>x.role==='贡献')?'贡献':'查看';
  let recipient=members.find(m=>m.id===userId);
  if(includeMembers){
   const person=source.members.find(m=>m.id===userId&&m.status==='active');
   if(!recipient&&person){
    if(members.some(m=>m.email.toLowerCase()===person.email.toLowerCase()))throw Error('接收组织存在相同邮箱的其他账户');
    recipient={id:person.id,name:person.name,email:person.email,role:role==='查看'?'查看者':'贡献者',status:'active',joinedAt:members.length,joinedAtTime:s.now};members.push(recipient);
   }
   if(recipient&&recipient.status!=='active')throw Error('项目成员在接收组织已停用，请先恢复或取消带入成员');
  }
  if(recipient?.status==='active')grants[userId]=role;
 }
 if(!target.paid&&countMemberSlots({...target,members})>CONFIG.freeMemberLimit)throw Error('接收组织成员名额不足');
 const owner=members.find(m=>m.id===target.owner&&m.status==='active');
 if(!owner)throw Error('接收组织缺少有效 Owner');
 grants[target.owner]='管理';
 detachProjectGroups(s,source,project.id);
 recordPermissionChange(s,source,'transfer-project',{projectId:project.id,members:project.members},{targetOrgId:target.id,members:grants});
 target.members=members;project.members=grants;project.ownerOrgId=target.id;project.transferredAt=s.now;project.updated=s.now.slice(0,10);project.updatedAt=s.now;
 source.projects=source.projects.filter(p=>p.id!==id);source.used=Math.max(0,source.used-project.bytes);
 target.projects.push(project);target.used+=project.bytes;target.tags=[...new Set([...target.tags,...project.tags])];
 for(const invite of target.invites){if(invite.status==='pending'&&members.some(m=>m.status==='active'&&m.email.toLowerCase()===invite.email.toLowerCase()))invite.status='accepted';}
 s.orgId=target.id;s.page='projectAdmin';return project;
}

export function saveProjectWithPermissions(s,id,data,groupRoles){
 const staged=structuredClone(s),org=currentOrg(staged),old=org.projects.find(p=>p.id===id);
 if(id&&!old)throw Error('项目不存在');
 if(staged.requestFailure)throw Error('保存失败，输入已保留');
 if(old&&!canPerformAction(staged,'manage',old))throw Error('没有项目管理权限');
 if(data.scope==='MEMBERS'&&!org.paid&&old?.scope!=='MEMBERS')throw Error('指定成员项目为付费能力，请升级当前组织');
 if(old&&({MEMBERS:0,SPACE:1,PUBLIC_READONLY:2}[data.scope]>{MEMBERS:0,SPACE:1,PUBLIC_READONLY:2}[old.scope])&&!canAuthorize(org,old,staged.user))throw Error('缺少该项目的授权管理权，不能扩大访问范围');
 const normalized=members=>JSON.stringify(Object.entries(members||{}).sort(([a],[b])=>a.localeCompare(b)));
 if(old&&normalized(old.members)!==normalized(data.members)&&!canAuthorize(org,old,staged.user))throw Error('缺少该项目的授权管理权，不能修改直接授权');
 for(const [uid,role] of Object.entries(data.members))if(!org.members.some(m=>m.id===uid&&(m.status==='active'||old?.members[uid]===role))||!['查看','贡献','管理'].includes(role))throw Error('请选择有效成员和项目角色');
 if(!org.paid){const before=old?.members||{},rank={'查看':0,'贡献':1,'管理':2};if(old&&Object.entries(data.members).some(([uid,role])=>!(uid in before)||rank[role]>rank[before[uid]]))throw Error('新增项目直接授权为付费能力；存量授权可撤销');}
 if(!data.name||data.name.length>80)throw Error('项目名称必填，最多 80 字符');
 if(data.name!==old?.name&&!/^[A-Za-z0-9+_.-]+$/.test(data.name))throw Error('项目名称格式不正确');
 if(org.projects.some(p=>p.id!==id&&p.name===data.name))throw Error('同组织已存在同名项目');
 if((data.desc||'').length>500)throw Error('描述最多 500 字符');
 groupRoles??=Object.fromEntries(groupsFor(org).filter(g=>g.projects[old?.id]).map(g=>[g.id,g.projects[old.id]]));
 const before=old?structuredClone(old):null;
 const project=old?Object.assign(old,data,{updated:staged.now.slice(0,10),updatedAt:staged.now}):createProject(staged,data);
 for(const group of [...groupsFor(org)]){const next=groupRoles[group.id],previous=group.projects[project.id];if(next===previous)continue;const draft=structuredClone(group);if(next)draft.projects[project.id]=next;else delete draft.projects[project.id];savePermissionGroup(staged,org,draft,group.id);}
 recordPermissionChange(staged,org,before?'update-project-permissions':'create-project',before,project);
 Object.assign(currentOrg(s),org);return currentOrg(s).projects.find(p=>p.id===project.id);
}
