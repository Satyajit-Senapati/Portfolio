import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { bundleRoot, catalog, inside, walk } from './lib.mjs';

export async function validate(root = bundleRoot) {
  const entries = await catalog(root);
  const files = await walk(root);
  const registered = new Set(entries.map(entry => entry.file));
  for (const file of files.filter(file => path.basename(file) === 'SKILL.md')) {
    if (!registered.has(file)) throw new Error(`Unregistered/duplicate entrypoint: ${file}`);
  }
  const lock = JSON.parse(await readFile(path.join(root, 'sources.lock.json'), 'utf8'));
  if (lock.schemaVersion !== 1) throw new Error('Invalid source lock version');
  const snapshots = new Set();
  for (const source of lock.sources) {
    if (!/^[a-f0-9]{40}$/.test(source.sha)) throw new Error(`Unpinned source: ${source.id}`);
    if (!source.files.some(file => file.upstream === source.license)) throw new Error(`Missing license notice: ${source.id}`);
    for (const file of source.files) {
      const local = inside(root, file.local);
      if (snapshots.has(local)) throw new Error(`Duplicate snapshot path: ${file.local}`);
      const hash = createHash('sha256').update(await readFile(local)).digest('hex');
      if (hash !== file.sha256) throw new Error(`Source integrity mismatch: ${file.local}`);
      snapshots.add(local);
    }
  }
  let links = 0;
  for (const file of files.filter(file => file.endsWith('.md') && !snapshots.has(file))) {
    const text = await readFile(file, 'utf8');
    if (/\[TODO:/.test(text)) throw new Error(`Unfinished scaffold: ${file}`);
    const prose = text.replace(/```[\s\S]*?```/g, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].replace(/^<|>$/g, '').split('#')[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const local = path.resolve(path.dirname(file), decodeURIComponent(target));
      inside(root, path.relative(root, local));
      await access(local);
      links += 1;
    }
  }
  return { skills: entries.length, sourceFiles: snapshots.size, localLinks: links };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await validate())); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
