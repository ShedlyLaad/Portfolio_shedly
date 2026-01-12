# Guide de Compression des Assets

Ce guide explique comment compresser les images et vidéos pour optimiser les performances du portfolio.

## Outils Recommandés

### Pour les Images (PNG/JPG)
1. **TinyPNG** (https://tinypng.com/) - Compression en ligne gratuite
2. **ImageOptim** (Mac) - Application desktop
3. **Squoosh** (https://squoosh.app/) - Outil Google en ligne
4. **sharp** (npm) - Pour automatisation

### Pour les Vidéos (MP4)
1. **HandBrake** (https://handbrake.fr/) - Gratuit et open source
2. **FFmpeg** - En ligne de commande
3. **VLC** - Peut convertir/compresser les vidéos

## Recommandations de Compression

### Images
- **Format**: PNG pour logos, JPG pour photos
- **Résolution**: Max 1920px de largeur
- **Taille cible**: < 500KB par image
- **Qualité**: 80-85% pour JPG

### Vidéos
- **Format**: MP4 (H.264)
- **Résolution**: Max 1920x1080 (1080p)
- **Taille cible**: < 10MB par vidéo
- **Bitrate**: 2-5 Mbps
- **FPS**: 30 fps (ou 24 fps pour animations)

## Commandes FFmpeg

### Compresser une vidéo
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 28 -preset slow -vf "scale=1920:-2" output.mp4
```

### Extraire une frame comme thumbnail
```bash
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 output.png
```

### Réduire la qualité vidéo
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 30 -preset medium output.mp4
```

## Optimisation Web

Pour un site React/Vite, les assets sont automatiquement optimisés lors du build avec:
- **Vite**: Minification automatique
- **Image optimization**: Utiliser des formats modernes (WebP)
- **Lazy loading**: Les vidéos peuvent être chargées à la demande

## Note sur Docker/Redis

Pour un site statique (React SPA), Docker et Redis ne sont **pas nécessaires** pour la compression. Ils sont utilisés pour:
- **Docker**: Conteneurisation de l'application (optionnel pour déploiement)
- **Redis**: Cache côté serveur (non nécessaire pour site statique)

Pour l'hébergement statique, utilisez:
- **Vercel** (recommandé)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

Ces plateformes optimisent automatiquement les assets lors du déploiement.
