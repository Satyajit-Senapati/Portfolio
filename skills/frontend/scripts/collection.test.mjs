import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { bundleRoot, catalog, inside } from './lib.mjs';
import { install } from './install.mjs';
import { validate } from './validate.mjs';
import { parseCsv, rankRows, search } from './search-data.mjs';

const entries = await catalog();

test('bundle entrypoints, authored links, licenses, and source hashes validate', async () => {
  const result = await validate();
  assert.equal(result.skills, entries.length);
  assert.ok(result.sourceFiles > 100);
});

test('copy works in a path with spaces; native entries resolve; repeat is idempotent', async () => {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'frontend skills relocation '));
  const root = path.join(repo, 'portable bundle');
  await cp(bundleRoot, root, { recursive: true });
  await validate(root);
  assert.equal((await install({ repo, root })).created, entries.length);
  assert.equal((await install({ repo, root })).created, 0);
  assert.equal((await install({ repo, root, agent: 'claude' })).created, entries.length);
  for (const entry of await catalog(root)) {
    const file = path.join(repo, '.agents', 'skills', entry.name, 'SKILL.md');
    const text = await readFile(file, 'utf8');
    const target = /\]\(([^)]+)\)/.exec(text)[1];
    assert.equal(path.resolve(path.dirname(file), decodeURIComponent(target)), entry.file);
  }
});

test('copy-only bundle and Codex entrypoints resolve in a new repo without installation', async () => {
  const sourceRepo = await mkdtemp(path.join(os.tmpdir(), 'frontend skills package source '));
  const sourceBundle = path.join(sourceRepo, 'skills/frontend');
  await cp(bundleRoot, sourceBundle, { recursive: true });
  await install({ repo: sourceRepo, root: sourceBundle });
  const repo = await mkdtemp(path.join(os.tmpdir(), 'frontend skills copy only '));
  const root = path.join(repo, 'skills/frontend');
  await cp(sourceBundle, root, { recursive: true });
  await cp(path.join(sourceRepo, '.agents/skills'), path.join(repo, '.agents/skills'), { recursive: true });
  await validate(root);
  for (const entry of await catalog(root)) {
    const file = path.join(repo, '.agents/skills', entry.name, 'SKILL.md');
    const text = await readFile(file, 'utf8');
    const link = /\]\(([^)]+)\)/.exec(text)[1];
    const target = path.resolve(path.dirname(file), decodeURIComponent(link));
    assert.equal(target, entry.file);
    assert.equal(await readFile(target, 'utf8'), await readFile(path.join(bundleRoot, entry.path, 'SKILL.md'), 'utf8'));
  }
});

test('conflicting existing skill prevents every write and preserves instructions', async () => {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'frontend skills conflict '));
  const root = path.join(repo, 'skills/frontend');
  await cp(bundleRoot, root, { recursive: true });
  const skill = path.join(repo, '.agents/skills/visual-qa');
  await mkdir(skill, { recursive: true });
  await writeFile(path.join(skill, 'SKILL.md'), 'existing user skill');
  await writeFile(path.join(repo, 'AGENTS.md'), 'existing project rules');
  await assert.rejects(install({ repo, root }), /Existing skill differs/);
  assert.deepEqual(await readdir(path.join(repo, '.agents/skills')), ['visual-qa']);
  assert.equal(await readFile(path.join(skill, 'SKILL.md'), 'utf8'), 'existing user skill');
  assert.equal(await readFile(path.join(repo, 'AGENTS.md'), 'utf8'), 'existing project rules');
});

test('paths cannot escape the supplied root', () => {
  assert.throws(() => inside(bundleRoot, '../outside'), /escapes root/);
});

test('CSV fallback preserves quoted commas, newlines, escaped quotes, and Unicode', () => {
  const rows = parseCsv('\uFEFFname,detail\r\n"Focus, visible","Use ""Tab""\nand résumé"\r\nOther,Pointer\r\n');
  assert.equal(rows[0].detail, 'Use "Tab"\nand résumé');
  assert.equal(rankRows(rows, 'focus résumé')[0].record.name, 'Focus, visible');
  assert.deepEqual(rankRows(rows, 'unmatched'), []);
  assert.throws(() => parseCsv('a,b\n"unclosed'), /Unclosed/);
});

test('real offline data search returns records and rejects traversal domains', async () => {
  assert.ok((await search('ux', 'keyboard focus')).results.length);
  assert.ok((await search('stack:react', 'render state')).results.length);
  await assert.rejects(search('stack:../../secret', 'x'), /Unknown domain/);
});

test('source tampering is detected after relocation', async () => {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'frontend skills integrity '));
  await cp(bundleRoot, repo, { recursive: true });
  await writeFile(path.join(repo, 'art-direction/taste-skill/references/upstream/guide.md'), 'changed');
  await assert.rejects(validate(repo), /Source integrity mismatch/);
});
