import { portfolio } from '../data/portfolio.js';
import { withBasePath } from '../lib/site-path.js';
import Arrow from './Arrow.jsx';
import HeroShowcase from './HeroShowcase.jsx';

export default function HomePage() {
  const clock = portfolio.projects[0];
  return <main id="main-content" tabIndex={-1}>
    <section className="home-hero dark-stage"><div className="shell hero-grid">
      <div className="hero-copy"><p className="eyebrow"><span className="fine-line" /> 东方器物研究室</p><h1>从东方时间观，<br />设计当代日常。</h1><p className="hero-description">我是曹佳航。以产品设计连接文化与日常，<br className="desktop-break" />探索形态、材质与人的关系。</p><div className="hero-actions"><a className="button button-gold" href={withBasePath('/projects/walltime/')}>探索壁时 <Arrow /></a><a className="text-link" href="#works">全部作品 <span aria-hidden="true">↓</span></a></div><p className="hero-footnote">PRODUCT DESIGN <span>·</span> CMF <span>·</span> INTERACTION</p></div>
      <HeroShowcase />
    </div><div className="hero-baseline shell"><span>SELECTED WORKS · 2025—2026</span><a href="#works">探索作品 <span aria-hidden="true">↓</span></a></div></section>

    <section id="works" tabIndex={-1} className="works-section shell section-space"><div className="section-intro"><div><p className="eyebrow">01 / SELECTED WORKS</p><h2>由文化出发，<br />向生活抵达。</h2></div><p>从一件桌面器物，到一个日常动作。<br />每个作品，都在寻找形式与使用的连接。</p></div>
      <nav className="project-index" aria-label="精选作品目录">{portfolio.projects.map(p => <a key={p.slug} href={withBasePath(`/projects/${p.slug}/`)}><span className="index-number">{p.number} / {p.year}</span><strong>{p.title}</strong><Arrow diagonal /><small>{p.kind}</small></a>)}</nav>
      <article id="walltime" tabIndex={-1} className="featured-work"><div className="featured-copy"><p className="eyebrow">01 / WALLTIME</p><h3>壁时</h3><p className="work-statement">让时间从提醒，<br />变成陪伴。</p><p>{clock.description}</p><div className="work-tags"><span>东方时间观</span><span>CMF</span><span>低打扰交互</span></div><a className="button button-outline" href={withBasePath('/projects/walltime/')}>阅读完整案例 <Arrow /></a></div><a className="featured-image" href={withBasePath('/projects/walltime/')} aria-label="阅读壁时完整案例"><img src={withBasePath('/media/walltime-scene.jpg')} alt="壁时在东方桌面空间中的概念效果" width={800} height={451} loading="lazy" /><span className="image-note">时间、自然与光的秩序</span></a></article>
      <div className="project-grid">{portfolio.projects.slice(1).map(p=><article className={`project-card project-${p.slug}`} key={p.slug}><a className="project-cover" href={withBasePath(`/projects/${p.slug}/`)} aria-label={`阅读${p.title}案例`}><img src={withBasePath(p.cover.src)} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} loading="lazy" /><span className="cover-index">{p.number}</span><span className="cover-arrow"><Arrow diagonal /></span></a><div className="project-meta"><span>{p.english}</span><span>{p.year}</span></div><h3><a href={withBasePath(`/projects/${p.slug}/`)}>{p.title}</a></h3><p>{p.summary}</p><small>{p.kind}</small></article>)}</div>
    </section>

    <section id="more-works" className="archive-section section-space"><div className="shell"><div className="section-intro"><div><p className="eyebrow">02 / FORM EXPLORATIONS</p><h2>在细节里，<br />练习设计的分寸。</h2></div><p>消费电子与生活产品的造型、<br />建模和材质表达实践。</p></div><div className="archive-grid">{portfolio.archive.map((p,i)=><article key={p.title}><a className="archive-image" href={withBasePath(p.originalSrc)} target="_blank" rel="noopener noreferrer" aria-label={`查看${p.title}原图`}><img src={withBasePath(p.src)} alt={`${p.title}建模渲染作品`} width={p.width} height={p.height} loading="lazy" /><span className="archive-number">0{i+5}</span><span className="cover-arrow"><Arrow diagonal /></span></a><div className="archive-caption"><h3>{p.title}</h3><span>{p.kind}</span></div></article>)}</div></div></section>

    <section id="about" tabIndex={-1} className="about-section shell section-space"><div><p className="eyebrow">03 / ABOUT THE DESIGNER</p><h2>既关注器物，<br />也关心人与它的关系。</h2><p className="about-signature">曹佳航 <span>CAO JIAHANG</span></p></div><div className="about-copy"><p>我把设计看作一种连接：让文化成为结构的起点，让材料服务于体验，让复杂的功能以清楚的方式被理解。</p><p>作品涉及智能产品、消费电子与品牌包装。通过 Rhino 建模、KeyShot 渲染与 CMF 推敲，持续探索从概念到视觉表达的完整过程。</p><div className="capability-list"><span>产品造型</span><span>三维建模</span><span>CMF 设计</span><span>交互叙事</span></div><a className="text-link" href={withBasePath(portfolio.resume)} target="_blank" rel="noopener noreferrer">了解我的经历 <Arrow diagonal /></a></div></section>
  </main>;
}
