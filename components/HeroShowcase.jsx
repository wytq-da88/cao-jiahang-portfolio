'use client';
import { useEffect, useState } from 'react';
import media from '../data/media.json';
import { withBasePath } from '../lib/site-path.js';
import './hero-showcase.css';

const views = [
  { label: '整体', image: media.walltimeFront, note: '以玉璧为形，以节气为序。' },
  { label: '细节', image: media.walltimeDetail, note: '墨黑与金色之间，组织时间的层次。' },
  { label: '场景', image: media.walltimeScene, note: '让一件桌面器物，回到日常的尺度。' },
];

export default function HeroShowcase() {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [failed, setFailed] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  const loading = selected !== displayed && !failed;
  const view = views[displayed];

  return <figure className="hero-product hero-showcase">
    <div className="showcase-frame">
      <div className="showcase-label" aria-hidden="true"><span>01 / WALLTIME</span><span>器物 · 时间 · 日常</span></div>
      <div className="showcase-image-wrap" aria-busy={loading}>
        <img key={view.image.src} className="showcase-image" src={withBasePath(view.image.src)} alt={view.image.alt} width={view.image.width} height={view.image.height} fetchPriority={displayed === 0 ? 'high' : 'auto'} />
        {loading && <img key={views[selected].image.src} className="showcase-preload" aria-hidden="true" alt="" src={withBasePath(views[selected].image.src)} onLoad={() => setDisplayed(selected)} onError={() => setFailed(true)} />}
      </div>
      {enhanced && <div className="showcase-controls" role="group" aria-label="壁时展示视角">
        {views.map((item, i) => <button key={item.label} type="button" aria-label={`查看壁时${item.label}`} aria-pressed={selected === i} onClick={() => { setSelected(i); setFailed(false); }}><span aria-hidden="true">0{i + 1}</span>{item.label}</button>)}
        <span className="showcase-counter" aria-hidden="true">0{displayed + 1} / 03</span>
      </div>}
    </div>
    <figcaption><span>壁时 <i>WALLTIME</i></span><span>{view.note}</span></figcaption>
    <p className="showcase-status" role="status">{failed ? '这一视角未能加载，仍显示上一张图片。可点选重试。' : loading ? '正在载入下一视角…' : '概念渲染 · 界面信息为视觉示意'}</p>
  </figure>;
}
