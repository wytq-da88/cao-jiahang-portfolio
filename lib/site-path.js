export function withBasePath(path, basePath = process.env.NEXT_PUBLIC_BASE_PATH || '') {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = basePath.replace(/\/+$/, '');
  if (!base || path === base || path.startsWith(`${base}/`) || path.startsWith(`${base}#`)) return path;
  return `${base}${path}`;
}
export const siteOrigin = 'https://wytq-da88.github.io';
export const absoluteUrl = (path) => `${siteOrigin}${withBasePath(path)}`;
