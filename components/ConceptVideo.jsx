import { withBasePath } from '../lib/site-path.js';
export default function ConceptVideo({src,poster,caption}){
  return <figure className="concept-video"><div className="video-stage"><img src={withBasePath(poster.src)} alt={poster.alt} width={poster.width} height={poster.height} loading="lazy" /><a className="video-start" href={withBasePath(src)} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▷</span> 播放概念演示</a></div><figcaption>{caption}</figcaption></figure>;
}
