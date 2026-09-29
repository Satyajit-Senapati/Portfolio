import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleRoot, catalog, inside, assertNoSymlinks } from './lib.mjs';

export async function install({ repo, agent = 'codex', root = bundleRoot }) {
  if (!['codex', 'claude'].includes(agent)) throw new Error('Agent must be codex or claude');
  const project = await realpath(path.resolve(repo));
  const bundle = await realpath(root);
  inside(project, path.relative(project, bundle));
  const host = agent === 'codex' ? '.agents' : '.claude';
  const plan = [];
  for (const entry of await catalog(bundle)) {
    const destination = inside(project, `${host}/skills/${entry.name}/SKILL.md`);
    await assertNoSymlinks(project, destination);
    const relative = path.relative(path.dirname(destination), entry.file).split(path.sep).join('/');
    const link = relative.split('/').map(encodeURIComponent).join('/');
    const content = `---\nname: ${entry.name}\ndescription: ${JSON.stringify(entry.description)}\n---\n\n<!-- portable-frontend-skills: generated entrypoint -->\n\nRead [the ${entry.name} skill](${link}) and follow its instructions. Resolve its supporting references relative to that linked file. Do not load unrelated skills.\n`;
    let existing;
    try { existing = await readFile(destination, 'utf8'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (existing !== undefined && existing !== content) {
      throw new Error(`Existing skill differs; no files written. Preserve/reconcile it manually: ${destination}`);
    }
    plan.push({ destination, content, create: existing === undefined });
  }
  // Preflight all conflicts before creating any entrypoint. Never modify AGENTS.md or CLAUDE.md.
  for (const item of plan.filter(item => item.create)) {
    await mkdir(path.dirname(item.destination), { recursive: true });
    await writeFile(item.destination, item.content, { flag: 'wx' });
  }
  return { agent, skills: plan.length, created: plan.filter(item => item.create).length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.includes('--help')) {
      console.log('Usage: node skills/frontend/scripts/install.mjs [--repo .] [--agent codex|claude]\nCopy the complete bundle inside the target repo first. Existing differing skills are never overwritten.');
    } else {
      const options = { repo: process.cwd() };
      for (let i = 0; i < args.length; i += 2) {
        if (!['--repo', '--agent'].includes(args[i]) || !args[i + 1] || args[i + 1].startsWith('--')) throw new Error('Invalid arguments; use --help');
        options[args[i].slice(2)] = args[i + 1];
      }
      console.log(JSON.stringify(await install(options)));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
