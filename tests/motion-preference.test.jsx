import { it,expect,vi } from 'vitest';
import { render,screen,fireEvent,act } from '@testing-library/react';
import { MotionProvider,MotionPreference } from '../components/MotionProvider.jsx';
function mediaEnvironment(){
  const queries=new Map();vi.stubGlobal('matchMedia',query=>{
    if(!queries.has(query)){const listeners=new Set();queries.set(query,{matches:false,media:query,addEventListener:(_,fn)=>listeners.add(fn),removeEventListener:(_,fn)=>listeners.delete(fn),change(value){this.matches=value;for(const fn of listeners)fn({matches:value});}});}return queries.get(query);
  });return queries;
}
it('an OS preference change updates the reading mode without hiding children',()=>{
  const queries=mediaEnvironment();const view=render(<MotionProvider><p>案例正文</p><MotionPreference/></MotionProvider>);
  act(()=>queries.get('(prefers-reduced-motion: reduce)').change(true));expect(document.documentElement).toHaveAttribute('data-reduced-motion','true');expect(screen.getByText('案例正文')).toBeVisible();expect(screen.getByRole('checkbox',{name:'减少动态'})).toBeChecked();view.unmount();expect(document.documentElement).not.toHaveAttribute('data-reduced-motion');vi.unstubAllGlobals();
});
it('the visitor can switch to quiet reading immediately',()=>{
  mediaEnvironment();render(<MotionProvider><p>案例正文</p><MotionPreference/></MotionProvider>);fireEvent.click(screen.getByRole('checkbox',{name:'减少动态'}));expect(document.documentElement).toHaveAttribute('data-reduced-motion','true');expect(screen.getByText('案例正文')).toBeVisible();vi.unstubAllGlobals();
});
