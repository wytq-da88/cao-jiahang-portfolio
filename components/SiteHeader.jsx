'use client';
import { useEffect,useId,useRef,useState } from 'react';
import { withBasePath } from '../lib/site-path.js';
export default function SiteHeader() {
  const [open,setOpen]=useState(false),[enhanced,setEnhanced]=useState(false);
  const headerRef=useRef(null),navRef=useRef(null),triggerRef=useRef(null),navId=useId();
  const close=(restore=true)=>{setOpen(false);if(restore)triggerRef.current?.focus();};
  useEffect(()=>setEnhanced(true),[]);
  useEffect(()=>{if(open)navRef.current?.querySelector('a')?.focus();},[open]);
  useEffect(()=>{
    const key=event=>{if(open&&event.key==='Escape'){event.preventDefault();close();}};
    const outside=event=>{if(open&&!headerRef.current?.contains(event.target))close(false);};
    document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
    return ()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
  },[open]);
  useEffect(()=>{
    const query=window.matchMedia?.('(max-width: 599px)');
    const resize=event=>{if(!event.matches)close(false);};
    query?.addEventListener('change',resize);return ()=>query?.removeEventListener('change',resize);
  },[]);
  return <header ref={headerRef} className={`site-header ${enhanced?'is-enhanced':''}`} data-open={open} onBlur={event=>{if(open&&event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))close(false);}}><div className="header-inner shell">
    <a className="identity" href={withBasePath('/')} aria-label="曹佳航 · 返回首页"><span className="identity-seal" aria-hidden="true">航</span><span>曹佳航<small>INDUSTRIAL DESIGN</small></span></a>
    <button ref={triggerRef} className="menu-toggle" aria-expanded={open} aria-controls={navId} aria-label={open?'关闭菜单':'打开菜单'} onClick={()=>open?close():setOpen(true)}><span>{open?'关闭':'目录'}</span><i aria-hidden="true"/></button>
    <nav ref={navRef} id={navId} className="site-nav" aria-label="主导航" onClick={event=>{if(event.target.closest('a'))close(false);}}><a href={withBasePath('/#works')}>作品</a><a href={withBasePath('/projects/walltime/')}>壁时</a><a href={withBasePath('/#about')}>关于</a><a href={withBasePath('/#contact')}>联系 <span aria-hidden="true">↗</span></a></nav>
  </div></header>;
}
