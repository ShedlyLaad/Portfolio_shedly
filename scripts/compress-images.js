/**
 * Script de compression d'images
 * Nécessite: sharp (npm install sharp)
 * Usage: node scripts/compress-images.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ASSETS_DIR = path.join(__dirname, '../src/assets/Projects')
const OUTPUT_DIR = path.join(__dirname, '../src/assets/Projects/compressed')

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function compressImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath)
    const originalSize = (stats.size / 1024 / 1024).toFixed(2) // MB

    await sharp(inputPath)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .png({ quality: 85, compressionLevel: 9 })
      .jpeg({ quality: 85 })
      .toFile(outputPath)

    const newStats = fs.statSync(outputPath)
    const newSize = (newStats.size / 1024 / 1024).toFixed(2) // MB
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1)

    console.log(`✅ ${path.basename(inputPath)}: ${originalSize}MB → ${newSize}MB (${reduction}% réduction)`)
  } catch (error) {
    console.error(`❌ Erreur lors de la compression de ${inputPath}:`, error.message)
  }
}

async function compressAllImages() {
  const files = fs.readdirSync(ASSETS_DIR)
  const imageFiles = files.filter(
    (file) => /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('compressed')
  )

  console.log(`\n📦 Compression de ${imageFiles.length} images...\n`)

  for (const file of imageFiles) {
    const inputPath = path.join(ASSETS_DIR, file)
    const outputPath = path.join(OUTPUT_DIR, file)
    await compressImage(inputPath, outputPath)
  }

  console.log(`\n✨ Compression terminée! Fichiers dans: ${OUTPUT_DIR}\n`)
}

// Exécuter
compressAllImages().catch(console.error)
