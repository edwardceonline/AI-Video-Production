import {chromium} from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('public',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const url='https://kurotsuki.sites.ezsites.app/';
const shots=[['mobile',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}],['desktop',{viewport:{width:1440,height:900},deviceScaleFactor:1}]];
for(const [name,opt] of shots){const ctx=await browser.newContext(opt);let p=await ctx.newPage();let r=await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(4400);await p.evaluate(async()=>{await document.fonts.ready});let title=await p.title();if(r?.status()!==200||!title.toLowerCase().includes('kurotsuki'))throw Error('Real Kurotsuki website inaccessible: '+String(r?.status())+' '+title);await p.screenshot({path:`public/kurotsuki-${name}-long.png`,fullPage:true,animations:'disabled'});console.log('Real product capture',name,title);await ctx.close()}
await browser.close();