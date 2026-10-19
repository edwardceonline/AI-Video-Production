import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('output/stills',{recursive:true});
const frames=[9,55,110,150,184,210,246,288,327,368,410,450,492,528,580,620,669,717,747,775,818,857,893];
for(const n of frames){execFileSync('npx',['remotion','still','src/index.ts','BeyondDoors',`output/stills/frame-${String(n).padStart(3,'0')}.png`,'--frame',String(n),'--overwrite','--log','error','--concurrency','2'],{stdio:'inherit'});console.log('STILL',n)}