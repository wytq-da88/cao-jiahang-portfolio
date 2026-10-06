import { mkdir, copyFile, readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const source = resolve(process.argv[2] || 'D:/workspace/03-Portfolio-Career/portfolio-site/public');
const target = resolve('public/media');
const definitions = [
  ['walltimeFront','walltime-front.png','optimized/walltime-front-web.jpg','壁时正面概念渲染','概念效果图，界面信息为视觉示意。'],
  ['walltimeDetail','walltime-detail.png','optimized/walltime-detail-web.jpg','壁时中央显示与外环细节','概念细节渲染；图中的日期和界面字段为视觉示意。'],
  ['walltimeProcess','walltime-process.jpg',null,'壁时从玉璧到桌面器物的造型推导','造型推导与比例探索。'],
  ['walltimeConcept','walltime/walltime-concept-web.jpg','walltime/walltime-concept-web.jpg','壁时东方桌面概念画面','东方器物与桌面场景的概念表达。'],
  ['walltimeScene','walltime/walltime-concept-render-web.jpg','walltime/walltime-concept-render-web.jpg','壁时置于东方桌面空间的场景渲染','桌面场景概念效果。'],
  ['walltimeFeatures','walltime/walltime-feature-board-hd.png',null,'壁时功能细节与产品系统设计展板','产品功能、部件与界面的设计提案。'],
  ['walltimeApp','walltime/walltime-app-hd.png','walltime/walltime-app-web.jpg','壁时手机应用界面设计','场景灯光、节气与日程的应用界面概念。'],
  ['walltimeExploded','walltime/walltime-exploded.png',null,'壁时产品部件分解示意','外环、显示模组与底座的结构概念；非实物装配验证。'],
  ['walltimeSystem','walltime/walltime-system-web.jpg','walltime/walltime-system-web.jpg','壁时系统与功能组织','系统功能的概念示意。'],
  ['walltimeScenario','walltime/walltime-scenario-web.jpg','walltime/walltime-scenario-web.jpg','壁时使用场景设计','专注、休息与桌面陪伴的场景概念。'],
  ['walltimeFinal','walltime/walltime-final-board.png','walltime/walltime-final-board-web.jpg','壁时最终设计展板','最终概念展板；界面信息为视觉示意。'],
  ['coolingFan','selected-projects/cooling-fan-overview-4k.jpg',null,'手机散热风扇整体渲染','移动游戏场景下的产品造型提案。'],
  ['coolingFanDetail','selected-projects/cooling-fan-detail-4k.jpg',null,'手机散热风扇控制与结构细节','夹持、控制与红黑 CMF 的细节渲染。'],
  ['pillBox','selected-projects/smart-pill-box-board.jpg',null,'磁吸药盒完整设计展板','磁吸开合、独立药仓、侧边释放与使用流程的概念展板。'],
  ['fulingBrand','packaging/fuling-brand-board.png','packaging/fuling-brand-board-web.jpg','涪陵榨菜品牌与包装系列展板','地域视觉资产、色彩与系列包装的设计提案。'],
  ['fulingProduction','packaging/fuling-production-board.png','packaging/fuling-production-board-web.jpg','涪陵榨菜包装结构与应用展板','包装结构、陈列与衍生应用的概念展板。'],
  ['mouse','selected-projects/mouse-angle-right-4k.jpg',null,'无线鼠标右前方建模渲染','连续上壳曲面与分件表达。'],
  ['mouseLeft','selected-projects/mouse-angle-left-4k.jpg',null,'无线鼠标左前方建模渲染','办公鼠标的造型探索。'],
  ['mouseBottom','selected-projects/mouse-bottom-4k.jpg',null,'无线鼠标底部结构渲染','脚垫与底部结构布局。'],
  ['gameController','optimized/game-console-wide-web.jpg','optimized/game-console-wide-web.jpg','游戏手柄建模与渲染','消费电子造型练习。'],
  ['earbuds','optimized/earbuds-open-web.jpg','optimized/earbuds-open-web.jpg','无线蓝牙耳机开盖渲染','小型数码 CMF 与材质表达。'],
  ['juicer','selected-projects/portable-juicer-overview-6k.jpg',null,'便携式果汁机整体渲染','透明材质与产品结构练习。']
];
const names = {walltimeFront:'walltime-front',walltimeDetail:'walltime-detail',walltimeProcess:'walltime-process',walltimeConcept:'walltime-concept',walltimeScene:'walltime-scene',walltimeFeatures:'walltime-features',walltimeApp:'walltime-app',walltimeExploded:'walltime-exploded',walltimeSystem:'walltime-system',walltimeScenario:'walltime-scenario',walltimeFinal:'walltime-final',coolingFan:'cooling-fan',coolingFanDetail:'cooling-fan-detail',pillBox:'pill-box',fulingBrand:'fuling-brand',fulingProduction:'fuling-production',mouse:'mouse',mouseLeft:'mouse-left',mouseBottom:'mouse-bottom',gameController:'game-controller',earbuds:'earbuds',juicer:'juicer'};
const hash = data => createHash('sha256').update(data).digest('hex');
await mkdir(resolve(target,'originals'),{recursive:true});
await mkdir(resolve('data'),{recursive:true});
const media={},manifest=[];
for(const [key,relative,webRelative,alt,caption] of definitions){
  const original=resolve(source,'assets',relative),originalBytes=await readFile(original);
  if(originalBytes.length>95_000_000)throw new Error(`Original exceeds repository file limit: ${relative}`);
  const originalName=names[key]+extname(relative);
  const originalTarget=resolve(target,'originals',originalName);
  await copyFile(original,originalTarget);
  const originalInfo=await sharp(originalBytes).metadata();
  const displayName=names[key]+(webRelative?extname(webRelative):'.webp');
  const displayTarget=resolve(target,displayName);
  if(webRelative)await copyFile(resolve(source,'assets',webRelative),displayTarget);
  else await sharp(originalBytes).resize({width:1600,withoutEnlargement:true}).webp({quality:86,effort:5}).toFile(displayTarget);
  const displayBytes=await readFile(displayTarget),info=await sharp(displayBytes).metadata();
  media[key]={src:`/media/${displayName}`,originalSrc:`/media/originals/${originalName}`,alt,caption,width:info.width,height:info.height};
  manifest.push({key,source:`assets/${relative}`,webSource:webRelative?`assets/${webRelative}`:null,original:{sha256:hash(originalBytes),bytes:originalBytes.length,width:originalInfo.width,height:originalInfo.height,format:originalInfo.format},display:{sha256:hash(displayBytes),bytes:displayBytes.length,width:info.width,height:info.height,format:info.format},...media[key]});
  if(hash(await readFile(original))!==hash(originalBytes))throw new Error(`Source changed: ${relative}`);
}
const videoSource=resolve(source,'assets/walltime/walltime-hero.mp4');
await copyFile(videoSource,resolve(target,'walltime-concept.mp4'));
const videoBytes=await readFile(videoSource);
manifest.push({key:'walltimeVideo',source:'assets/walltime/walltime-hero.mp4',src:'/media/walltime-concept.mp4',sha256:hash(videoBytes),bytes:videoBytes.length,note:'Original AI concept video, visible original watermark preserved'});
await mkdir(resolve('public/downloads'),{recursive:true});
const resumeSource=resolve(source,'downloads/resume-cao-jiahang-ai-product-design.pdf');
await copyFile(resumeSource,resolve('public/downloads/resume-cao-jiahang.pdf'));
const resumeBytes=await readFile(resumeSource);
manifest.push({key:'resume',source:'downloads/resume-cao-jiahang-ai-product-design.pdf',src:'/downloads/resume-cao-jiahang.pdf',sha256:hash(resumeBytes),bytes:resumeBytes.length});
await writeFile(resolve('data/media.json'),JSON.stringify(media,null,2)+'\n');
await writeFile(resolve('docs/asset-manifest.json'),JSON.stringify({generated:new Date().toISOString(),sourceUnchanged:true,entries:manifest},null,2)+'\n');
console.log(`Prepared ${definitions.length} images + original video + resume. Original hashes unchanged.`);
console.log(`Display images: ${manifest.filter(x=>x.display).reduce((n,x)=>n+x.display.bytes,0)} bytes; original media retained separately.`);
