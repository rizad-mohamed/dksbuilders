import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.DKS_PLAYWRIGHT_MODULE||'playwright');
let args=[];
if(process.env.DKS_CHROMIUM_ARGS_MODULE){const {default:compact}=await import(process.env.DKS_CHROMIUM_ARGS_MODULE);args=compact.args.filter(arg=>!["--single-process","--disable-web-security","--allow-running-insecure-content"].includes(arg));}
const browser=await chromium.launch({headless:true,...(process.env.DKS_CHROMIUM_EXECUTABLE?{executablePath:process.env.DKS_CHROMIUM_EXECUTABLE,args}:{})});
const dist=path.resolve('dist'),out=path.resolve('qa-output');await mkdir(out,{recursive:true});
const report=[];
async function setup(options={}){
 const context=await browser.newContext({viewport:options.mobile?{width:390,height:844}:{width:1440,height:1000},reducedMotion:options.reduce?'reduce':'no-preference'});
 if(options.saveData)await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true,effectiveType:'4g'}}));
 if(options.reject)await context.addInitScript(()=>{HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('Autoplay blocked','NotAllowedError'));};});
 const requests=[],errors=[];
 await context.route('https://www.google.com/maps**',r=>r.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html><body></body></html>'}));
 await context.route('https://dks.test/**',async route=>{
  const url=new URL(route.request().url());requests.push(url.pathname);
  const file=path.resolve(dist,'.'+(url.pathname==='/'?'/index.html':url.pathname));
  try {
   assert(file.startsWith(dist+path.sep));
   if(options.fail&&file.endsWith('.mp4')){await route.fulfill({status:404,body:'missing video'});return;}
   let body=await readFile(file);const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.mp4':'video/mp4','.json':'application/json'};
   const range=route.request().headers().range;
   if(range&&file.endsWith('.mp4')){const match=/bytes=(\d+)-(\d*)/.exec(range);const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),body.length-1):body.length-1;await route.fulfill({status:206,contentType:'video/mp4',headers:{'accept-ranges':'bytes','content-range':`bytes ${start}-${end}/${body.length}`},body:body.subarray(start,end+1)});}
   else await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body});
  }catch{await route.fulfill({status:404,body:'not found'});}
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto('https://dks.test/');return {context,page,requests,errors};
}
try {
 for(const mobile of [false,true]){
  const {context,page,errors}=await setup({mobile});
  await page.waitForFunction(()=>document.querySelector('#hero-video').currentTime>0.2,{},{timeout:15000});
  const state=await page.locator('#hero-video').evaluate(v=>({src:new URL(v.src).pathname,muted:v.muted,loop:v.loop,inline:v.playsInline,width:v.videoWidth,height:v.videoHeight,duration:v.duration}));
  assert.equal(state.src,`/assets/dks-hero-${mobile?'mobile':'desktop'}.mp4`);assert(state.muted&&state.loop&&state.inline);assert.equal(state.duration,10);
  await page.locator('#video-toggle').click();assert.equal(await page.locator('#hero-video').evaluate(v=>v.paused),true);
  const stopped=await page.locator('#hero-video').evaluate(v=>v.currentTime);await page.waitForTimeout(300);assert.equal(await page.locator('#hero-video').evaluate(v=>v.currentTime),stopped);
  await page.locator('#company').scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);assert.equal(await page.locator('#hero-video').evaluate(v=>v.paused),true);
  await page.locator('#video-toggle').click();await page.waitForFunction(()=>!document.querySelector('#hero-video').paused);
  for(const time of [3,6]){await page.locator('#hero-video').evaluate((v,t)=>{v.pause();v.currentTime=t;},time);await page.waitForFunction(t=>Math.abs(document.querySelector('#hero-video').currentTime-t)<.1&&!document.querySelector('#hero-video').seeking,time);await page.screenshot({path:path.join(out,`video-${mobile?'mobile':'desktop'}-${time}.png`)});}
  await page.locator('#video-toggle').click();await page.locator('#company').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#hero-video').paused);
  await page.evaluate(()=>scrollTo(0,0));await page.waitForFunction(()=>!document.querySelector('#hero-video').paused);
  await page.locator('#hero-video').evaluate(v=>v.currentTime=9.8);await page.waitForFunction(()=>document.querySelector('#hero-video').currentTime<2,{},{timeout:5000});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('#hero-video').paused&&!document.querySelector('#hero-video').classList.contains('playing'));
  assert.equal(await page.locator('#video-toggle').isVisible(),false);assert.deepEqual(errors,[]);report.push({name:mobile?'mobile':'desktop',...state,playPause:true,offscreen:true,loop:true,reducedMotionChange:true});await context.close();
 }
 for(const options of [{reduce:true},{saveData:true},{reject:true},{fail:true}]){
  const {context,page,requests,errors}=await setup(options);await page.waitForTimeout(1600);
  assert.equal(await page.locator('#hero-video').evaluate(v=>v.classList.contains('playing')),false,JSON.stringify(options));assert.equal(await page.locator('#video-toggle').isVisible(),false);
  assert(await page.locator('.hero-picture img').evaluate(i=>i.complete&&i.naturalWidth>0));
  if(options.reduce||options.saveData)assert.equal(requests.some(p=>p.endsWith('.mp4')),false);
  assert.deepEqual(errors,[]);report.push({name:Object.keys(options)[0],poster:true,noVideoRequest:!requests.some(p=>p.endsWith('.mp4'))});await context.close();
 }
 await writeFile(path.join(out,'video-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
