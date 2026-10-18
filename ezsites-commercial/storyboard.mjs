import {sceneHTML} from './src/visuals.js';
import {writeFileSync,mkdirSync} from 'node:fs';
mkdirSync('output/storyboard',{recursive:true});
for(let step=1;step<=6;step++){
  const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${await import('node:fs').then(m=>m.readFileSync('src/styles.css','utf8'))}</style><style>html,body{width:1080px;height:1920px;overflow:hidden}</style></head><body><div class="ad-scene scene-${step}" style="--reveal:1"><div class="scene-inner">${sceneHTML(step)}</div></div></body></html>`;
  writeFileSync(`output/storyboard/scene-0${step}.html`,html);
}