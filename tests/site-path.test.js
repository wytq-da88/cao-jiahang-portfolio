import { describe, it, expect } from 'vitest';
import { withBasePath } from '../lib/site-path.js';
describe('links remain usable at both root and GitHub Pages subpath', () => {
  it.each([
    ['/media/clock.jpg', '', '/media/clock.jpg'],
    ['/', '/cao-jiahang-portfolio', '/cao-jiahang-portfolio/'],
    ['/projects/walltime/', '/cao-jiahang-portfolio/', '/cao-jiahang-portfolio/projects/walltime/'],
    ['/cao-jiahang-portfolio/media/clock.jpg', '/cao-jiahang-portfolio', '/cao-jiahang-portfolio/media/clock.jpg'],
    ['/cao-jiahang-portfolio-other/', '/cao-jiahang-portfolio', '/cao-jiahang-portfolio/cao-jiahang-portfolio-other/'],
    ['mailto:3600376954@qq.com', '/cao-jiahang-portfolio', 'mailto:3600376954@qq.com'],
    ['tel:13333384178', '/cao-jiahang-portfolio', 'tel:13333384178'],
    ['https://example.com/photo.jpg', '/cao-jiahang-portfolio', 'https://example.com/photo.jpg'],
    ['http://example.com', '/cao-jiahang-portfolio', 'http://example.com'],
    ['#works', '/cao-jiahang-portfolio', '#works']
  ])('%s with %s → %s', (path, base, expected) => expect(withBasePath(path, base)).toBe(expected));
});
