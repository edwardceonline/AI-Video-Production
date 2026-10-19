import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
for(const f of [35,85,138,192,228,265,330,405,458,487,525,569,600,654,675,719,743]){
 console.log('STILL '+f);execFileSync('npx',['remotion','still','src/index.ts','EzSitesKurotsukiV3',`output/stills/f${f}.png`,'--frame',String(f),'--overwrite','--log=error'],{stdio:'inherit'});
}