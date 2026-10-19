import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
const frames=[18,50,95,131,165,203,226,255,318,375,403,428,483,532,565,625,674,701,746,793,824,859,886];
for(const f of frames){
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesBeyondYourDoors',`output/stills/f${String(f).padStart(3,'0')}.png`,'--frame',String(f),'--overwrite','--log=error'],{stdio:'inherit'});
}