import { spawnSync } from 'node:child_process';
for (const args of [['--check', 'dist/main.js'], ['--check', 'dist/structure.js'], ['--check', 'scripts/dev.mjs'], ['--check', 'scripts/browser-qa.mjs'], ['--check', 'scripts/video-qa.mjs'], ['--check', 'scripts/design-qa.mjs'], ['--check', 'scripts/package-release.mjs']]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
const result = spawnSync('python3', ['scripts/check_site.py'], { stdio: 'inherit' });
process.exit(result.status || 0);
