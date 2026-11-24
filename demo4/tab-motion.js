const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let pending;
let frame;
const observed = new Set();
const keyFor = tabs => [...tabs.querySelectorAll(':scope > button')].map(button => `${button.dataset.action}:${button.dataset.value || button.textContent.trim()}`).join('|');
const resize = new ResizeObserver(() => schedule());

// Capture the displayed underline before app.js replaces the tab group.
document.addEventListener('click', event => {
 const button = event.target.closest('.tabs > button');
 if (!button || button.disabled || button.classList.contains('active')) return;
 const tabs = button.parentElement;
 const line = tabs.querySelector(':scope > .d4-tab-line');
 const active = tabs.querySelector(':scope > button.active');
 const rect = (line || active)?.getBoundingClientRect();
 if (rect) pending = {key: keyFor(tabs), left: rect.left, width: rect.width, time: performance.now()};
}, true);

function update() {
 frame = null;
 for (const tabs of observed) {
  if (!tabs.isConnected) { resize.unobserve(tabs); observed.delete(tabs); }
 }
 for (const tabs of document.querySelectorAll('.tabs')) {
  const active = tabs.querySelector(':scope > button.active');
  if (!active) continue;
  if (!observed.has(tabs)) { resize.observe(tabs); observed.add(tabs); }
  let line = tabs.querySelector(':scope > .d4-tab-line');
  if (!line) {
   line = document.createElement('span');
   line.className = 'd4-tab-line';
   line.setAttribute('aria-hidden', 'true');
   tabs.append(line);
  }
  const bounds = tabs.getBoundingClientRect();
  const target = active.getBoundingClientRect();
  const x = target.left - bounds.left + tabs.scrollLeft - tabs.clientLeft;
  const finalTransform = `translateX(${x}px) scaleX(${target.width})`;
  line.style.transform = finalTransform;
  if (pending?.key === keyFor(tabs) && performance.now() - pending.time < 600) {
   const fromX = pending.left - bounds.left + tabs.scrollLeft - tabs.clientLeft;
   line.getAnimations().forEach(animation => animation.cancel());
   if (!reducedMotion.matches) line.animate([
    {transform: `translateX(${fromX}px) scaleX(${pending.width})`},
    {transform: finalTransform}
   ], {duration: 220, easing: 'cubic-bezier(.65,0,.35,1)'});
   pending = null;
  }
 }
}
function schedule() { if (!frame) frame = requestAnimationFrame(update); }
new MutationObserver(schedule).observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['class']});
window.addEventListener('resize', schedule);
document.fonts.ready.then(schedule);
schedule();
