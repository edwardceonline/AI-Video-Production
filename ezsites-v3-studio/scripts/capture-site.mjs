import {chromium} from 'playwright';
import fs from 'node:fs';
const url='https://kurotsuki.sites.ezsites.app/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const configurations=[
 {label:'desktop',viewport:{width:1440,height:900},deviceScaleFactor:1,isMobile:false},
 {label:'mobile',viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}
];
for(const config of configurations){
 const context=await browser.newContext({viewport:config.viewport,deviceScaleFactor:config.deviceScaleFactor,isMobile:config.isMobile,hasTouch:!!config.hasTouch});
 const page=await context.newPage();
 const response=await page.goto(url,{timeout:55000,waitUntil:'domcontentloaded'});
 await page.waitForTimeout(5000);
 await page.evaluate(async()=>{await document.fonts.ready});
 const title=await page.title();const body=(await page.locator('body').innerText()).slice(0,260);
 console.log('SITE',config.label,response?.status(),title,body);
 if(response?.status()!==200||!(/kurotsuki/i.test(title+body)))throw new Error('Site content unavailable. Captures cannot be mocked.');
 await page.screenshot({path:`public/web-${config.label}-full.png`,fullPage:true,animations:'disabled'});
 await context.close();
}
await browser.close();