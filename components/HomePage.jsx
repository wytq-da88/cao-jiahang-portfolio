import { portfolio } from '../data/portfolio.js';
import { withBasePath } from '../lib/site-path.js';
import Arrow from './Arrow.jsx';
import CinematicHero from './CinematicHero.jsx';
import SeasonExperience from './SeasonExperience.jsx';
import ProjectCollection from './ProjectCollection.jsx';
import './immersive-home.css';

export default function HomePage() {
  return <main id="main-content" tabIndex={-1} className="immersive-home">
    <CinematicHero />
    <section id="intro" tabIndex={-1} className="design-intro shell">
      <p className="eyebrow">A LITTLE ABOUT MY APPROACH</p>
      <div><h2>在真实与想象之间，<br /><span>寻找下一种日常。</span></h2><p>形态是开始，体验让它完整。<br />从桌面上的一束光，到手中的一次开合，<br />我用产品设计，探索人与物相遇的方式。</p><a className="text-link" href="#works">向下，看看我的探索 <Arrow diagonal /></a></div>
      <span className="intro-orbit" aria-hidden="true">✳</span>
    </section>
    <SeasonExperience />
    <ProjectCollection />

    <section id="more-works" className="archive-section section-space"><div className="shell"><div className="section-intro"><div><p className="eyebrow">02 / FORM EXPLORATIONS</p><h2>保持好奇。<br />继续动手。</h2></div><p>消费电子与生活产品的造型、<br />建模和材质表达实践。</p></div><div className="archive-grid">{portfolio.archive.map((p,i)=><article key={p.title}><a className="archive-image" href={withBasePath(p.originalSrc)} target="_blank" rel="noopener noreferrer" aria-label={`查看${p.title}原图`}><img src={withBasePath(p.src)} alt={`${p.title}建模渲染作品`} width={p.width} height={p.height} loading="lazy" /><span className="archive-number">0{i+5}</span><span className="cover-arrow"><Arrow diagonal /></span></a><div className="archive-caption"><h3>{p.title}</h3><span>{p.kind}</span></div></article>)}</div></div></section>

    <section id="about" tabIndex={-1} className="about-section shell section-space"><div><p className="eyebrow">03 / ABOUT THE DESIGNER</p><h2>认真对待想象，<br />也认真对待细节。</h2><p className="about-signature">曹佳航 <span>CAO JIAHANG</span></p></div><div className="about-copy"><p>我关注产品的形态，也关注触碰、使用和相处的感受。让材料服务于体验，让复杂的功能以清楚的方式被理解。</p><p>作品涉及智能产品、消费电子与品牌包装。通过 Rhino 建模、KeyShot 渲染与 CMF 推敲，持续探索从概念到视觉表达的完整过程。</p><div className="capability-list"><span>产品造型</span><span>三维建模</span><span>CMF 设计</span><span>交互叙事</span></div><a className="text-link" href={withBasePath(portfolio.resume)} target="_blank" rel="noopener noreferrer">了解我的经历 <Arrow diagonal /></a></div></section>
  </main>;
}
