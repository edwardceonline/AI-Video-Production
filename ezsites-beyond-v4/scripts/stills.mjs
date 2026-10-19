import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
const points=[20,84,132,160,203,250,300,347,386,426,470,500,544,583,626,666,706,756,800,850,895];
for (const f of points){
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesBeyond',`output/stills/f-${String(f).padStart(3,'0')}.png`,'--frame',String(f),'--overwrite','--log','error'],{stdio:'inherit'});
}