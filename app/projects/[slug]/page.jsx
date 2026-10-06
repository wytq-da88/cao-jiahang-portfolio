import { notFound } from 'next/navigation';
import { portfolio } from '../../../data/portfolio.js';
import { absoluteUrl } from '../../../lib/site-path.js';
import CasePage from '../../../components/CasePage.jsx';
export const dynamicParams=false;
export function generateStaticParams(){return portfolio.projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}){
  const {slug}=await params;
  const project=portfolio.projects.find(p=>p.slug===slug);
  if(!project)return {title:'页面未找到',robots:{index:false}};
  return {title:project.title,description:project.description,alternates:{canonical:absoluteUrl(`/projects/${slug}/`)},openGraph:{title:`${project.title} · 曹佳航`,description:project.description,url:absoluteUrl(`/projects/${slug}/`),images:[{url:absoluteUrl(project.cover.src),width:project.cover.width,height:project.cover.height,alt:project.cover.alt}]}};
}
export default async function ProjectPage({params}){
  const {slug}=await params;
  const project=portfolio.projects.find(p=>p.slug===slug);
  if(!project)notFound();
  return <CasePage project={project}/>;
}
