import {chromium} from 'playwright';
import {mkdirSync, statSync} from 'node:fs';
mkdirSync('public',{recursive:true});
const url='https://kurotsuki.sites.ezsites.app/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for (const [type,width,height,deviceScaleFactor] of [['mobile',585,1100,1.8],['desktop',1440,1000,1.5]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor,isMobile:type==='mobile',hasTouch:type==='mobile'});
 const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:50000});
 if (!response || response.status()>=400) throw Error(`Website capture HTTP ${response?.status()}`);
 await page.evaluate(async()=>{await document.fonts.ready;for(const im of document.images){if(im.loading==='lazy') im.loading='eager';}});
 await page.waitForTimeout(3500);
 await page.screenshot({path:`public/kurotsuki-${type}.png`,fullPage:true,animations:'disabled',timeout:50000});
 console.log(type, await page.title(), statSync(`public/kurotsuki-${type}.png`).size);
 await page.close();
}
await browser.close();