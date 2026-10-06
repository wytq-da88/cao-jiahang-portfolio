'use client';
import { useEffect,useState } from 'react';
import { withBasePath } from '../lib/site-path.js';
export default function CaseNav({sections}){
  const [active,setActive]=useState(sections[0]?.id);
  useEffect(()=>{
    if(!window.IntersectionObserver)return;
    const observer=new IntersectionObserver(entries=>{
      const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(current)setActive(current.target.id);
    },{rootMargin:'-25% 0px -60% 0px',threshold:0});
    sections.forEach(section=>{const element=document.getElementById(section.id);if(element)observer.observe(element);});
    return ()=>observer.disconnect();
  },[sections]);
  return <nav className="case-chapters" aria-label="案例章节"><div className="shell"><a className="chapter-home" href={withBasePath('/#works')}>← 作品</a><div>{sections.map(section=><a key={section.id} href={`#${section.id}`} aria-current={active===section.id?'location':undefined}>{section.label}</a>)}</div></div></nav>;
}
