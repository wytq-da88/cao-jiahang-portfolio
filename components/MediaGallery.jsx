'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { withBasePath } from '../lib/site-path.js';

function GalleryImage({src,alt,width,height,className='',lazy=true}) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>setFailed(false),[src]);
  if(failed) return <div className={`media-fallback ${className}`} role="img" aria-label={alt}><span>{alt}</span><p>图片暂时无法加载</p></div>;
  return <img className={className} src={withBasePath(src)} alt={alt} width={width} height={height} loading={lazy?'lazy':'eager'} onError={()=>setFailed(true)}/>;
}
export default function MediaGallery({items}) {
  const [index,setIndex]=useState(null);
  const dialogRef=useRef(null),closeRef=useRef(null),openerRef=useRef(null);
  const titleId=useId(),isOpen=index!==null;
  const current=isOpen?items[index]:null;
  const close=()=>setIndex(null);
  const move=delta=>setIndex(value=>(value+delta+items.length)%items.length);
  useEffect(()=>{
    const dialog=dialogRef.current;
    if(isOpen){if(!dialog.open)dialog.showModal();closeRef.current?.focus();}
    else{if(dialog.open)dialog.close();openerRef.current?.focus();}
  },[isOpen]);
  const open=(event,i)=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||typeof dialogRef.current?.showModal!=='function')return;
    event.preventDefault();openerRef.current=event.currentTarget;setIndex(i);
  };
  const keys=event=>{
    if(event.key==='Tab'){
      const focusable=Array.from(dialogRef.current.querySelectorAll('button:not([disabled]),a[href]'));
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    }
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}
    if(items.length>1&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
  };
  return <>
    <div className={`media-gallery ${items.length===1?'gallery-single':''}`}>
      {items.map((item,i)=><figure className={`gallery-card ${item.height>item.width?'media-portrait':''}`} key={item.src}>
        <a href={withBasePath(item.originalSrc)} target="_blank" rel="noopener noreferrer" aria-label={`查看${item.alt}原图`} aria-haspopup="dialog" onClick={event=>open(event,i)}>
          <GalleryImage {...item}/><span className="gallery-zoom" aria-hidden="true">放大 ↗</span>
        </a>
        <figcaption><span>{item.caption}</span><a href={withBasePath(item.originalSrc)} target="_blank" rel="noopener noreferrer">查看原图 ↗</a></figcaption>
      </figure>)}
    </div>
    <dialog ref={dialogRef} className="lightbox" aria-labelledby={titleId} aria-modal="true" onCancel={event=>{event.preventDefault();close();}} onClose={close} onKeyDown={keys} onClick={event=>{if(event.target===event.currentTarget)close();}} data-lenis-prevent>
      <h2 id={titleId} className="visually-hidden">作品图片画廊</h2>
      {current&&<div className="lightbox-panel">
        <div className="lightbox-top"><span>作品原图 <span className="lightbox-count">{index+1} / {items.length}</span></span><button ref={closeRef} className="icon-button" onClick={close} aria-label="关闭画廊">×</button></div>
        <div className="lightbox-stage"><GalleryImage src={current.originalSrc} alt={`${current.alt}，原图`} width={current.width} height={current.height} className="lightbox-image" lazy={false}/></div>
        <div className="lightbox-bottom"><button className="icon-button" onClick={()=>move(-1)} disabled={items.length<2} aria-label="上一张">←</button><div aria-live="polite"><p>{current.alt}</p><span>{current.caption}</span></div><button className="icon-button" onClick={()=>move(1)} disabled={items.length<2} aria-label="下一张">→</button></div>
        <a className="lightbox-original" href={withBasePath(current.originalSrc)} target="_blank" rel="noopener noreferrer">在新页面查看原图 ↗</a>
      </div>}
    </dialog>
  </>;
}
