import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {chromium} from 'playwright';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),out=path.join(root,'out'),frames=path.join(out,'motion');
fs.mkdirSync(frames,{recursive:true});
const server=http.createServer((req,res)=>{
 const target=path.resolve(root,'.'+decodeURI((req.url||'/').split('?')[0]));
 if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||fs.statSync(target).isDirectory()){res.writeHead(404).end('not found');return;}
 res.setHeader('Content-Type',/\.(js|mjs)$/.test(target)?'text/javascript':target.endsWith('.html')?'text/html':'application/octet-stream');
 res.end(fs.readFileSync(target));
});
await new Promise(done=>server.listen(4173,'127.0.0.1',done));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1});
 const issues=[];page.on('pageerror',e=>issues.push(String(e)));page.on('console',m=>{if(m.type()==='error')issues.push(m.text());});
 await page.goto('http://127.0.0.1:4173/film.html',{waitUntil:'load',timeout:60000});
 await page.waitForFunction('window.READY === true',{timeout:90000});
 const canv=page.locator('canvas').first();
 for(const t of [0.5,1.8,3.7]){
   await page.evaluate(x=>window.render(x),t);
   await canv.screenshot({path:path.join(out,'style_'+t+'.png')});
 }
 for(let i=0;i<72;i++){
   await page.evaluate(x=>window.render(x),i/24);
   await canv.screenshot({path:path.join(frames,String(i).padStart(4,'0')+'.png')});
 }
 if(issues.length)throw new Error('Browser JS errors: '+issues.slice(0,10).join('\n'));
}finally{await browser.close();server.close();}
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',path.join(out,'tiltshift-look-proof-3s.mp4')],{stdio:'inherit'});
console.log('Source-rendered three style frames and 3s MOVEMENT PROOF. Not the 30s finished ad.');
