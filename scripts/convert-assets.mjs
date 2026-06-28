// One-off: convert content PNGs under public/assets to WebP (q80) and delete the
// PNG originals, then make icon-192.png from icon-512.png. Run: node scripts/convert-assets.mjs
import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'

function walk(dir) {
  let out = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) out = out.concat(walk(p))
    else out.push(p)
  }
  return out
}

const assetsDir = 'public/assets'
const pngs = walk(assetsDir).filter((f) => extname(f).toLowerCase() === '.png')
for (const png of pngs) {
  const webp = png.replace(/\.png$/i, '.webp')
  const before = statSync(png).size
  await sharp(png).webp({ quality: 80 }).toFile(webp)
  const after = statSync(webp).size
  unlinkSync(png)
  console.log(`${png} -> ${webp}  ${(before / 1024 | 0)}KB -> ${(after / 1024 | 0)}KB`)
}

// App icons: keep PNG (broad platform support). Make 192 from the 512.
await sharp('public/icon-512.png').resize(192, 192).toFile('public/icon-192.png')
console.log('icon-192.png written')
