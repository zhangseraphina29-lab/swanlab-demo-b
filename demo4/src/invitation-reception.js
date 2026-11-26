import {member,redeemInviteLink} from './model.js';

export function invitationIdentity(state){
 if(state.loggedOut||state.page==='auth')return null;
 if(state.registration)return {name:state.registration.name,email:state.registration.email};
 const current=member(state);
 return current?{name:state.profiles?.[state.user]?.name||current.name,email:current.email}:null;
}

export function loginForInvitation(state,name,email){
 email=email.trim().toLowerCase();name=name.trim();
 if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('请填写姓名及有效邮箱');
 const org=state.orgs.find(org=>org.members.some(m=>m.email===email&&m.status==='active'));
 if(org){state.orgId=org.id;state.user=org.members.find(m=>m.email===email).id;state.registration=null;}
 else state.registration={name,email,country:state.country||'中国',step:'organizations'};
 state.loggedOut=false;state.page='orgOverview';
}

export function acceptAuthenticatedInvitation(state,id){
 const identity=invitationIdentity(state);
 if(!identity)throw Error('请先登录或注册');
 const existing=state.orgs.flatMap(o=>o.members).some(m=>m.email===identity.email);
 const result=redeemInviteLink(state,id,identity.email);
 if(!existing){result.name=identity.name;state.profiles[state.user].name=identity.name;}
 state.registration=null;
 return result;
}
