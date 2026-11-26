import {currentOrg,isManager,countMemberSlots,rememberAccount,upgradePrototypeState,member} from './model.js';

export function submitApplication(state,organization,reason=''){
 const applicant=state.registration;
 if(!applicant||state.loggedOut)throw Error('请先登录后申请');
 const query=organization.trim();
 if(!query)throw Error('请输入组织 ID');
 const org=state.orgs.find(org=>org.id===query);
 if(!org)throw Error('未找到组织，请确认组织 ID');
 const email=applicant.email.trim().toLowerCase();
 const member=org.members.find(m=>m.email.toLowerCase()===email);
 if(member)throw Error(member.status==='active'?'你已经是该组织成员':'当前账号在此组织已禁用，请联系管理员');
 if(reason.trim().length>500)throw Error('申请说明最多 500 字符');
 org.joinApplications??=[];
 if(org.joinApplications.some(a=>a.email===email))throw Error('你已申请过该组织，不能重复申请。请查看申请状态或联系组织管理员。');
 const application={id:crypto.randomUUID(),name:applicant.name,email,reason:reason.trim(),status:'pending',createdAt:new Date().toISOString()};
 org.joinApplications.push(application);applicant.joinSubmitted=true;return application;
}

export function reviewApplication(state,id,decision){
 const org=currentOrg(state);
 if(!isManager(state))throw Error('只有组织管理员可以审核申请');
 if(!['approved','rejected'].includes(decision))throw Error('无效的审核结果');
 const application=org.joinApplications?.find(a=>a.id===id);
 if(!application||application.status!=='pending')throw Error('该申请已处理或不存在');
 if(decision==='approved'){
  let member=org.members.find(m=>m.email.toLowerCase()===application.email);
  if(member?.status==='disabled')throw Error('该账号已禁用，请先处理成员状态');
  const pending=org.invites.filter(i=>i.email.toLowerCase()===application.email&&i.status==='pending');
  if(member?.status!=='active'&&!org.paid&&countMemberSlots(org)>=10&&!pending.length)throw Error('组织成员名额已满，请释放名额或升级后再通过');
  if(!member){
   const existing=state.orgs.flatMap(o=>o.members).find(m=>m.email.toLowerCase()===application.email);
   member={id:existing?.id||'account:'+application.email,name:application.name,email:application.email,role:'贡献者',status:'active',joinedAt:org.members.length,joinedAtTime:new Date().toISOString()};
   org.members.push(member);
  }
  pending.forEach(invite=>invite.status='accepted');
 }
 Object.assign(application,{status:decision,reviewedAt:new Date().toISOString(),reviewedBy:state.user});
 return application;
}

export function applicantApplications(state){
 const email=state.registration?.email;
 return state.orgs.flatMap(org=>(org.joinApplications||[]).filter(a=>a.email===email).map(application=>({org,application})));
}

export function enterApprovedOrganization(state,id){
 const entry=applicantApplications(state).find(({application})=>application.id===id&&application.status==='approved');
 const member=entry?.org.members.find(m=>m.email===state.registration.email&&m.status==='active');
 if(!member)throw Error('暂时无法进入组织，请联系管理员');
 state.orgId=entry.org.id;state.user=member.id;state.registration=null;state.loggedOut=false;state.page='orgOverview';
 upgradePrototypeState(state);rememberAccount(state);
}

export function startJoinFlow(state){
 if(!state.registration){
  const current=member(state);
  if(!current||state.loggedOut)throw Error('请先登录后申请');
  state.registration={name:state.profiles?.[state.user]?.name||current.name,email:current.email,country:state.country,returnTo:{orgId:state.orgId,page:state.page}};
 }
 state.registration.step='join';
 state.registration.joinSubmitted=applicantApplications(state).length>0;
}

export function leaveJoinFlow(state){
 const target=state.registration?.returnTo;
 if(target){state.orgId=target.orgId;state.page=target.page;state.registration=null;}
 else if(state.registration)state.registration.step='organizations';
}
