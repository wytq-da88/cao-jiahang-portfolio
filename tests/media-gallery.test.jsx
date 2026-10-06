import { describe,it,expect } from 'vitest';
import { render,screen,within,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MediaGallery from '../components/MediaGallery.jsx';
const items=[{src:'/media/a.jpg',originalSrc:'/media/originals/a.png',alt:'首图',caption:'正面概念',width:1400,height:1050},{src:'/media/b.jpg',originalSrc:'/media/originals/b.png',alt:'第二张',caption:'细节概念',width:1400,height:1050}];
describe('enhanced gallery retains native image access',()=>{
  it('opens the chosen image, wraps next/previous, and accepts arrow keys',async()=>{
    const user=userEvent.setup();render(<MediaGallery items={items}/>);
    await user.click(screen.getByRole('link',{name:'查看第二张原图'}));
    const dialog=screen.getByRole('dialog',{name:'作品图片画廊'});
    expect(within(dialog).getByRole('img',{name:'第二张，原图'})).toHaveAttribute('src','/media/originals/b.png');
    await user.click(within(dialog).getByRole('button',{name:'下一张'}));
    expect(within(dialog).getByRole('img',{name:'首图，原图'})).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button',{name:'上一张'}));
    expect(within(dialog).getByRole('img',{name:'第二张，原图'})).toBeInTheDocument();
    fireEvent.keyDown(dialog,{key:'ArrowLeft'});
    expect(within(dialog).getByRole('img',{name:'首图，原图'})).toBeInTheDocument();
  });
  it('Escape closes and restores the initiating link focus',async()=>{
    const user=userEvent.setup();render(<MediaGallery items={items}/>);
    const opener=screen.getByRole('link',{name:'查看首图原图'});
    await user.click(opener);
    const dialog=screen.getByRole('dialog',{name:'作品图片画廊'});
    expect(within(dialog).getByRole('button',{name:'关闭画廊'})).toHaveFocus();
    fireEvent.keyDown(dialog,{key:'Escape'});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();expect(opener).toHaveFocus();
  });
  it('modified clicks retain the original URL and do not open a modal',()=>{
    render(<MediaGallery items={items}/>);const link=screen.getByRole('link',{name:'查看首图原图'});
    expect(link).toHaveAttribute('href','/media/originals/a.png');fireEvent.click(link,{ctrlKey:true});expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('Tab and Shift+Tab keep keyboard focus within the open gallery',async()=>{
    const user=userEvent.setup();render(<MediaGallery items={items}/>);
    await user.click(screen.getByRole('link',{name:'查看首图原图'}));
    const dialog=screen.getByRole('dialog');
    const first=within(dialog).getByRole('button',{name:'关闭画廊'});
    const last=within(dialog).getByRole('link',{name:'在新页面查看原图 ↗'});
    last.focus();fireEvent.keyDown(last,{key:'Tab'});
    expect(first).toHaveFocus();
    fireEvent.keyDown(first,{key:'Tab',shiftKey:true});
    expect(last).toHaveFocus();
  });
  it('one-image galleries open without enabling non-existent neighbours',async()=>{
    const user=userEvent.setup();render(<MediaGallery items={[items[0]]}/>);await user.click(screen.getByRole('link',{name:'查看首图原图'}));
    const dialog=screen.getByRole('dialog');expect(within(dialog).getByRole('button',{name:'下一张'})).toBeDisabled();expect(within(dialog).getByRole('button',{name:'上一张'})).toBeDisabled();
  });
  it('an image failure preserves its caption and original access',()=>{
    render(<MediaGallery items={[items[0]]}/>);fireEvent.error(screen.getByRole('img',{name:'首图'}));
    expect(screen.getByText('图片暂时无法加载')).toBeInTheDocument();expect(screen.getByText('正面概念')).toBeInTheDocument();expect(screen.getByRole('link',{name:'查看首图原图'})).toHaveAttribute('href','/media/originals/a.png');
  });
  it('shows a preview while the original loads and resets feedback when switching',async()=>{
    const user=userEvent.setup();render(<MediaGallery items={items}/>);
    await user.click(screen.getByRole('link',{name:'查看首图原图'}));
    const dialog=screen.getByRole('dialog');
    expect(within(dialog).getByRole('status')).toHaveTextContent('正在加载原图');
    expect(dialog.querySelector('.lightbox-preview')).toHaveAttribute('src','/media/a.jpg');
    fireEvent.load(within(dialog).getByRole('img',{name:'首图，原图'}));
    expect(within(dialog).queryByRole('status')).not.toBeInTheDocument();
    await user.click(within(dialog).getByRole('button',{name:'下一张'}));
    expect(within(dialog).getByRole('status')).toHaveTextContent('正在加载原图');
    fireEvent.error(within(dialog).getByRole('img',{name:'第二张，原图'}));
    expect(within(dialog).getByText('图片暂时无法加载')).toBeInTheDocument();
    expect(within(dialog).getByRole('link',{name:'在新页面查看原图 ↗'})).toHaveAttribute('href','/media/originals/b.png');
  });
});
