/* Business content works first. Motion, video and WebGL progressively enhance it. */
document.documentElement.classList.add('js-enabled');
const $ = selector => document.querySelector(selector);
const menuButton = $('.menu-toggle');
const navigation = $('#main-navigation');
const header = $('#site-header');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');
menuButton.hidden = false;
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.querySelector('span').textContent='Menu'; }
menuButton.addEventListener('click',()=>{ const open=menuButton.getAttribute('aria-expanded')!=='true'; navigation.classList.toggle('open',open); menuButton.setAttribute('aria-expanded',String(open)); menuButton.querySelector('span').textContent=open?'Close':'Menu'; });
navigation.addEventListener('click',event=>{ if(event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown',event=>{ if(event.key==='Escape'&&navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
matchMedia('(max-width:480px)').addEventListener('change',closeMenu);
$('#year').textContent=String(new Date().getFullYear());

const serviceNames=['BUILDING CONSTRUCTION','HIGHWAY CONSTRUCTION','BRIDGE CONSTRUCTION','WATER SUPPLY & SEWERAGE','IRRIGATION & DRAINAGE','HOUSE CONSTRUCTION'];
for(const group of document.querySelectorAll('.capability-list,.project-register')) {
 group.addEventListener('toggle',event=>{
  if(!event.target.open) return;
  group.querySelectorAll('details').forEach(sibling=>{if(sibling!==event.target) sibling.open=false;});
  if(group.classList.contains('capability-list')) {
   const index=Number(event.target.dataset.service);
   document.querySelectorAll('.service-image').forEach(image=>image.classList.toggle('selected',Number(image.dataset.service)===index));
   $('#service-caption').textContent=`0${index+1} / ${serviceNames[index]}`;
  }
 },true);
}

let revealObserver;
let raf=0;
const hero=$('.hero');
const heroImage=$('.hero-picture img');
const process=$('.approach');
const processImage=$('.process-media>img');
function updateScroll() {
 raf=0;
 const scrollY=window.scrollY;
 const heroHeight=hero.offsetHeight;
 const bounds=process.getBoundingClientRect();
 header.classList.toggle('scrolled',scrollY>60);
 const pageProgress=Math.max(0,Math.min(1,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));
 $('#scroll-progress').style.transform=`scaleX(${pageProgress})`;
 document.querySelectorAll('.process li').forEach(step=>{const rect=step.getBoundingClientRect();step.classList.toggle('step-active',rect.top<innerHeight*.72&&rect.bottom>innerHeight*.22);});
 if(reducedMotion.matches) return;
 const desktop=innerWidth>760&&finePointer.matches;
 heroImage.style.transform=desktop&&scrollY<heroHeight?`translateY(${Math.min(scrollY*.08,55)}px) scale(1.06)`:'';
 const progress=Math.min(1,Math.max(.05,(innerHeight-bounds.top)/(innerHeight+bounds.height*.35)));
 $('.process-line span').style.transform=`scaleX(${progress})`;
 processImage.style.transform=desktop&&bounds.top<innerHeight&&bounds.bottom>0?`translateY(${(progress-.5)*32}px) scale(1.06)`:'';
}
function onScroll() { if(!raf) raf=requestAnimationFrame(updateScroll); }
function configureMotion() {
 revealObserver?.disconnect();
 document.documentElement.classList.toggle('motion-enabled',!reducedMotion.matches);
 document.querySelectorAll('.reveal').forEach(element=>element.classList.remove('pending'));
 if(!reducedMotion.matches&&'IntersectionObserver' in window) {
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');revealObserver.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(element=>{if(element.getBoundingClientRect().top>innerHeight)element.classList.add('pending');revealObserver.observe(element);});
 }
 if(reducedMotion.matches){heroImage.style.transform='';processImage.style.transform='';$('.process-line span').style.transform='';}
 updateScroll();
}
reducedMotion.addEventListener('change',configureMotion);
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll,{passive:true});
configureMotion();
const navSections=[...document.querySelectorAll('#home,#projects,#careers')];
// Observe all meaningful navigation destinations, without changing browser history.
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) navigation.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));}),{rootMargin:'-10% 0px -55% 0px'});navSections.forEach(section=>observer.observe(section));}

// A real video is loaded only when configured, on capable connections, after the poster paints.
const video=$('#hero-video');
const videoToggle=$('#video-toggle');
let videoConfigured=false;
let videoLoading=false;
let mediaReady=false;
let userPaused=false;
let heroVisible=true;
function constrainedConnection(){const c=navigator.connection;return Boolean(c?.saveData||['slow-2g','2g'].includes(c?.effectiveType));}
function allowVideo(){return !reducedMotion.matches&&!constrainedConnection()&&!userPaused&&heroVisible&&!document.hidden;}
video.addEventListener('playing',()=>{if(!allowVideo()){video.pause();video.classList.remove('playing');videoToggle.hidden=true;return;}video.classList.add('playing');videoToggle.hidden=false;videoToggle.textContent='Pause video';});
video.addEventListener('pause',()=>{videoToggle.textContent='Play video';});
video.addEventListener('error',()=>{video.classList.remove('playing');videoToggle.hidden=true;});
async function configureVideo(){
 if(!mediaReady||!allowVideo()||videoConfigured||videoLoading)return;
 videoLoading=true;
 try {
  const config=await fetch('/media-config.json').then(r=>{if(!r.ok)throw Error('No media configuration');return r.json();});
  if(!allowVideo())return;
  const mobile=innerWidth<=760;
  const media=mobile?(config.mobile||config.desktop):config.desktop;
  if(!media||typeof media!=='string'||!/^\/assets\/[\w./-]+\.(mp4|webm)$/.test(media))return;
  video.poster=mobile?'/assets/dks-hero-poster-mobile.webp':'/assets/dks-hero-poster-1280.webp';
  video.src=media;video.muted=true;videoConfigured=true;
  $('#hero-credit').textContent=config.credit||'Illustrative cinematic imagery';
  await video.play();
 }catch { video.pause();video.classList.remove('playing');videoToggle.hidden=true; }
 finally {videoLoading=false;}
}
function resumeVideo(){if(!allowVideo())return;if(videoConfigured)video.play().catch(()=>{});else configureVideo();}
videoToggle.addEventListener('click',()=>{if(video.paused){userPaused=false;resumeVideo();}else{userPaused=true;video.pause();}});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){video.pause();video.classList.remove('playing');videoToggle.hidden=true;}else resumeVideo();});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(heroVisible)resumeVideo();else video.pause();},{threshold:.1}).observe(hero);
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else resumeVideo();});
function startVideo(){mediaReady=true;configureVideo();}
if('requestIdleCallback' in window) requestIdleCallback(startVideo,{timeout:3000});else setTimeout(startVideo,1200);

// An explicit action lazy-loads the 3D study; its meaningful static alternative remains visible.
const phase=$('#structure-phase');
const phaseLabels=['Plan and footprint','Structural frame','Enclosure'];
let structureAPI;
phase.addEventListener('input',()=>{$('#phase-name').textContent=phaseLabels[Number(phase.value)];structureAPI?.setPhase(Number(phase.value));$('#structure-panel').dataset.phase=phase.value;});
const enable3d=$('#enable-3d');
if(!reducedMotion.matches&&finePointer.matches&&innerWidth>=900&&!(navigator.deviceMemory&&navigator.deviceMemory<4))enable3d.hidden=false;
enable3d.addEventListener('click',async()=>{
 enable3d.disabled=true;enable3d.textContent='Loading study…';
 try { const module=await import('/structure.js');structureAPI=await module.createStructuralStudy($('#structure-canvas'),Number(phase.value));$('#structure-panel').classList.add('three-ready');enable3d.hidden=true;$('#three-status').textContent='3D structural study loaded. Move your pointer over the model or change the construction sequence.'; }
 catch { enable3d.hidden=true;$('#three-status').textContent='Interactive 3D is unavailable. The structural illustration and sequence remain available.'; }
});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){structureAPI?.dispose();structureAPI=null;$('#structure-panel').classList.remove('three-ready');enable3d.hidden=true;}});
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);revealObserver?.disconnect();structureAPI?.dispose();video.pause();},{once:true});
