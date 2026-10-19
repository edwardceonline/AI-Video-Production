import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('output/stills',{recursive:true});
const frames=[0,34,90,147,172,199,235,280,323,359,412,465,498,545,596,636,668,697,718,747,773];
for(const f of frames){
 const out=`output/stills/frame-${String(f).padStart(3,'0')}.png`;
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesV3',out,'--frame',String(f),'--overwrite','--log=error'],{stdio:'inherit'});
 console.log('QA',f, out);
}