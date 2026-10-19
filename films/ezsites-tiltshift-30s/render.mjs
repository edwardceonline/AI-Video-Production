import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';
import {spawnSync} from 'node:child_process';
const project=process.cwd();
const originalLemo=process.env.LEMO_LIB||path.resolve(project,'../../lemo');
const nodeRoot=path.join(project,'node_modules');
const out=path.join(project,'out');fs.mkdirSync(out,{recursive:true});
const files={
 '/film/':project+'/',
 '/node_modules/':nodeRoot+'/',
 '/lemo/':originalLemo+'/'
};
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{let raw=decodeURIComponent(req.url.split('?')[0]);let m=Object.entries(files).find(([url])=>raw.startsWith(url));
if(!m){res.writeHead(404).end('Unknown route');return}
const f=path.resolve(m[1],raw.slice(m[0].length));if(!f.startsWith(path.resolve(m[1]))){res.writeHead(403).end();return}
fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end(String(err));return}res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'}).end(data)})});
await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
try{
const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',x=>{if(x.type()==='error')errors.push(x.text())});
await page.goto('http://127.0.0.1:4173/film/index.html?w=540&h=960&ssaa=1',{waitUntil:'networkidle',timeout:60000});
await page.waitForFunction(()=>window.READY===true,{timeout:30000});
const pts=[.70,2.30,3.65,4.70];
for(const t of pts){await page.evaluate(t=>window.render(t),t);await page.locator('#stage canvas').screenshot({path:path.join(out,`frame_${t.toFixed(2)}.png`),timeout:60000});console.log('FRAME',t)}
const frames=path.join(out,'frames');fs.mkdirSync(frames,{recursive:true});
const count=5*24;
for(let i=0;i<count;i++){const t=i/24;await page.evaluate(t=>window.render(t),t);await page.locator('#stage canvas').screenshot({path:path.join(frames,`${i.toString().padStart(4,'0')}.png`),timeout:60000});if(i%24===0)console.log('PROGRESS',i,'of',count)}
if(errors.length)throw Error('Browser runtime: '+errors.join('\n'));
const ff=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',path.join(out,'tiltshift_5s_proof.mp4')],{encoding:'utf8'});
if(ff.status!==0)throw Error(ff.stderr);
console.log('SUCCESS: source-rendered four frames and silent 5s motion proof. No completed 30s film.');
}finally{await browser.close();server.close()}