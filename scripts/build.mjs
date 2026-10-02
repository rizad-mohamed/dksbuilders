import {build} from 'esbuild';
import {mkdir,copyFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
await mkdir('dist/vendor',{recursive:true});
await build({stdin:{contents:"export * from 'three';",resolveDir:process.cwd(),sourcefile:'three-entry.js'},outfile:'dist/vendor/three.js',bundle:true,minify:true,format:'esm',target:'es2022',legalComments:'eof'});
await copyFile('node_modules/three/LICENSE','dist/vendor/THREE-LICENSE.txt');
const result=spawnSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});process.exit(result.status||0);
