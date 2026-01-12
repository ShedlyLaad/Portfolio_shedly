#!/bin/bash

# Script de compression de vidéos avec FFmpeg
# Usage: bash scripts/compress-videos.sh
# Nécessite: FFmpeg installé

ASSETS_DIR="src/assets/Projects"
OUTPUT_DIR="src/assets/Projects/compressed"

# Créer le dossier de sortie s'il n'existe pas
mkdir -p "$OUTPUT_DIR"

# Fonction de compression
compress_video() {
    local input="$1"
    local output="$2"
    local filename=$(basename "$input")
    
    echo "📹 Compression de $filename..."
    
    ffmpeg -i "$input" \
        -vcodec libx264 \
        -crf 28 \
        -preset slow \
        -vf "scale=1920:-2" \
        -movflags +faststart \
        -y "$output" 2>&1 | grep -E "(Duration|Stream|Video|Audio|frame)"
    
    if [ $? -eq 0 ]; then
        original_size=$(du -h "$input" | cut -f1)
        new_size=$(du -h "$output" | cut -f1)
        echo "✅ $filename: $original_size → $new_size"
    else
        echo "❌ Erreur lors de la compression de $filename"
    fi
    echo ""
}

# Trouver toutes les vidéos
find "$ASSETS_DIR" -maxdepth 1 -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.avi" \) ! -path "*/compressed/*" | while read -r video; do
    filename=$(basename "$video")
    output="$OUTPUT_DIR/$filename"
    compress_video "$video" "$output"
done

echo "✨ Compression terminée! Fichiers dans: $OUTPUT_DIR"
