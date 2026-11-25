import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from './src/model.js';
import {createPermissionGroupsUI} from './src/permission-groups-ui.js';

function fixture(){
 const s=M.upgradePrototypeState(M.seed()),o=M.currentOrg(s);o.paid=true;
 const elements=Object.fromEntries(['#pg-form','#pg-name','#pg-name-error','#pg-save-error','[data-action="pg-commit"]'].map(key=>[key,{value:'',textContent:'',hidden:true,attrs:{},setAttribute(k,v){this.attrs[k]=v;},focus(){this.focused=true;}}]));
 const root={querySelector:selector=>elements[selector]||null,querySelectorAll:()=>[]},dialogs=[];
 const ui=createPermissionGroupsUI({state:()=>s,org:()=>o,model:M,esc:String,btn:(text,action,cls='',extra='')=>`<button data-action="${action}" ${extra}>${text}</button>`,head:(title,_,actions)=>title+actions,empty:String,icon:()=>'',date:String,close:()=>{},render:()=>{},save:()=>{},toast:()=>{},formError:()=>{},modal:(title,body,foot,bind)=>{dialogs.push({title,body});bind?.();}});
 ui.action('pg-new',{});ui.bind(root);
 return {s,o,elements,root,dialogs,ui};
}

test('permission group form focuses persistent name errors then previews and saves after correction',()=>{
 const old=globalThis.document,{ui,root,elements,dialogs,o}=fixture();globalThis.document=root;
 try{
  assert.match(ui.page(true),/form="pg-form"/);
  elements['#pg-form'].onsubmit({preventDefault(){}});
  assert.equal(dialogs.length,0);assert.match(elements['#pg-name-error'].textContent,/名称必填/);assert(elements['#pg-name'].focused);assert.equal(elements['#pg-name'].attrs['aria-invalid'],'true');
  elements['#pg-name'].value='有效权限组';elements['#pg-name'].oninput({target:elements['#pg-name']});assert(elements['#pg-name-error'].hidden);
  elements['#pg-form'].onsubmit({preventDefault(){}});assert.equal(dialogs[0].title,'确认权限组变更');
  elements['[data-action="pg-commit"]'].onclick();assert(o.permissionGroups.some(g=>g.name==='有效权限组'));
 }finally{globalThis.document=old;}
});

test('members tab omits selected module and authorization failures stay visible',()=>{
 const old=globalThis.document,{s,o,ui,root,elements,dialogs}=fixture();globalThis.document=root;
 try{
  ui.action('pg-tab',{value:'members'});const html=ui.page(true);assert(!html.includes('pg-selected'));assert(!html.includes('已选择'));assert(html.includes('成员 / 用户名'));
  elements['#pg-name'].value='受限权限组';s.user='u1';
  const project=o.projects[2];
  // Select a project without authorization, as can happen if the actor changes while editing.
  const checkbox={dataset:{pgProject:project.id},checked:true};ui.bind({...root,querySelectorAll:selector=>selector==='[data-pg-project]'?[checkbox]:[]});checkbox.onchange();
  elements['#pg-form'].onsubmit({preventDefault(){}});assert.equal(dialogs.length,0);assert.match(elements['#pg-save-error'].textContent,/授权管理权/);assert(!elements['#pg-save-error'].hidden);
 }finally{globalThis.document=old;}
});
