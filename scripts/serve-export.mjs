import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 4173);
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
    let file=resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root + sep)) return await notFound(res);
    let info=await stat(file).catch(()=>null);
    if (info?.isDirectory()){file=resolve(file,'index.html');info=await stat(file).catch(()=>null);}
    if (!info?.isFile()) return await notFound(res);
    const headers={'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
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
