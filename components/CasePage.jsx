import { portfolio } from '../data/portfolio.js';
import { withBasePath } from '../lib/site-path.js';
import MediaGallery from './MediaGallery.jsx';
import ConceptVideo from './ConceptVideo.jsx';
import Arrow from './Arrow.jsx';
import CaseNav from './CaseNav.jsx';
import MotionStage from './MotionStage.jsx';
export default function CasePage({project}){
  const next=portfolio.projects[(portfolio.projects.indexOf(project)+1)%portfolio.projects.length];
  return <main id="main-content" tabIndex={-1} className={`case-page case-${project.slug}`}>
    <section className={`case-opening ${project.slug==='walltime'?'dark-stage':''}`}><div className="shell"><a className="case-back text-link" href={withBasePath('/#works')}>← 返回全部作品</a><div className="case-cover-grid"><div className="case-cover-copy"><p className="eyebrow">{project.number} / {project.english}</p><h1>{project.title}</h1><p className="case-claim">{project.summary}</p><p className="case-description">{project.description}</p><a className="text-link" href={`#${project.sections[0].id}`}>开始阅读 ↓</a></div><figure className="case-cover-image"><MotionStage><img src={withBasePath(project.cover.src)} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} fetchPriority="high"/></MotionStage><figcaption>{project.cover.caption}</figcaption></figure><dl className="case-facts"><div><dt>设计领域</dt><dd>{project.kind}</dd></div><div><dt>项目阶段</dt><dd>概念设计 / {project.year}</dd></div><div><dt>设计表达</dt><dd>造型 · 建模 · 视觉呈现</dd></div></dl></div></div></section>
    <CaseNav sections={project.sections.map(({id,label})=>({id,label}))}/>
    <article>{project.sections.map(s=><section id={s.id} key={s.id} tabIndex={-1} className={`case-section section-space ${s.tone==='dark'?'dark-stage':''}`}><div className="shell"><div className="case-section-heading"><div><p className="eyebrow">{s.eyebrow}</p><h2>{s.title}</h2></div><p>{s.text}</p></div>
      {s.quote&&<blockquote className="design-quote">{s.quote.split('\n').map((line,i)=><span key={i}>{line}</span>)}</blockquote>}
      {s.ideas&&<div className="idea-grid">{s.ideas.map((idea,i)=><div key={idea.title}><span className="idea-index">0{i+1}</span><div className={`idea-symbol symbol-${idea.symbol}`} aria-hidden="true"/><h3>{idea.title}</h3><p>{idea.text}</p></div>)}</div>}
      {s.steps&&<ol className="interaction-steps">{s.steps.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>}
      {s.media&&<MediaGallery items={s.media}/>}
      {s.swatches&&<div className="cmf-swatches">{s.swatches.map(swatch=><div key={swatch.name}><i style={{background:swatch.color}} aria-hidden="true"/><h3>{swatch.name}</h3><p>{swatch.detail}</p></div>)}</div>}
      {s.video&&<ConceptVideo {...s.video}/>}
    </div></section>)}</article>
    <section className="next-project shell"><p className="eyebrow">NEXT / 继续探索</p><a href={withBasePath(`/projects/${next.slug}/`)}><div><span>{next.number} / {next.english}</span><h2>{next.title}</h2></div><Arrow diagonal /></a><a className="text-link" href={withBasePath('/#works')}>返回全部作品 ↑</a></section>
  </main>;
}
