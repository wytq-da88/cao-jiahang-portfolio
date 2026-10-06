import './globals.css';
import 'lenis/dist/lenis.css';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { absoluteUrl } from '../lib/site-path.js';
import localFont from 'next/font/local';
import { MotionProvider } from '../components/MotionProvider.jsx';
const headingFont=localFont({src:'../public/fonts/noto-serif-sc-500.woff2',weight:'500',display:'swap',variable:'--portfolio-serif',adjustFontFallback:false});
export const metadata = {
  metadataBase: new URL('https://wytq-da88.github.io'),
  title: {default:'曹佳航 · 东方器物研究室',template:'%s · 曹佳航作品集'},
  description:'曹佳航的工业设计作品集。以壁时为主角，探索东方文化、产品形态、CMF 与低打扰交互。',
  alternates: {canonical:absoluteUrl('/')},
  openGraph: {title:'曹佳航 · 东方器物研究室',description:'从东方时间观，设计当代日常。',locale:'zh_CN',type:'website',url:absoluteUrl('/'),images:[{url:absoluteUrl('/media/walltime-scene.jpg'),width:800,height:451,alt:'壁时桌面时间伙伴'}]},
  icons: {icon:absoluteUrl('/icon.svg')}
};
export const viewport = { width:'device-width', initialScale:1, themeColor:'#101210' };
export default function RootLayout({children}) {
  return <html lang="zh-CN" className={headingFont.variable}><body id="top" tabIndex={-1}><a className="skip-link" href="#main-content">跳到主要内容</a><MotionProvider><SiteHeader />{children}<SiteFooter /></MotionProvider></body></html>;
}
