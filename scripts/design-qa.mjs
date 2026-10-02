import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.DKS_PLAYWRIGHT_MODULE||'playwright');

let args=[];
if(process.env.DKS_CHROMIUM_ARGS_MODULE){const {default:compact}=await import(process.env.DKS_CHROMIUM_ARGS_MODULE);args=compact.args.filter(arg=>!["--single-process","--disable-web-security","--allow-running-insecure-content"].includes(arg));}
const browser=await chromium.launch({headless:true,...(process.env.DKS_CHROMIUM_EXECUTABLE?{executablePath:process.env.DKS_CHROMIUM_EXECUTABLE,args}: {})});
const dist=path.resolve('dist');const output=path.resolve('qa-output');await mkdir(output,{recursive:true});
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.mp4':'video/mp4','.json':'application/json','.txt':'text/plain','.xml':'application/xml'};
async function route(context){await context.route('https://dks.test/**',async r=>{let pathname=new URL(r.request().url()).pathname;if(pathname==='/')pathname='/index.html';const file=path.resolve(dist,'.'+pathname);try{assert(file.startsWith(dist+path.sep));await r.fulfill({status:200,contentType:mime[path.extname(file)]||'application/octet-stream',body:await readFile(file)});}catch{await r.fulfill({status:404,body:'not found'});}});}

const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await route(context);
await context.route('https://www.google.com/maps**',r=>r.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#dce6ec;height:100vh"><p style="padding:30px;font:16px Arial;color:#284e62">Google Maps frame — external service isolated for local layout QA</p></body></html>'}));
const page=await context.newPage();await page.goto('https://dks.test/');
assert.equal(await page.locator('.brand-grid img').count(),8);assert.equal(await page.locator('.project-gallery img').count(),5);
assert.equal(await page.locator('.developer-credit').getAttribute('href'),'https://quentagon.com/');
assert.match(await page.locator('.whatsapp-float').getAttribute('href'),/^https:\/\/wa.me\/94777552416/);
assert.equal(await page.locator('.whatsapp-float').evaluate(e=>getComputedStyle(e).position),'fixed');
assert.match(await page.locator('iframe').getAttribute('src'),/6.2898939,80.1617432/);
assert.equal(await page.locator('#scroll-progress').evaluate(e=>getComputedStyle(e).transform),'matrix(0, 0, 0, 1, 0, 0)');
for(const selector of ['.trusted','.projects','.approach','.contact','.footer']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.screenshot({path:path.join(output,`design-desktop-${selector.slice(1)}.png`)});}
await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(150);assert.equal(await page.locator('#scroll-progress').evaluate(e=>getComputedStyle(e).transform),'matrix(1, 0, 0, 1, 0, 0)');
await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('.process').scrollIntoViewIfNeeded();await page.waitForTimeout(200);assert((await page.locator('.process .step-active').count())>0);
await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
for(const selector of ['.trusted','.projects','.approach','.contact','.footer']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.screenshot({path:path.join(output,`design-mobile-${selector.slice(1)}.png`)});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
console.log('PASS: supplied logos/photos, WhatsApp link/fixed placement, Quentagon credit, exact map coordinates, full scroll progress and active workflow motion.');
await context.close();await browser.close();
