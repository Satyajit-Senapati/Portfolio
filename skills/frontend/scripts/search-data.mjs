import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleRoot, inside } from './lib.mjs';

const domains = {
  style: 'styles.csv', color: 'colors.csv', typography: 'typography.csv',
  ux: 'ux-guidelines.csv', chart: 'charts.csv', landing: 'landing.csv',
  product: 'products.csv', motion: 'motion.csv', react: 'react-performance.csv',
  icons: 'icons.csv', 'google-fonts': 'google-fonts.csv',
};

export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && (c === ',' || c === '\n' || c === '\r')) {
      row.push(field); field = '';
      if (c !== ',') {
        if (row.some(value => value.length)) rows.push(row);
        row = [];
        if (c === '\r' && text[i + 1] === '\n') i++;
      }
    } else field += c;
  }
  if (quoted) throw new Error('Unclosed CSV quote');
  if (field || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map(header => header.replace(/^\uFEFF/, ''));
  return rows.map((values, index) => {
    if (values.length !== headers.length) throw new Error(`CSV field count mismatch at record ${index + 2}`);
    return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
  });
}

export function rankRows(rows, query, limit = 3) {
  const tokens = [...new Set(query.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])];
  if (!tokens.length) throw new Error('Supply a non-empty search query');
  return rows.map((record, index) => {
    const haystack = Object.values(record).join(' ').toLocaleLowerCase();
    return { record, index, score: tokens.reduce((score, token) => score + Number(haystack.includes(token)), 0) };
  }).filter(item => item.score > 0).sort((a,b) => b.score - a.score || a.index - b.index).slice(0, limit)
    .map(({ record, score }) => ({ score, record }));
}

export async function search(domain, query) {
  let file = domains[domain];
  if (/^stack:[a-z0-9-]+$/.test(domain)) file = `stacks/${domain.slice(6)}.csv`;
  if (!file) throw new Error(`Unknown domain. Use ${Object.keys(domains).join(', ')} or stack:react (another bundled stack also works)`);
  const data = inside(bundleRoot, `ux/ui-ux-pro-max/references/upstream/data/${file}`);
  return { source: file, method: 'simple-token-ranking', results: rankRows(parseCsv(await readFile(data, 'utf8')), query) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [domain, ...terms] = process.argv.slice(2);
    if (domain === '--help') console.log('Usage: node search-data.mjs DOMAIN "focused query"\nOffline CSV fallback; domains include ux, typography, color, style, chart, and stack:react.');
    else console.log(JSON.stringify(await search(domain, terms.join(' ')), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
