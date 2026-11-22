// Downloads each source photo from the Unsplash CDN as WebP at several widths
// into public/images so the site serves everything itself.
// Usage: node scripts/fetch-images.mjs   (re-runs skip files that already exist)
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'images');
const sources = JSON.parse(
  await readFile(path.join(root, 'scripts', 'image-sources.json'), 'utf8')
);

const widthsSource = await readFile(path.join(root, 'src', 'config', 'images.ts'), 'utf8');
const photoWidths = JSON.parse(widthsSource.match(/IMAGE_WIDTHS = (\[[^\]]*\])/)[1]);

const jobs = [
  ...sources.photos.flatMap((id) => photoWidths.map((w) => ({ id, w }))),
  ...sources.avatars.flatMap((id) => [160, 320].map((w) => ({ id, w }))),
];

await mkdir(outDir, { recursive: true });
let bytes = 0;
let failed = 0;

for (const { id, w } of jobs) {
  const file = path.join(outDir, `${id}-${w}.webp`);
  try {
    await access(file);
    continue;
  } catch {
    // not downloaded yet
  }
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=60&fm=webp`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${id} @${w}`);
    failed++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  bytes += buf.length;
}

// Social-sharing image: 1200x630 JPEG at the site root (WebP is not supported everywhere).
for (const id of sources.og ?? []) {
  const file = path.join(root, 'public', 'og-image.jpg');
  try {
    await access(file);
    continue;
  } catch {
    // not downloaded yet
  }
  const res = await fetch(
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=630&q=80&fm=jpg`
  );
  if (!res.ok) {
    console.error(`FAIL ${res.status} og image ${id}`);
    failed++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  bytes += buf.length;
}

console.log(
  `done: ${jobs.length - failed}/${jobs.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB downloaded`
);
if (failed) process.exit(1);
