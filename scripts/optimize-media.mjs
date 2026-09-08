/**
 * Media optimization for the portfolio (frontend only, no backend).
 *
 * - Compresses the huge demo videos (14-139 MB) into web-ready H.264 MP4s
 *   (<= 1280px, CRF 27, +faststart so playback starts before full download).
 * - Extracts a poster frame for each video.
 * - Re-encodes the project cover images to WebP.
 *
 * Sources live in src/assets/Projects/ (kept untouched, never bundled).
 * Outputs:
 *   - public/videos/<slug>.mp4              -> served with long-lived cache headers
 *   - src/assets/Projects/optimized/<slug>-poster.jpg  -> hashed by Vite (imported)
 *   - src/assets/Projects/optimized/<slug>.webp        -> hashed by Vite (imported)
 *
 * Usage: npm run optimize:media
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const SRC = join(root, 'src', 'assets', 'Projects')
const VIDEO_OUT = join(root, 'public', 'videos')
const IMG_OUT = join(SRC, 'optimized')

/** source file (relative to src/assets/Projects) -> output slug */
const VIDEOS = {
  'BitchestDemo.mp4': 'bitchest',
  'BigS_vid.mp4': 'bigscreen',
  'Dewini_Vid.mp4': 'dewini',
  'Ekitab_Vid.mp4': 'ekitab',
  'Excel_Vid.mp4': 'excellemanger',
}

const IMAGES = {
  'Bitchest.png': 'bitchest',
  'Bigs.png': 'bigscreen',
  'dewini.png': 'dewini',
  'Ekitab.png': 'ekitab',
  'ExcelleManger.png': 'excellemanger',
  'Job-Board.png': 'job-board',
  'SneakerHub.png': 'sneakerhub',
}

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1)
const ff = (args) => execFileSync(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' })

for (const dir of [VIDEO_OUT, IMG_OUT]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

console.log('\n▶  Videos\n')
for (const [file, slug] of Object.entries(VIDEOS)) {
  const input = join(SRC, file)
  if (!existsSync(input)) {
    console.warn(`   skip ${file} (not found)`)
    continue
  }
  const mp4 = join(VIDEO_OUT, `${slug}.mp4`)
  const poster = join(IMG_OUT, `${slug}-poster.jpg`)

  // Web-ready MP4: cap at 1280px wide, even dimensions, progressive download.
  ff([
    '-i', input,
    '-vf', "scale='min(1280,iw)':-2:flags=lanczos",
    '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-preset', 'slow', '-crf', '27',
    '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
    '-movflags', '+faststart',
    mp4,
  ])

  // Poster frame (~1.5s in, or first frame for very short clips).
  ff(['-ss', '1.5', '-i', input, '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2", '-q:v', '4', poster])

  console.log(`   ${file}  ${mb(input)}MB  ->  ${slug}.mp4 ${mb(mp4)}MB  (+ poster ${mb(poster)}MB)`)
}

console.log('\n▶  Project cover images\n')
for (const [file, slug] of Object.entries(IMAGES)) {
  const input = join(SRC, file)
  if (!existsSync(input)) {
    console.warn(`   skip ${file} (not found)`)
    continue
  }
  const webp = join(IMG_OUT, `${slug}.webp`)
  ff(['-i', input, '-vf', "scale='min(1000,iw)':-2:flags=lanczos", '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6', webp])
  console.log(`   ${file}  ${mb(input)}MB  ->  ${slug}.webp ${mb(webp)}MB`)
}

console.log('\n✓  Done. Videos in public/videos/, posters + webp in src/assets/Projects/optimized/\n')
