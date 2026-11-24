import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const assets = JSON.parse(fs.readFileSync(path.join(root, 'scripts/static-assets.json'), 'utf8'));
for (const [file, base64] of Object.entries(assets)) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, Buffer.from(base64, 'base64'));
}
