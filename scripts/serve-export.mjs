import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 4173);
// Local QA controls never alter the exported files or production site.
const noScript=process.env.PREVIEW_NO_SCRIPT==='1';
const failMedia=new Set((process.env.PREVIEW_FAIL_MEDIA||'').split(',').filter(Boolean));
const originalDelay=Math.max(0,Math.min(Number(process.env.PREVIEW_DELAY_ORIGINAL_MS)||0,5000));
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.pdf':'application/pdf','.woff2':'font/woff2','.txt':'text/plain','.json':'application/json'};
async function notFound(res) {
  res.writeHead(404, {'Content-Type':mime['.html']});
  res.end(await readFile(resolve(root, '404.html')).catch(()=>'404 — 页面不存在'));
}
http.createServer(async(req,res)=>{
  try{
    const url = new URL(req.url, 'http://127.0.0.1');
    let path = decodeURIComponent(url.pathname);
    if (base && path !== base && !path.startsWith(`${base}/`)) return await notFound(res);
    if (base) path=path.slice(base.length)||'/';
    if(failMedia.has(path)){res.writeHead(404,{'Cache-Control':'no-store'});return res.end('QA: media unavailable');}
    if(originalDelay&&path.startsWith('/media/originals/'))await new Promise(done=>setTimeout(done,originalDelay));
    let file=resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root + sep)) return await notFound(res);
    let info=await stat(file).catch(()=>null);
    if (info?.isDirectory()){file=resolve(file,'index.html');info=await stat(file).catch(()=>null);}
    if (!info?.isFile()) return await notFound(res);
    const headers={'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
    if(noScript&&extname(file)==='.html'){
      const content=Buffer.from((await readFile(file,'utf8')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,''));
      res.writeHead(200,{...headers,'Content-Length':content.length});
      return res.end(req.method==='HEAD'?undefined:content);
    }
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');
    if(range){
      const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;
      if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}
      res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});
      if(req.method==='HEAD')return res.end();
      return createReadStream(file,{start,end}).pipe(res);
    }
    res.writeHead(200,{...headers,'Content-Length':info.size});
    if(req.method==='HEAD')return res.end();
    createReadStream(file).pipe(res);
  }catch{await notFound(res);}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}${base}/`));
