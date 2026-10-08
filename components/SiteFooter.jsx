import { portfolio } from '../data/portfolio.js';
import { withBasePath } from '../lib/site-path.js';
import Arrow from './Arrow.jsx';
import { MotionPreference } from './MotionProvider.jsx';
export default function SiteFooter() {
  return <footer id="contact" tabIndex={-1} className="site-footer"><div className="shell">
    <div className="footer-top"><p className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</p><p className="availability">产品设计 / CMF / 交互探索</p></div>
    <h2>下一件好作品，<br />从一次交流开始。</h2>
    <a className="contact-mail" href={`mailto:${portfolio.email}`}>{portfolio.email}<Arrow diagonal /></a>
    <div className="footer-links"><a className="button button-outline" href={withBasePath(portfolio.resume)} target="_blank" rel="noopener noreferrer">查看简历 <Arrow diagonal /></a><a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a><a href="https://wytq-da88.github.io/" target="_blank" rel="noopener noreferrer">原作品集 <span aria-hidden="true">↗</span></a></div>
    <div className="footer-bottom"><span>© 2026 曹佳航</span><span>让想象，有形发生。</span><MotionPreference/><a href="#top">回到顶部 ↑</a></div>
  </div></footer>;
}
