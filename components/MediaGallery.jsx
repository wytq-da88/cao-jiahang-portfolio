import { withBasePath } from '../lib/site-path.js';
export default function MediaGallery({items}){
  return <div className={`media-gallery ${items.length===1?'gallery-single':''}`}>{items.map(item=><figure className={`gallery-card ${item.height>item.width?'media-portrait':''}`} key={item.src}><a href={withBasePath(item.originalSrc)} target="_blank" rel="noopener noreferrer" aria-label={`查看${item.alt}原图`}><img src={withBasePath(item.src)} alt={item.alt} width={item.width} height={item.height} loading="lazy" /></a><figcaption><span>{item.caption}</span><a href={withBasePath(item.originalSrc)} target="_blank" rel="noopener noreferrer">查看原图 ↗</a></figcaption></figure>)}</div>;
}
