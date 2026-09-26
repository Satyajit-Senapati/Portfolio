import fs from 'node:fs';
import path from 'node:path';

const repository = process.env.GITHUB_REPOSITORY || process.argv[2];
const explicitUrl = process.env.SITE_URL?.trim();

if (!explicitUrl && !repository) {
  throw new Error('Set SITE_URL or GITHUB_REPOSITORY before preparing the Pages build.');
}

const [owner, repo] = repository?.split('/') ?? [];
if (!explicitUrl && (!owner || !repo)) {
  throw new Error('GITHUB_REPOSITORY must have the form owner/repository.');
}

const isUserSite = repo?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
const siteUrl = new URL(explicitUrl || `https://${owner}.github.io/${isUserSite ? '' : `${repo}/`}`);
if (siteUrl.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS.');
if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/';

const indexPath = path.join('dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const canonical = siteUrl.href;
const image = new URL('og.png', siteUrl).href;

html = html
  .replace('<meta property="og:type"', `<link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta property="og:type"`)
  .replace('<meta property="og:image" content="./og.png" />', `<meta property="og:image" content="${image}" />`)
  .replace('<meta name="twitter:image" content="./og.png" />', `<meta name="twitter:image" content="${image}" />`);

fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join('dist', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>\n`);
fs.writeFileSync(path.join('dist', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`);

console.log(`Prepared GitHub Pages metadata for ${canonical}`);
