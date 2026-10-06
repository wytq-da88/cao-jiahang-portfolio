import { it,expect } from 'vitest';
import { render,screen,fireEvent,within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SiteHeader from '../components/SiteHeader.jsx';
it('menu expansion moves focus into links; Escape returns it to the trigger',async()=>{
  const user=userEvent.setup();render(<SiteHeader/>);const trigger=screen.getByRole('button',{name:'打开菜单'});
  expect(trigger).toHaveAttribute('aria-expanded','false');await user.click(trigger);
  expect(screen.getByRole('button',{name:'关闭菜单'})).toHaveAttribute('aria-expanded','true');expect(within(screen.getByRole('navigation',{name:'主导航'})).getByRole('link',{name:'作品',exact:true})).toHaveFocus();
  fireEvent.keyDown(document,{key:'Escape'});expect(screen.getByRole('button',{name:'打开菜单'})).toHaveAttribute('aria-expanded','false');expect(trigger).toHaveFocus();
});
it('choosing an entry closes the menu',async()=>{
  const user=userEvent.setup();render(<SiteHeader/>);await user.click(screen.getByRole('button',{name:'打开菜单'}));await user.click(within(screen.getByRole('navigation',{name:'主导航'})).getByRole('link',{name:/联系/}));expect(screen.getByRole('button',{name:'打开菜单'})).toHaveAttribute('aria-expanded','false');
});
