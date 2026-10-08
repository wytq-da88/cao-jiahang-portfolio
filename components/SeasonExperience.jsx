'use client';

import { useRef, useState } from 'react';
import { seasonScenes } from '../data/season-scenes.js';
import { withBasePath } from '../lib/site-path.js';
import { useReadingMotion } from './MotionProvider.jsx';
import './season-experience.css';

export default function SeasonExperience() {
  const { reduced } = useReadingMotion();
  const sequence = useRef(0);
  const activeRequest = useRef(null);
  const seasonButtons = useRef([]);
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState({ index: 0, previous: null, revision: 0 });
  const [request, setRequest] = useState(null);
  const [failed, setFailed] = useState(false);
  const [displayUnavailable, setDisplayUnavailable] = useState(false);
  const scene = seasonScenes[displayed.index];
  const target = seasonScenes[selected];

  function selectSeason(index) {
    if (!Number.isInteger(index) || index < 0 || index >= seasonScenes.length) return;
    setSelected(index);
    setFailed(false);
    if (index === displayed.index && !displayUnavailable) {
      activeRequest.current = null;
      setRequest(null);
      return;
    }
    const next = { index, id: ++sequence.current };
    activeRequest.current = next.id;
    setRequest(next);
  }

  function finishRequest(next, success) {
    // Ignore responses for choices that were superseded while their image loaded.
    if (activeRequest.current !== next.id) return;
    activeRequest.current = null;
    setRequest(null);
    setFailed(!success);
    if (success) {
      setDisplayed(previous => ({ index: next.index, previous: displayUnavailable ? null : previous.index, revision: next.id }));
      setDisplayUnavailable(false);
    }
  }

  function retrySeason() {
    // The retry action disappears during loading; keep focus on a stable control.
    seasonButtons.current[selected]?.focus();
    selectSeason(selected);
  }

  const status = failed
    ? displayUnavailable
      ? `${target.label}季场景未能载入。请重试，或选择其他季节。`
      : `${target.label}季场景未能载入，仍保留${scene.label}季画面。请重试。`
    : request
      ? `${target.label}季场景正在载入…`
      : `${scene.label}季场景 · ${scene.note}`;

  return <section
    id="seasons"
    tabIndex={-1}
    className="season-experience"
    aria-labelledby="season-heading"
    data-season={scene.id}
    data-reduced-motion={reduced}
    style={{ '--season-accent': scene.accent, '--season-progress': `${selected / 3 * 100}%` }}
  >
    <div className="season-stage" aria-busy={Boolean(request)}>
      {displayed.previous !== null && !reduced && <img
        className="season-art season-art-previous"
        src={withBasePath(seasonScenes[displayed.previous].src)}
        alt=""
        aria-hidden="true"
        width="1672"
        height="941"
      />}
      <img
        key={`${scene.id}-${displayed.revision}`}
        className={`season-art season-art-current${displayed.revision ? ' season-art-enter' : ''}`}
        src={withBasePath(scene.src)}
        alt={scene.alt}
        width="1672"
        height="941"
        loading={displayed.revision ? 'eager' : 'lazy'}
        decoding="async"
        onError={event => {
          if (!event.currentTarget.isConnected) return;
          // Remember this failure even while another season is loading, so
          // returning to the current season retries its unavailable image.
          setDisplayUnavailable(true);
          if (activeRequest.current !== null) return;
          setSelected(displayed.index);
          setFailed(true);
        }}
      />
      {request && <img
        key={request.id}
        data-season-request={request.id}
        className="season-preload"
        src={withBasePath(seasonScenes[request.index].src)}
        alt=""
        aria-hidden="true"
        onLoad={() => finishRequest(request, true)}
        onError={() => finishRequest(request, false)}
      />}
      <div className="season-shade" aria-hidden="true" />
    </div>

    <div className="season-topline">
      <span><i aria-hidden="true" /> WALLTIME / SEASON STUDIES</span>
      <span className="season-ai-label">AI 场景演绎</span>
    </div>
    <div className="season-intro">
      <p className="season-overline">一件器物，四种时间的气息。</p>
      <h2 id="season-heading">让时间，<br />流经四季。</h2>
    </div>
    <div key={scene.id} className="season-caption">
      <p className="season-scene-index"><span>0{displayed.index + 1}</span> / {scene.english}</p>
      <h3>{scene.title}</h3>
      <p className="season-scene-note">{scene.note}</p>
    </div>
    <div className="season-coordinate" aria-hidden="true"><span>四季之间</span><i /><span>WALLTIME</span></div>

    <div className="season-interaction">
      <div className="season-selector" role="group" aria-label="选择季节">
        {seasonScenes.map((item, index) => <button
          key={item.id}
          ref={node => { seasonButtons.current[index] = node; }}
          type="button"
          aria-label={item.label}
          aria-pressed={selected === index}
          className={selected === index && Boolean(request) ? 'is-pending' : undefined}
          onClick={() => selectSeason(index)}
        >
          <span className="season-button-number" aria-hidden="true">0{index + 1}</span>
          <span className="season-button-label">{item.label}</span>
          <span className="season-button-english" aria-hidden="true">{item.english}</span>
          <span className="season-button-dot" aria-hidden="true" />
        </button>)}
      </div>
      <div className="season-timeline">
        <div className="season-timeline-label"><label htmlFor="season-progress">滑动，换一个季节</label><span aria-hidden="true">0{selected + 1}<i> / 04</i></span></div>
        <input
          id="season-progress"
          type="range"
          min="0"
          max="3"
          step="1"
          value={selected}
          aria-label="季节进度"
          aria-valuetext={target.label}
          onChange={event => selectSeason(Number(event.target.value))}
        />
        <div className="season-timeline-marks" aria-hidden="true"><span>春</span><span>夏</span><span>秋</span><span>冬</span></div>
      </div>
    </div>

    <div className="season-bottomline">
      <p role="status" aria-live="polite" aria-atomic="true">{status}</p>
      {failed && <button className="season-retry" type="button" onClick={retrySeason} aria-label={`重试${target.label}季场景`}>重新载入 <span aria-hidden="true">↗</span></button>}
      <span className="season-disclosure">概念视觉 · 产品与环境的想象</span>
    </div>
  </section>;
}
