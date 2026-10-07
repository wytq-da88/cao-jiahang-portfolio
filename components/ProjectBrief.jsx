import { projectBriefs } from '../data/project-briefs.js';
import './project-brief.css';

const briefColumns = [
  ['question', '设计问题'],
  ['choice', '核心选择'],
  ['output', '完成内容']
];

export default function ProjectBrief({ slug }) {
  const brief = projectBriefs[slug];
  if (!brief) return null;

  const headingId = `${slug}-brief-heading`;

  return (
    <section id="project-brief" tabIndex={-1} className="project-brief" aria-labelledby={headingId}>
      <div className="shell">
        <header className="project-brief__header">
          <p className="project-brief__eyebrow">PROJECT BRIEF</p>
          <h2 id={headingId}>项目简述</h2>
        </header>
        <div className="project-brief__columns">
          {briefColumns.map(([key, label], index) => (
            <div className="project-brief__column" key={key}>
              <div className="project-brief__label">
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{label}</h3>
              </div>
              <p>{brief[key]}</p>
            </div>
          ))}
        </div>
        {brief.note && <p className="project-brief__note">{brief.note}</p>}
      </div>
    </section>
  );
}
