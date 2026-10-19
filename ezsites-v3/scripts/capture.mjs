import {chromium} from 'playwright';
import {mkdirSync} from 'node:fs';
mkdirSync('public',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for(const [url,base] of [['https://kurotsuki.sites.ezsites.app/','kurotsuki'],['https://kurotsuki.party/','kurotsuki-party']]){
 const ctx=await browser.newContext({viewport:{width:1080,height:1920},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await ctx.newPage();const r=await page.goto(url,{waitUntil:'domcontentloaded',timeout:50000});console.log(url,r?.status(),await page.title());await page.waitForTimeout(3000);
 await page.screenshot({path:`public/${base}-mobile.png`,fullPage:true});await ctx.close();
 const dctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});const dp=await dctx.newPage();await dp.goto(url,{waitUntil:'domcontentloaded',timeout:50000});await dp.waitForTimeout(3000);await dp.screenshot({path:`public/${base}-desktop.png`,fullPage:true});await dctx.close();
}
await browser.close();