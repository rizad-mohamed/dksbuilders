import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.DKS_PLAYWRIGHT_MODULE||'playwright');
const AxeBuilder=require(process.env.DKS_AXE_MODULE||'@axe-core/playwright').default;
let args=[];
if(process.env.DKS_CHROMIUM_ARGS_MODULE){const {default:compact}=await import(process.env.DKS_CHROMIUM_ARGS_MODULE);args=compact.args.filter(arg=>!["--single-process","--disable-web-security","--allow-running-insecure-content"].includes(arg));}
const browser=await chromium.launch({headless:true,...(process.env.DKS_CHROMIUM_EXECUTABLE?{executablePath:process.env.DKS_CHROMIUM_EXECUTABLE,args}: {})});
const dist=path.resolve('dist');const output=path.resolve('qa-output');await mkdir(output,{recursive:true});
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.mp4':'video/mp4','.json':'application/json','.txt':'text/plain','.xml':'application/xml'};
async function route(context){await context.route('https://www.google.com/maps**',r=>r.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#dce6ec;height:100vh"></body></html>'}));await context.route('https://dks.test/**',async r=>{let pathname=new URL(r.request().url()).pathname;if(pathname==='/')pathname='/index.html';const file=path.resolve(dist,'.'+pathname);try{assert(file.startsWith(dist+path.sep));await r.fulfill({status:200,contentType:mime[path.extname(file)]||'application/octet-stream',body:await readFile(file)});}catch{await r.fulfill({status:404,body:'not found'});}});}
const report=[];
try {
 for(const [name,width,height] of [['small-mobile',320,780],['mobile',390,844],['tablet',768,1024],['laptop',1280,800],['desktop',1440,1000],['ultrawide',2560,1080]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});await route(context);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('https://dks.test/');await page.waitForLoadState('load');await page.waitForTimeout(150);
  assert.equal(await page.locator('h1').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${name} horizontal overflow`);
  if(width<=480){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
  await page.locator('.capability-list details').nth(4).locator('summary').click();await page.waitForTimeout(80);assert.equal(await page.locator('.service-image.selected').getAttribute('data-service'),'4');
  await page.locator('.project-register details').nth(2).locator('summary').click();assert(await page.locator('.project-register details').nth(2).getAttribute('open')!==null);
  assert.equal(await page.locator('#hero-video').getAttribute('src'),null);assert.equal(await page.locator('#enable-3d').isVisible(),false);
  await page.evaluate(async()=>{const images=[...document.images];for(const image of images){image.loading='eager';try{await image.decode();}catch{}}});
  const imageFailures=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(imageFailures,[]);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  report.push({name,width,height,errors,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);await page.screenshot({path:path.join(output,`${name}-hero.png`)});await page.screenshot({path:path.join(output,`${name}.png`),fullPage:true});
  assert.deepEqual(errors,[],`${name} console exceptions`);await context.close();
 }
 // Browser interaction pass with motion enabled and lazy WebGL requested.
 const context=await browser.newContext({viewport:{width:1440,height:1000}});await route(context);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('https://dks.test/');
 await page.locator('#structure-panel').scrollIntoViewIfNeeded();await page.locator('#enable-3d').click();await page.waitForFunction(()=>document.querySelector('#three-status').textContent.length>0);const threeStatus=await page.locator('#three-status').textContent();
 if(await page.locator('.structure-canvas canvas').count()){await page.locator('#structure-phase').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#phase-name').textContent(),'Enclosure');await page.screenshot({path:path.join(output,'three-study.png')});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelectorAll('.structure-canvas canvas').length===0);}
 report.push({name:'webgl-and-motion',threeStatus,errors});assert.deepEqual(errors,[]);await context.close();
 const nojs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});await route(nojs);const p=await nojs.newPage();await p.goto('https://dks.test/');assert.equal(await p.locator('#main-navigation').isVisible(),true);assert.equal(await p.locator('h1').isVisible(),true);await nojs.close();
 await writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.map(r=>({name:r.name,violations:r.violations?.length,threeStatus:r.threeStatus,errors:r.errors}))));
 const violations=report.flatMap(r=>r.violations||[]);assert.equal(violations.length,0,'Accessibility violations; see qa-output/report.json');
} finally {await browser.close();}
