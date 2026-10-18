import {execFileSync} from 'node:child_process';import fs from 'node:fs';
fs.mkdirSync('output/stills',{recursive:true});
for(const frame of [10,70,145,159,220,325,380,448,510,565,610,689,715,775]){
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesFullCommercial',`output/stills/f${frame}.png`,'--frame',String(frame),'--overwrite','--log=error'],{stdio:'inherit'});
}