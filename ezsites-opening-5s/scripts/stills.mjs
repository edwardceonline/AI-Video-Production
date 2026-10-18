import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
for(const f of [0,24,45,66,88,92,120,148]){
  execFileSync('npx',['remotion','still','src/index.ts','EzSitesOpening5s',`output/stills/f${String(f).padStart(3,'0')}.png`,'--frame',String(f),'--overwrite'],{stdio:'inherit'});
}