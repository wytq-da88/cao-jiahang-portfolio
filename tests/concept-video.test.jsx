import { it,expect } from 'vitest';
import { render,screen,fireEvent } from '@testing-library/react';
import ConceptVideo from '../components/ConceptVideo.jsx';
const props={src:'/media/demo.mp4',poster:{src:'/media/poster.jpg',alt:'概念封面',width:800,height:451},caption:'AI 辅助动态概念演示'};
it('does not load the video before a visitor chooses playback',()=>{
  const {container}=render(<ConceptVideo {...props}/>);expect(container.querySelector('video')).toBeNull();expect(screen.getByRole('img',{name:'概念封面'})).toBeInTheDocument();fireEvent.click(screen.getByRole('button',{name:'播放概念演示'}));expect(container.querySelector('video')).toHaveAttribute('src','/media/demo.mp4');
});
it('a failed video retains the poster and a direct source link',()=>{
  const {container}=render(<ConceptVideo {...props}/>);fireEvent.click(screen.getByRole('button',{name:'播放概念演示'}));fireEvent.error(container.querySelector('video'));expect(screen.getByRole('img',{name:'概念封面'})).toBeInTheDocument();expect(screen.getByText(/视频暂时无法播放/)).toBeInTheDocument();expect(screen.getByRole('link',{name:'打开视频原文件'})).toHaveAttribute('href','/media/demo.mp4');
});
