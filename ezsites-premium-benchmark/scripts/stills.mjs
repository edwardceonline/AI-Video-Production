import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
for (const frame of [12,42,78,105,141,178,204,230]) {
 execFileSync('npx',['remotion','still','src/index.ts','Benchmark',`output/stills/f${String(frame).padStart(3,'0')}.png`,'--frame',String(frame),'--overwrite'],{stdio:'inherit'});
}