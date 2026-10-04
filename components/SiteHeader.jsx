import { withBasePath } from '../lib/site-path.js';
export default function SiteHeader() {
  return <header className="site-header"><div className="header-inner shell">
    <a className="identity" href={withBasePath('/')} aria-label="曹佳航 · 返回首页"><span className="identity-seal" aria-hidden="true">航</span><span>曹佳航<small>INDUSTRIAL DESIGN</small></span></a>
    <nav className="site-nav" aria-label="主导航"><a href={withBasePath('/#works')}>作品</a><a href={withBasePath('/#walltime')}>壁时</a><a href={withBasePath('/#about')}>关于</a><a href={withBasePath('/#contact')}>联系 <span aria-hidden="true">↗</span></a></nav>
  </div></header>;
}
