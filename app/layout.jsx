import './globals.css';
import 'lenis/dist/lenis.css';
import './immersive-theme.css';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { absoluteUrl } from '../lib/site-path.js';
import localFont from 'next/font/local';
import { MotionProvider } from '../components/MotionProvider.jsx';
const headingFont=localFont({src:'../public/fonts/noto-serif-sc-500.woff2',weight:'500',display:'swap',variable:'--portfolio-serif',adjustFontFallback:false});
export const metadata = {
  metadataBase: new URL('https://wytq-da88.github.io'),
  title: {default:'曹佳航 · 工业设计与交互探索',template:'%s · 曹佳航作品集'},
  description:'曹佳航的工业设计作品集。探索产品形态、CMF 与交互体验，让想象有形发生。',
  alternates: {canonical:absoluteUrl('/')},
  openGraph: {title:'曹佳航 · 工业设计与交互探索',description:'让想象，有形发生。',locale:'zh_CN',type:'website',url:absoluteUrl('/'),images:[{url:absoluteUrl('/media/generated/walltime-cinematic.webp'),width:1672,height:941,alt:'壁时桌面时间伙伴 · AI 场景演绎'}]},
  icons: {icon:absoluteUrl('/icon.svg')}
};
export const viewport = { width:'device-width', initialScale:1, themeColor:'#080a0e' };
export default function RootLayout({children}) {
  return <html lang="zh-CN" className={headingFont.variable}><body id="top" tabIndex={-1}><a className="skip-link" href="#main-content">跳到主要内容</a><MotionProvider><SiteHeader />{children}<SiteFooter /></MotionProvider></body></html>;
}
