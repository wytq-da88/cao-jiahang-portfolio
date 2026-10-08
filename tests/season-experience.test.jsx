import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import SeasonExperience from '../components/SeasonExperience.jsx';

afterEach(() => vi.unstubAllEnvs());

function requestedImage(container) {
  return container.querySelector('img[data-season-request]');
}

// A blank client-only shell would leave this section unusable before hydration.
it('server-renders the first real scene and honors a deployment base path', () => {
  vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/portfolio');
  const html = renderToString(<SeasonExperience />);
  expect(html).toContain('src="/portfolio/media/generated/walltime-spring.webp"');
  expect(html).toContain('壁时 · 春季 AI 场景');
  expect(html).toContain('AI 场景演绎');
});

// Catches replacing the current artwork or its caption before the next load succeeds.
it('retains the displayed scene while the requested season is loading', () => {
  const { container } = render(<SeasonExperience />);
  fireEvent.click(screen.getByRole('button', { name: '夏' }));
  expect(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' })).toBeVisible();
  expect(screen.getByRole('heading', { name: '春生。' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent(/夏.*载入/);
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 夏季 AI 场景' })).toBeVisible();
  expect(screen.getByRole('heading', { name: '夏长。' })).toBeVisible();
  expect(screen.queryByRole('heading', { name: '春生。' })).not.toBeInTheDocument();
});

// Catches an error blanking the stage or leaving a failed choice impossible to retry.
it('keeps the previous scene after a failed load and lets the visitor retry', () => {
  const { container } = render(<SeasonExperience />);
  fireEvent.click(screen.getByRole('button', { name: '冬' }));
  fireEvent.error(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent(/未能载入/);
  fireEvent.click(screen.getByRole('button', { name: '重试冬季场景' }));
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 冬季 AI 场景' })).toBeVisible();
  expect(screen.getByRole('heading', { name: '冬藏。' })).toBeVisible();
  expect(screen.queryByRole('button', { name: /重试/ })).not.toBeInTheDocument();
});

// Catches a failed first asset being reported as ready with no way to reload it.
it('offers recovery when the first scene itself fails to load', () => {
  const { container } = render(<SeasonExperience />);
  fireEvent.error(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' }));
  expect(screen.getByRole('status')).toHaveTextContent(/未能载入/);
  fireEvent.click(screen.getByRole('button', { name: '重试春季场景' }));
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' })).toBeVisible();
  expect(screen.queryByRole('button', { name: /重试/ })).not.toBeInTheDocument();
});

// A pending new scene must not erase knowledge that the currently displayed image failed.
it('reloads a failed current scene when a pending season change is cancelled', () => {
  const { container } = render(<SeasonExperience />);
  fireEvent.click(screen.getByRole('button', { name: '夏' }));
  const summerRequest = requestedImage(container);
  fireEvent.error(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' }));
  expect(screen.getByRole('button', { name: '夏' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('status')).toHaveTextContent(/夏.*正在载入/);
  fireEvent.click(screen.getByRole('button', { name: '春' }));
  expect(requestedImage(container)).toHaveAttribute('src', '/media/generated/walltime-spring.webp');
  fireEvent.load(summerRequest);
  expect(screen.getByRole('heading', { name: '春生。' })).toBeVisible();
  fireEvent.error(requestedImage(container));
  expect(screen.getByRole('button', { name: '重试春季场景' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '重试春季场景' }));
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' })).toBeVisible();
  expect(screen.queryByRole('button', { name: /重试/ })).not.toBeInTheDocument();
});

// The temporary retry control disappears, so focus must move to a stable control.
it('returns retry focus to the selected season instead of losing it to the page', async () => {
  const user = userEvent.setup();
  const { container } = render(<SeasonExperience />);
  fireEvent.click(screen.getByRole('button', { name: '冬' }));
  fireEvent.error(requestedImage(container));
  await user.click(screen.getByRole('button', { name: '重试冬季场景' }));
  expect(screen.getByRole('button', { name: '冬' })).toHaveFocus();
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('button', { name: '冬' })).toHaveFocus();
});

// Catches an older network response committing after the visitor has moved on.
it('ignores a superseded load when seasons are selected rapidly', () => {
  const { container } = render(<SeasonExperience />);
  fireEvent.click(screen.getByRole('button', { name: '夏' }));
  const summerRequest = requestedImage(container);
  fireEvent.click(screen.getByRole('button', { name: '冬' }));
  fireEvent.load(summerRequest);
  expect(screen.getByRole('heading', { name: '春生。' })).toBeVisible();
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 冬季 AI 场景' })).toBeVisible();
  expect(screen.getByRole('heading', { name: '冬藏。' })).toBeVisible();
  expect(screen.getByRole('button', { name: '冬' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('slider', { name: '季节进度' })).toHaveValue('3');
});

// Both controls must request the same scene, including a return to a loaded season.
it('keeps the range and season buttons synchronized in both directions', () => {
  const { container } = render(<SeasonExperience />);
  const range = screen.getByRole('slider', { name: '季节进度' });
  fireEvent.change(range, { target: { value: '2' } });
  expect(screen.getByRole('button', { name: '秋' })).toHaveAttribute('aria-pressed', 'true');
  expect(range).toHaveAttribute('aria-valuetext', '秋');
  fireEvent.load(requestedImage(container));
  expect(screen.getByRole('img', { name: '壁时 · 秋季 AI 场景' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '春' }));
  if (requestedImage(container)) fireEvent.load(requestedImage(container));
  expect(range).toHaveValue('0');
  expect(screen.getByRole('button', { name: '春' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('img', { name: '壁时 · 春季 AI 场景' })).toBeVisible();
});

// Catches pointer-only controls or focus loss when a scene finishes loading.
it('allows keyboard selection without moving focus off the chosen button', async () => {
  const user = userEvent.setup();
  const { container } = render(<SeasonExperience />);
  await user.tab();
  await user.tab();
  const summer = screen.getByRole('button', { name: '夏' });
  expect(summer).toHaveFocus();
  await user.keyboard('{Enter}');
  fireEvent.load(requestedImage(container));
  expect(summer).toHaveFocus();
  expect(summer).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('img', { name: '壁时 · 夏季 AI 场景' })).toBeVisible();
  await user.tab();
  await user.tab();
  await user.tab();
  expect(screen.getByRole('slider', { name: '季节进度' })).toHaveFocus();
});
