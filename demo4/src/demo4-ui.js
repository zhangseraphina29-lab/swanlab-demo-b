import {iconNodes} from './icons.js';
// Component decoration only. Routes, forms, permissions and handlers remain in the deployed baseline.
document.documentElement.dataset.sidebarMode=localStorage.getItem('swanlab-demo4-sidebar-mode')||'hover';
const protectedNav='.topbar,.onboarding-header,#org-menu,#account-menu';
const special='.pricing-dialog,.sidebar,.settings-nav,.tabs,.segments,.single-select-menu,.scope-options,.project-card-actions,.admin-project-actions,#member-actions,.command-dialog';
function decorate(root=document){
 for(const el of root.querySelectorAll?.('.header-resources [title],#account-trigger')||[]){if(!el.dataset.d4Tooltip){el.dataset.d4Tooltip=el.getAttribute('title')||el.getAttribute('aria-label')||'';el.removeAttribute('title');}}
 for(const bottom of root.querySelectorAll?.('.sidebar .sidebottom')||[]){
  if(bottom.querySelector('.sidebar-mode-control'))continue;
  const control=document.createElement('div');control.className='sidebar-mode-control';
  control.innerHTML=`<button type="button" class="sidebar-mode-trigger" aria-label="侧边栏显示方式" aria-haspopup="menu" aria-expanded="false"><svg class="qingicon" viewBox="0 0 24 24" fill="none" aria-hidden="true">${iconNodes.sidebar}</svg><span>侧边栏显示</span></button><div class="sidebar-mode-menu" popover="auto" role="menu">${[['expanded','展开'],['collapsed','收起'],['hover','hover时展开']].map(([v,t])=>`<button type="button" role="menuitemradio" data-mode="${v}">${t}<span><svg class="qingicon" viewBox="0 0 24 24" fill="none" aria-hidden="true">${iconNodes.check}</svg></span></button>`).join('')}</div>`;
  bottom.querySelector('.capacitymini')?.after(control);if(!control.isConnected)bottom.append(control);
  const trigger=control.querySelector('button'),menu=control.querySelector('[popover]');
  const sync=()=>menu.querySelectorAll('[data-mode]').forEach(el=>el.setAttribute('aria-checked',String(el.dataset.mode===document.documentElement.dataset.sidebarMode)));sync();
  trigger.onclick=()=>{if(menu.matches(':popover-open')){menu.hidePopover();return;}sync();menu.showPopover();const r=trigger.getBoundingClientRect();menu.style.left=(r.right+12)+'px';menu.style.top=Math.max(8,Math.min(innerHeight-menu.offsetHeight-8,r.bottom-menu.offsetHeight))+'px';};
  menu.addEventListener('toggle',()=>trigger.setAttribute('aria-expanded',String(menu.matches(':popover-open'))));
  menu.onclick=e=>{const option=e.target.closest('[data-mode]');if(!option)return;document.documentElement.dataset.sidebarMode=option.dataset.mode;localStorage.setItem('swanlab-demo4-sidebar-mode',option.dataset.mode);sync();menu.hidePopover();trigger.blur();};
 }
 for(const sep of root.querySelectorAll?.('.crumb>span')||[]){if(sep.textContent.trim()==='/')sep.classList.add('d4-crumb-separator');}
 const find=s=>[...(root.matches?.(s)?[root]:[]),...root.querySelectorAll(s)];
 for(const img of find('img[src="logo.png"],img[data-d4-logo]')){
  img.dataset.d4Logo='true';
  const src=document.documentElement.dataset.theme==='dark'?'assets/swanlab-logo-dark.png':'assets/swanlab-logo-light.png';
  if(img.getAttribute('src')!==src)img.setAttribute('src',src);
 }
 for(const el of find('button')){
  if(el.closest(protectedNav))continue;
  if(el.closest(special)||el.matches('.projecttitle,.role-label,.single-select-trigger,.filter-trigger,.tag-color-swatch,.tag-color-dot,.tag-inline-save'))continue;
  const isText=el.matches('.alert-link,.filter-manage-tags,[data-variant="text"]')||!!el.closest('td')&&!el.matches('.primary,.danger')&&!!el.textContent.trim();
  const kind=isText?'text':el.classList.contains('ghost')?'ghost':el.classList.contains('primary')?'primary':el.classList.contains('danger')?'danger':'default';
  el.dataset.d4Button=kind;
  if(el.querySelector('svg')&&!el.textContent.trim())el.dataset.d4Icon='true';
 }
 for(const el of find('.settings-nav button')){el.setAttribute('aria-current',el.classList.contains('active')?'page':'false');}
}
decorate();
new MutationObserver(records=>{for(const r of records){if(r.type==='attributes')decorate(r.target);else for(const n of r.addedNodes)if(n instanceof Element)decorate(n);}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});

new MutationObserver(()=>decorate()).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

// Keep the hit area stationary while the upgrade button gently follows the pointer.
const upgradeMotion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
let magneticUpgrade;
function resetUpgradeMagnet() {
 if (!magneticUpgrade) return;
 magneticUpgrade.style.removeProperty('--upgrade-x');
 magneticUpgrade.style.removeProperty('--upgrade-y');
 magneticUpgrade = null;
}
document.addEventListener('pointermove', event => {
 const button = event.target.closest('.capacitymini .upgrade-entry');
 if (!button || !upgradeMotion.matches) { resetUpgradeMagnet(); return; }
 if (magneticUpgrade !== button) resetUpgradeMagnet();
 magneticUpgrade = button;
 const bounds = button.getBoundingClientRect();
 const x = Math.max(-3, Math.min(3, (event.clientX - bounds.left - bounds.width / 2) * .045));
 const y = Math.max(-1.5, Math.min(1.5, (event.clientY - bounds.top - bounds.height / 2) * .1));
 button.style.setProperty('--upgrade-x', `${x}px`);
 button.style.setProperty('--upgrade-y', `${y}px`);
});
document.addEventListener('pointerout', event => {
 if (magneticUpgrade && !magneticUpgrade.contains(event.relatedTarget)) resetUpgradeMagnet();
});
window.addEventListener('blur', resetUpgradeMagnet);
upgradeMotion.addEventListener('change', resetUpgradeMagnet);
