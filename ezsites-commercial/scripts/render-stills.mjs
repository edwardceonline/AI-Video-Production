import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('output/stills',{recursive:true});
for(let i=1;i<=6;i++){
  execFileSync('npx',['remotion','still','src/index.ts',`EzSitesScene0${i}`,`output/stills/scene-0${i}.png`, '--overwrite'],{stdio:'inherit'});
}