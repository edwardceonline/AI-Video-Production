import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
fs.mkdirSync('output/stills',{recursive:true});
const frames=[12,73,133,168,200,262,335,381,427,466,500,556,604,633,670,707,752,791,820];
for (const frame of frames) {
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesV2',`output/stills/f${frame}.png`,'--frame',String(frame),'--overwrite','--log=error'],{stdio:'inherit'});
}