'use client';
import { createContext,useContext,useEffect,useState } from 'react';
import Lenis from 'lenis';
const MotionContext=createContext({reduced:false,animated:false,osReduced:false,setManual:()=>{}});
export function useReadingMotion(){return useContext(MotionContext);}
export function MotionProvider({children}) {
  const [environment,setEnvironment]=useState({ready:false,eligible:false,osReduced:false});
  const [manual,setManualState]=useState(false);
  const reduced=manual||environment.osReduced;
  useEffect(()=>{
    const os=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const desktop=window.matchMedia?.('(min-width: 960px) and (pointer: fine)');
    try{setManualState(window.localStorage.getItem('portfolio-reduce-motion')==='reduce');}catch{}
    setEnvironment({ready:true,eligible:desktop?.matches||false,osReduced:os?.matches||false});
    const motion=event=>setEnvironment(state=>({...state,osReduced:event.matches}));
    const device=event=>setEnvironment(state=>({...state,eligible:event.matches}));
    os?.addEventListener('change',motion);desktop?.addEventListener('change',device);
    return ()=>{os?.removeEventListener('change',motion);desktop?.removeEventListener('change',device);};
  },[]);
  useEffect(()=>{
    document.documentElement.dataset.reducedMotion=String(reduced);
    return ()=>document.documentElement.removeAttribute('data-reduced-motion');
  },[reduced]);
  useEffect(()=>{
    if(!environment.ready||!environment.eligible||reduced)return;
    const lenis=new Lenis({autoRaf:true,smoothWheel:true,syncTouch:false,lerp:.1,wheelMultiplier:.85,anchors:false,stopInertiaOnNavigate:true,prevent:node=>Boolean(node.closest('dialog[open]'))});
    const anchors=event=>{
      if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.defaultPrevented)return;
      const link=event.target.closest?.('a[href]');
      if(!link||link.target==='_blank'||link.hasAttribute('download'))return;
      const url=new URL(link.href),current=new URL(window.location.href);
      if(url.origin!==current.origin||url.pathname!==current.pathname||!url.hash)return;
      let target;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{return;}
      if(!target)return;
      event.preventDefault();
      if(current.hash!==url.hash)window.history.pushState(null,'',url.hash);
      target.focus({preventScroll:true});
      // Lenis 1.3.26 reads CSS scroll-padding and scroll-margin itself.
      lenis.scrollTo(target,{duration:.8,lerp:0,force:true});
    };
    const interrupt=()=>lenis.scrollTo(window.scrollY,{immediate:true,force:true});
    const keys=event=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(event.key)&&!event.target.closest?.('input,textarea,select,[contenteditable=true]'))interrupt();};
    document.addEventListener('click',anchors);document.addEventListener('keydown',keys);window.addEventListener('popstate',interrupt);
    return ()=>{document.removeEventListener('click',anchors);document.removeEventListener('keydown',keys);window.removeEventListener('popstate',interrupt);lenis.destroy();};
  },[environment.ready,environment.eligible,reduced]);
  const setManual=value=>{
    setManualState(value);try{window.localStorage.setItem('portfolio-reduce-motion',value?'reduce':'system');}catch{}
  };
  return <MotionContext.Provider value={{reduced,animated:environment.ready&&environment.eligible&&!reduced,osReduced:environment.osReduced,setManual}}>{children}</MotionContext.Provider>;
}
export function MotionPreference(){
  const {reduced,osReduced,setManual}=useReadingMotion();
  return <label className="motion-preference"><input type="checkbox" aria-label="减少动态" checked={reduced} disabled={osReduced} onChange={event=>setManual(event.target.checked)}/><span>减少动态</span>{osReduced&&<small>跟随系统</small>}</label>;
}
