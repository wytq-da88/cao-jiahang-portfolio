'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReadingMotion } from './MotionProvider.jsx';
import { withBasePath } from '../lib/site-path.js';
import Arrow from './Arrow.jsx';
import './cinematic-hero.css';

export default function CinematicHero({ project = false }) {
  const section = useRef(null);
  const { animated } = useReadingMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const zoom = useTransform(scrollYProgress, [0, .7], [1.015, 1.17]);
  const lift = useTransform(scrollYProgress, [0, .7], [0, -95]);
  const copyOpacity = useTransform(scrollYProgress, [0, .48, .72], [1, .85, 0]);
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 80, damping: 25 });
  const y = useSpring(pointerY, { stiffness: 80, damping: 25 });
  const move = event => {
    if (!animated || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) * -.016);
    pointerY.set((event.clientY - rect.top - rect.height / 2) * -.012);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };

  return <section ref={section} className={`cinematic-hero ${project ? 'cinematic-project' : ''}`} data-animated={animated} onPointerMove={move} onPointerLeave={reset}>
    <div className="cinematic-sticky">
      <motion.div className="cinematic-camera" style={{ x: animated ? x : 0, y: animated ? y : 0 }}>
        <motion.img className="cinematic-image" src={withBasePath('/media/generated/walltime-cinematic.webp')} alt="壁时置于冷色光影与镜面空间中的 AI 场景演绎" width={1672} height={941} fetchPriority="high" style={{ scale: animated ? zoom : 1 }} />
      </motion.div>
      <div className="cinematic-shade" aria-hidden="true" />
      <div className="cinematic-top shell"><span>{project ? 'CASE STUDY / 01' : 'CAO JIAHANG / PORTFOLIO'}</span><span>PRODUCT · CMF · INTERACTION</span></div>
      <motion.div className="cinematic-copy shell" style={{ y: animated ? lift : 0, opacity: animated ? copyOpacity : 1 }}>
        <p className="cinematic-kicker"><span />{project ? 'WALLTIME — 桌面时间伙伴' : '工业设计，与交互的可能。'}</p>
        <h1>{project ? <>壁时<span className="cinematic-english">Time, reimagined.</span></> : <>让想象，<br /><span>有形发生。</span></>}</h1>
        <p className="cinematic-description">{project ? '把时间、光与节气，融入桌面生活。' : '我是曹佳航。探索产品的形态、材质，\n以及它与人相遇时的体验。'}</p>
        <div className="cinematic-actions"><a className="cinematic-cta" href={project ? '#seasons' : withBasePath('/projects/walltime/')}><span>{project ? '进入四季体验' : '探索壁时'}</span><Arrow diagonal /></a><a className="cinematic-secondary" href={project ? '#project-brief' : '#works'}>{project ? '阅读设计过程' : '浏览精选作品'} <span aria-hidden="true">↓</span></a></div>
      </motion.div>
      <div className="cinematic-bottom shell"><div><span className="cinematic-bottom-number">01</span><span>WALLTIME<span className="cinematic-bottom-sub">概念设计 / 2026</span></span></div><p>AI 场景演绎 · 产品设计见案例</p><a href={project ? '#seasons' : '#intro'} className="cinematic-scroll" aria-label="向下探索"><span aria-hidden="true">↓</span></a></div>
    </div>
  </section>;
}
