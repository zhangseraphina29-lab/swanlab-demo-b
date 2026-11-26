import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
function fixture(){const s=M.seed();M.upgradePrototypeState(s);const from=s.orgs[0],to=s.orgs[2],p=from.projects[0];to.projects=[];to.used=0;to.capacity=1e11;return {s,from,to,p};}
test('transfer ownership and permissions without importing source members',()=>{
 const {s,from,to,p}=fixture();to.members=to.members.filter(m=>m.id!=='u2');const before=from.used;
 M.transferProject(s,p.id,from.id,to.id,false);
 assert(!from.projects.includes(p));assert(to.projects.includes(p));assert.equal(p.ownerOrgId,to.id);
 assert.equal(p.members.u2,undefined);assert.equal(p.members[to.owner],'管理');assert.equal(from.used,before-p.bytes);assert.equal(to.used,p.bytes);assert.equal(s.orgId,to.id);
 assert.equal(p.experiments,24);assert.equal(p.createdBy,'u0');assert.equal(p.updatedAt,s.now);
});
test('optional import keeps project roles, existing organization roles and unique slots',()=>{
 const {s,from,to,p}=fixture();to.members=to.members.filter(m=>m.id!=='u2');to.invites=[{id:'i',email:'user2@example.com',role:'管理员',status:'pending'}];
 M.transferProject(s,p.id,from.id,to.id,true);
 const m=to.members.find(m=>m.id==='u2');assert.equal(m.role,'贡献者');assert.equal(m.joinedAtTime,s.now);assert.equal(p.members.u2,'贡献');assert.equal(to.members.find(m=>m.id==='u0').role,'Owner');assert.equal(to.invites[0].status,'accepted');assert(from.members.some(m=>m.id==='u2'));
});
test('transfer rejects capacity, name, region and unauthorized targets atomically',()=>{
 for(const issue of ['capacity','name','region','permission']){
  const {s,from,to,p}=fixture();if(issue==='capacity')to.capacity=1;if(issue==='name')to.projects.push({...p});if(issue==='region')to.region='other';if(issue==='permission')s.user='u2';
  const before=JSON.stringify(s);assert.throws(()=>M.transferProject(s,p.id,from.id,to.id,true));assert.equal(JSON.stringify(s),before);
 }
});
test('member quota, disabled accounts and email conflicts fail without partial transfer',()=>{
 for(const issue of ['quota','disabled','email']){
  const {s,from,to,p}=fixture();to.members=to.members.filter(m=>m.id!=='u2');
  if(issue==='quota')to.members.push(...Array.from({length:9},(_,i)=>({id:'n'+i,email:`n${i}@example.com`,status:'active'})));
  if(issue==='disabled')to.members.push({...from.members[2],status:'disabled'});
  if(issue==='email')to.members.push({...from.members[2],id:'different'});
  const before=JSON.stringify(s);assert.throws(()=>M.transferProject(s,p.id,from.id,to.id,true));assert.equal(JSON.stringify(s),before);
 }
});
