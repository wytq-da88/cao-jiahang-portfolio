import { it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroShowcase from '../components/HeroShowcase.jsx';

// Catches losing the current image while the next view is still downloading.
it('keeps the current view until the requested image has loaded', () => {
  const { container } = render(<HeroShowcase />);
  expect(screen.getByRole('img', { name: '壁时正面概念渲染' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '查看壁时细节' }));
  expect(screen.getByRole('img', { name: '壁时正面概念渲染' })).toBeVisible();
  fireEvent.load(container.querySelector('img[aria-hidden="true"]'));
  expect(screen.getByRole('img', { name: '壁时中央显示与外环细节' })).toBeVisible();
  expect(screen.getByRole('button', { name: '查看壁时细节' })).toHaveAttribute('aria-pressed', 'true');
});

// Catches a broken asset blanking the hero or preventing recovery to another view.
it('retains a usable image after an error and permits another selection', () => {
  const { container } = render(<HeroShowcase />);
  fireEvent.click(screen.getByRole('button', { name: '查看壁时场景' }));
  fireEvent.error(container.querySelector('img[aria-hidden="true"]'));
  expect(screen.getByRole('img', { name: '壁时正面概念渲染' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent(/未能加载/);
  fireEvent.click(screen.getByRole('button', { name: '查看壁时细节' }));
  fireEvent.load(container.querySelector('img[aria-hidden="true"]'));
  expect(screen.getByRole('img', { name: '壁时中央显示与外环细节' })).toBeVisible();
});

// Catches pointer-only controls: keyboard users must reach and select all views.
it('allows keyboard selection without moving focus away from the control', async () => {
  const user = userEvent.setup();
  const { container } = render(<HeroShowcase />);
  await user.tab();
  await user.tab();
  expect(screen.getByRole('button', { name: '查看壁时细节' })).toHaveFocus();
  await user.keyboard('{Enter}');
  fireEvent.load(container.querySelector('img[aria-hidden="true"]'));
  expect(screen.getByRole('button', { name: '查看壁时细节' })).toHaveFocus();
  expect(screen.getByRole('img', { name: '壁时中央显示与外环细节' })).toBeVisible();
});
