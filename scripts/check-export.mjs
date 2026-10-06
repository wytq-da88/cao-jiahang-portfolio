import { readFile,readdir,stat } from 'node:fs/promises';
import { resolve,relative,sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const routes=['/','/projects/walltime/','/projects/cooling-fan/','/projects/pill-box/','/projects/fuling-packaging/'];
export async function checkExport({outDir='out',basePath=process.env.NEXT_PUBLIC_BASE_PATH||'',requiredRoutes=routes,origin='https://wytq-da88.github.io'}={}){
  const root=resolve(outDir),base=basePath.replace(/\/$/,''),errors=[],documents=new Map();
  let referenceCount=0;
  const files=[];
  async function walk(dir){
    for(const entry of await readdir(dir,{withFileTypes:true})){
      const path=resolve(dir,entry.name);
      if(entry.isDirectory())await walk(path);else files.push(path);
    }
  }
  await walk(root);
  const hasFile=async path=>(await stat(path).catch(()=>null))?.isFile()||false;
  const pagePath=route=>resolve(root,`.${route}`,route.endsWith('/')?'index.html':'');
  const routeOf=file=>{
    const path='/'+relative(root,file).split(sep).join('/');
    return path.endsWith('/index.html')?path.slice(0,-10):path;
  };
  for(const file of files.filter(file=>file.endsWith('.html'))){
    const document=new JSDOM(await readFile(file,'utf8')).window.document;
    documents.set(file,document);
  }
  async function checkReference(raw,source,sourceRoute,{strict=false,fragment=false}={}){
    if(!raw||/^(data:|mailto:|tel:|javascript:)/i.test(raw))return;
    let url;try{url=new URL(raw,origin+base+sourceRoute);}catch{errors.push(`${source}: invalid URL ${raw}`);return;}
    const absolute=/^(https?:)?\/\//i.test(raw);
    if(url.origin!==origin){if(strict)errors.push(`${source}: wrong site origin ${raw}`);return;}
    if(absolute&&!strict&&base&&url.pathname!==base&&!url.pathname.startsWith(base+'/'))return;
    referenceCount++;
    if(base&&url.pathname!==base&&!url.pathname.startsWith(base+'/')){errors.push(`${source}: outside basePath ${raw}`);return;}
    let pathname;try{pathname=decodeURIComponent(url.pathname).slice(base.length)||'/';}catch{errors.push(`${source}: invalid encoding ${raw}`);return;}
    let target=resolve(root,`.${pathname}`);
    if(target!==root&&!target.startsWith(root+sep)){errors.push(`${source}: escapes export ${raw}`);return;}
    if((await stat(target).catch(()=>null))?.isDirectory())target=resolve(target,'index.html');
    if(!await hasFile(target)){errors.push(`${source}: missing resource ${raw}`);return;}
    if(fragment&&url.hash&&documents.has(target)){
      let id;try{id=decodeURIComponent(url.hash.slice(1));}catch{errors.push(`${source}: invalid fragment ${raw}`);return;}
      if(!documents.get(target).getElementById(id))errors.push(`${source}: missing fragment ${raw}`);
    }
  }
  for(const [file,document] of documents){
    const source=relative(root,file),route=routeOf(file);
    for(const element of document.querySelectorAll('[src],[href],[poster],[srcset]')){
      for(const attribute of ['src','href','poster']){
        const raw=element.getAttribute(attribute);
        if(raw)await checkReference(raw,source,route,{fragment:attribute==='href',strict:element.getAttribute('rel')==='canonical'});
      }
      const srcset=element.getAttribute('srcset');
      if(srcset&&!srcset.startsWith('data:'))for(const item of srcset.split(','))await checkReference(item.trim().split(/\s+/)[0],source,route);
    }
    for(const meta of document.querySelectorAll('meta[property="og:image"]'))await checkReference(meta.content,source,route,{strict:true});
  }
  for(const file of files.filter(file=>file.endsWith('.css'))){
    const css=await readFile(file,'utf8'),source=relative(root,file);
    for(const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g))await checkReference(match[1],source,'/'+source.split(sep).join('/'));
  }
  for(const route of requiredRoutes){
    const file=pagePath(route),document=documents.get(file);
    if(!document){errors.push(`missing required route ${base}${route}`);continue;}
    const expected=origin+base+route;
    if(document.querySelector('link[rel="canonical"]')?.href!==expected)errors.push(`${route}: canonical must be ${expected}`);
    if(document.querySelector('meta[property="og:url"]')?.content!==expected)errors.push(`${route}: Open Graph URL must be ${expected}`);
    if(!document.title.trim()||!document.querySelector('meta[name="description"]')?.content.trim())errors.push(`${route}: missing title or description`);
    if(!document.querySelector('meta[property="og:image"]'))errors.push(`${route}: missing Open Graph image`);
  }
  if(!await hasFile(resolve(root,'404.html')))errors.push('missing 404.html');
  return {basePath:base,htmlCount:documents.size,referenceCount,requiredRoutes:requiredRoutes.length,errors:[...new Set(errors)]};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  try{
    const report=await checkExport({outDir:process.argv[2]||'out'});
    console.log(JSON.stringify(report,null,2));
    if(report.errors.length)process.exitCode=1;
  }catch(error){console.error(error.message);process.exitCode=1;}
}
