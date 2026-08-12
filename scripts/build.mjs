import { access, readFile } from 'node:fs/promises';

const files = [
  'package.json',
  'src/engine.mjs',
  'src/server.mjs',
  'src/cli.mjs',
  'public/index.html',
  'public/app.js',
  'public/styles.css'
];

for (const file of files) {
  await access(file);
  await readFile(file, 'utf8');
}

console.log(`Build manifest validated: ${files.length} files`);
