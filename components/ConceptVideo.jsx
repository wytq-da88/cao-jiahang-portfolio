'use client';
import { useState } from 'react';
import { withBasePath } from '../lib/site-path.js';
export default function ConceptVideo({src,poster,caption}){
  const [playing,setPlaying]=useState(false),[failed,setFailed]=useState(false);
  return <figure className="concept-video"><div className="video-stage">
    <img src={withBasePath(poster.src)} alt={poster.alt} width={poster.width} height={poster.height} loading="lazy"/>
    {playing&&!failed?<video src={withBasePath(src)} poster={withBasePath(poster.src)} controls autoPlay playsInline preload="metadata" onError={()=>{setFailed(true);setPlaying(false);}} aria-label="壁时 AI 辅助动态概念演示"/>:<button className="video-start" onClick={()=>{setFailed(false);setPlaying(true);}}><span aria-hidden="true">▷</span>{failed?'重试播放':'播放概念演示'}</button>}
  </div><figcaption><span>{caption}</span>{failed&&<p role="status">视频暂时无法播放，封面仍可查看。</p>}<a href={withBasePath(src)} target="_blank" rel="noopener noreferrer">打开视频原文件</a></figcaption></figure>;
}
