// 縮小 src/ 底下過大的照片（Astro 建置時會再轉成 WebP，這裡是讓原檔不要太大）（就地覆寫）
// 用法：npm run images            壓縮所有過大的照片
//       npm run images -- --check 只檢查，有過大照片或檔名大小寫不符就回報錯誤（CI 用）
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src';
const MAX_EDGE = 1600;        // 內文照片最長邊
const MAX_EDGE_HEADER = 1920; // 封面圖（head/header/cover 開頭）
const MAX_BYTES = 600 * 1024; // 超過這個大小就壓縮
const QUALITY = 78;
const checkOnly = process.argv.includes('--check');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let found = 0, saved = 0;

// Mac 不分大小寫、GitHub 的 Linux 有分：文章寫 1.jpg 但檔案是 1.JPG，本機正常、上線就壞
const POSTS = join(ROOT, 'content', 'posts');
let caseErrors = 0;
for (const slug of await readdir(POSTS)) {
  const dir = join(POSTS, slug);
  if (!(await stat(dir)).isDirectory()) continue;
  const files = new Set(await readdir(dir));
  const md = await readFile(join(dir, 'index.md'), 'utf8');
  const refs = [...md.matchAll(/!\[[^\]]*\]\(<?\.\/([^)>]+)>?\)|^cover: \.\/(.+)$/gm)].map((m) => m[1] ?? m[2]);
  for (const ref of refs) {
    if (files.has(ref)) continue;
    const actual = [...files].find((f) => f.toLowerCase() === ref.toLowerCase());
    console.log(`檔名不符：${dir}/index.md 寫的是 ${ref}，${actual ? `實際檔名是 ${actual}` : '找不到這個檔案'}`);
    caseErrors++;
  }
}

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
  const isHeader = /^(head|header|cover)/i.test(basename(file));
  const maxEdge = isHeader ? MAX_EDGE_HEADER : MAX_EDGE;
  const { size } = await stat(file);
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  if (size <= MAX_BYTES) continue;

  found++;
  if (checkOnly) {
    console.log(`過大：${file}（${(size / 1024 / 1024).toFixed(1)} MB，${meta.width}×${meta.height}）`);
    continue;
  }
  // PNG 只縮尺寸不換格式，避免文章裡的檔名失效
  let img = sharp(input).rotate().resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });
  img = ext === '.png' ? img.png({ compressionLevel: 9, palette: true })
      : ext === '.webp' ? img.webp({ quality: QUALITY })
      : img.jpeg({ quality: QUALITY, progressive: true, mozjpeg: true });
  const out = await img.toBuffer();
  if (out.length < size) {
    await writeFile(file, out);
    saved += size - out.length;
    console.log(`已壓縮：${file}  ${(size / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB`);
  }
}

if (caseErrors) {
  console.error(`\n有 ${caseErrors} 個照片檔名和文章裡寫的不一致，請修正後再 commit。`);
  process.exit(1);
}
if (checkOnly && found) {
  console.error(`\n有 ${found} 張照片過大，請先在本機執行 npm run images 再 commit。`);
  process.exit(1);
}
console.log(checkOnly ? '照片大小都 OK' : `完成，共節省 ${(saved / 1024 / 1024).toFixed(1)} MB`);
