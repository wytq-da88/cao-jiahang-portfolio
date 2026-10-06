import { withBasePath } from '../lib/site-path.js';
export default function NotFound(){return <main id="main-content" className="not-found shell"><p className="eyebrow">404 / LOST IN THE GALLERY</p><h1>这件作品还不在这里。</h1><p>回到作品目录，继续探索。</p><a className="button button-ink" href={withBasePath('/#works')}>返回全部作品 →</a></main>;}
