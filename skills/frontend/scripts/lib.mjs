import { readFile, readdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const bundleRoot = fileURLToPath(new URL('../', import.meta.url));

export function inside(root, relative) {
  const target = path.resolve(root, relative);
  const resolved = path.relative(path.resolve(root), target);
  if (resolved === '..' || resolved.startsWith(`..${path.sep}`) || path.isAbsolute(resolved)) {
    throw new Error(`Path escapes root: ${relative}`);
  }
  return target;
}

export function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) throw new Error('Missing YAML frontmatter');
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(name|description): (.+)$/.exec(line);
    if (!field) throw new Error(`Unsupported adapter frontmatter: ${line}`);
    if (Object.hasOwn(fields, field[1])) throw new Error(`Duplicate field: ${field[1]}`);
    fields[field[1]] = field[2].startsWith('"') ? JSON.parse(field[2]) : field[2];
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.name ?? '') || fields.name.length > 64) {
    throw new Error('Invalid skill name');
  }
  if (typeof fields.description !== 'string' || !fields.description.trim() || fields.description.length > 1024 || /[<>\n]/.test(fields.description)) {
    throw new Error('Invalid skill description');
  }
  return fields;
}

export async function catalog(root = bundleRoot) {
  const data = JSON.parse(await readFile(path.join(root, 'catalog.json'), 'utf8'));
  if (data.schemaVersion !== 1 || !Array.isArray(data.skills) || !data.skills.length) throw new Error('Invalid catalog');
  const names = new Set();
  const paths = new Set();
  const result = [];
  for (const entry of data.skills) {
    if (names.has(entry.name) || paths.has(entry.path)) throw new Error(`Duplicate skill: ${entry.name}`);
    const file = inside(root, `${entry.path}/SKILL.md`);
    const meta = frontmatter(await readFile(file, 'utf8'));
    if (meta.name !== entry.name || path.basename(entry.path) !== entry.name) throw new Error(`Name mismatch: ${entry.name}`);
    names.add(entry.name);
    paths.add(entry.path);
    result.push({ ...entry, ...meta, file });
  }
  return result;
}

export async function walk(root) {
  const result = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Bundle must not contain symlinks: ${full}`);
    if (entry.isDirectory()) result.push(...await walk(full));
    else result.push(full);
  }
  return result;
}

export async function assertNoSymlinks(root, target) {
  inside(root, path.relative(root, target));
  const parts = path.relative(root, target).split(path.sep).filter(Boolean);
  let current = root;
  for (const part of ['', ...parts]) {
    if (part) current = path.join(current, part);
    try {
      const stat = await lstat(current);
      if (stat.isSymbolicLink()) throw new Error(`Refusing symlink/junction: ${current}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}
