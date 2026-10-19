import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('output/stills',{recursive:true});
const frames=[34,90,180,230,284,336,402,457,526,595,660,709,768];
for(const f of frames){
 const out=`output/stills/frame-${String(f).padStart(3,'0')}.png`;
 execFileSync('npx',['remotion','still','src/index.ts','EzSitesV3',out,'--frame',String(f),'--overwrite','--log=error'],{stdio:'inherit'});
 console.log('QA',f, out);
}