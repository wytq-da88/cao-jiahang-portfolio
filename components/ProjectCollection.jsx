import { portfolio } from '../data/portfolio.js';
import { withBasePath } from '../lib/site-path.js';
import Arrow from './Arrow.jsx';
import './project-collection.css';

const featuredCover = {
  src: '/media/generated/walltime-cinematic.webp',
  alt: '壁时置于深色空间中的光影概念场景',
  width: 1672,
  height: 941
};

export default function ProjectCollection() {
  return (
    <section id="works" tabIndex={-1} className="work-collection" aria-labelledby="collection-heading">
      <div className="shell work-collection__shell">
        <header className="work-collection__header">
          <div className="work-collection__topline">
            <span>SELECTED PROJECTS</span>
            <span>2025 — 2026</span>
          </div>
          <h2 id="collection-heading">
            <span className="work-collection__headline">SELECTED<span className="work-collection__asterisk" aria-hidden="true">✳</span></span>
            <span className="work-collection__chinese">精选作品<span className="work-collection__count">（04）</span></span>
          </h2>
          <p className="work-collection__intro">从一个想法，到一种可感知的体验。<br />关于产品、材料，以及日常的四次探索。</p>
        </header>

        <div className="work-collection__projects">
          {portfolio.projects.map((project, index) => {
            const featured = index === 0;
            const cover = featured ? featuredCover : project.cover;
            return (
              <article id={featured ? 'walltime' : undefined} tabIndex={featured ? -1 : undefined} className={`collection-project collection-project--${project.slug}${featured ? ' collection-project--featured' : ''}`} key={project.slug}>
                <a className="collection-project__link" href={withBasePath(`/projects/${project.slug}/`)} aria-labelledby={`collection-${project.slug}-title`}>
                  <div className="collection-project__copy">
                    <div className="collection-project__meta">
                      <span className="collection-project__number">/{project.number}</span>
                      <span>{project.kind}</span>
                      <span className="collection-project__year">{project.year}</span>
                    </div>
                    <h3 id={`collection-${project.slug}-title`}>
                      <span className="collection-project__english">{project.english}</span>
                      <span className="collection-project__title">{project.title}</span>
                    </h3>
                    <p className="collection-project__summary">{project.summary}</p>
                    <span className="collection-project__cta">探索项目<span className="collection-project__arrow"><Arrow diagonal /></span></span>
                  </div>
                  <div className="collection-project__visual">
                    <img src={withBasePath(cover.src)} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" />
                    {featured && <span className="collection-project__image-note"><span>WALLTIME / LIGHT & TIME</span><span>AI 场景演绎</span></span>}
                    <span className="collection-project__visual-arrow" aria-hidden="true"><Arrow diagonal /></span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
        <div className="work-collection__end" aria-hidden="true"><span>THOUGHTFULLY DESIGNED.</span><span>KEEP EXPLORING ↓</span></div>
      </div>
    </section>
  );
}
