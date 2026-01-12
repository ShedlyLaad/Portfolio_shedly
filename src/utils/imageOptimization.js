// Utility pour optimiser les images
export const optimizeImage = (src, options = {}) => {
  const {
    width,
    height,
    quality = 85,
    format = 'webp'
  } = options

  // En production, vous pourriez utiliser un CDN ou service d'optimisation d'images
  // Pour l'instant, retourner l'image originale
  return src
}

// Lazy loading helper
export const lazyLoadImage = (img) => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          observer.unobserve(img)
        }
      })
    })

    if (img.dataset.src) {
      imageObserver.observe(img)
    }
  } else {
    // Fallback pour les navigateurs sans IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
  }
}
