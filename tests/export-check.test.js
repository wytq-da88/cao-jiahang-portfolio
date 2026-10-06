import { beforeEach,afterEach,describe,it,expect } from 'vitest';
import { mkdir,mkdtemp,writeFile,rm,unlink } from 'node:fs/promises';
import { resolve,dirname,sep } from 'node:path';
import { checkExport } from '../scripts/check-export.mjs';
const fixtureRoot=resolve('.cache/export-fixtures');
let fixture;
beforeEach(async()=>{await mkdir(fixtureRoot,{recursive:true});fixture=await mkdtemp(resolve(fixtureRoot,'case-'));});
afterEach(async()=>{if(!fixture.startsWith(fixtureRoot+sep))throw new Error('Unsafe fixture cleanup');await rm(fixture,{recursive:true,force:true});});
async function put(path,value){const target=resolve(fixture,path);await mkdir(dirname(target),{recursive:true});await writeFile(target,value);}
async function site(base=''){
  const page=(route,body)=>`<!doctype html><html lang="zh-CN"><head><title>作品</title><meta name="description" content="设计案例"><link rel="canonical" href="https://wytq-da88.github.io${base}${route}"><meta property="og:url" content="https://wytq-da88.github.io${base}${route}"><meta property="og:image" content="https://wytq-da88.github.io${base}/media/a.jpg"><link rel="stylesheet" href="${base}/styles/site.css"></head><body>${body}</body></html>`;
  await put('index.html',page('/',`<main id="works"><a href="${base}/projects/walltime/#detail">案例</a><img src="${base}/media/a.jpg" width="100" height="75"><video poster="${base}/media/a.jpg" src="${base}/media/demo.mp4"></video><a href="${base}/downloads/resume.pdf">简历</a><script src="${base}/scripts/app.js"></script></main>`));
  await put('projects/walltime/index.html',page('/projects/walltime/','<main id="detail">细节</main>'));
  for(const path of ['media/a.jpg','media/demo.mp4','downloads/resume.pdf','scripts/app.js','fonts/a.woff2'])await put(path,'fixture');
  await put('styles/site.css','@font-face{font-family:a;src:url(../fonts/a.woff2)}');
  await put('404.html','<h1>404</h1>');
}
const options=()=>({outDir:fixture,requiredRoutes:['/','/projects/walltime/']});
describe('static export resources and routes',()=>{
  it('accepts real root resources, CSS fonts and a cross-page chapter',async()=>{
    await site();expect((await checkExport(options())).errors).toEqual([]);
  });
  it('accepts the same files mounted under the Pages repository path',async()=>{
    await site('/cao-jiahang-portfolio');expect((await checkExport({...options(),basePath:'/cao-jiahang-portfolio'})).errors).toEqual([]);
  });
  it('reports a broken image URL instead of treating HTML as a successful build',async()=>{
    await site();await unlink(resolve(fixture,'media/a.jpg'));
    expect((await checkExport(options())).errors.join('\n')).toContain('/media/a.jpg');
  });
  it('rejects a root asset URL that escapes the Pages repository mount',async()=>{
    await site('/cao-jiahang-portfolio');await put('index.html','<img src="/media/a.jpg">');
    expect((await checkExport({...options(),basePath:'/cao-jiahang-portfolio'})).errors.join('\n')).toContain('outside basePath');
  });
  it('reports missing chapter IDs on a linked case page',async()=>{
    await site();await put('projects/walltime/index.html','<main id="other">案例</main>');
    expect((await checkExport(options())).errors.join('\n')).toContain('#detail');
  });
  it('reports an absent required case even if no other page links to it',async()=>{
    await site();await unlink(resolve(fixture,'projects/walltime/index.html'));
    expect((await checkExport(options())).errors.join('\n')).toContain('required route');
  });
});
