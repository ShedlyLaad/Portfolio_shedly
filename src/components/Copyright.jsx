import { useEffect } from "react"

export default function Copyright() {
  useEffect(() => {
    // Protection basique contre copier-coller
    const handleCopy = (e) => {
      e.clipboardData.setData('text/plain', '© Chedly Laadhiby - All Rights Reserved')
      e.preventDefault()
    }

    const handleSelectStart = (e) => {
      // Permettre la sélection mais avec watermark
      return true
    }

    const handleContextMenu = (e) => {
      // Afficher un message au lieu de bloquer complètement
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        console.log('%c© Chedly Laadhiby - Portfolio Protected', 'color: #00F0FF; font-size: 16px; font-weight: bold;')
      }
      // Ne pas bloquer complètement pour une meilleure UX
      return true
    }

    const handleKeyDown = (e) => {
      // Bloquer F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (basique, facilement contournable)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        console.log('%c© Chedly Laadhiby - Portfolio Protected', 'color: #00F0FF; font-size: 16px; font-weight: bold;')
        e.preventDefault()
        return false
      }
    }

    // Watermark visuel
    const createWatermark = () => {
      const existingWatermark = document.getElementById('portfolio-watermark')
      if (existingWatermark) return

      const watermark = document.createElement('div')
      watermark.id = 'portfolio-watermark'
      watermark.innerHTML = '© Chedly Laadhiby'
      watermark.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 9998;
        color: rgba(255, 255, 255, 0.1);
        font-size: 12px;
        font-family: 'Orbitron', sans-serif;
        pointer-events: none;
        user-select: none;
        transform: rotate(-45deg);
        transform-origin: center;
      `
      document.body.appendChild(watermark)
    }

    // Event listeners
    document.addEventListener('copy', handleCopy)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    createWatermark()

    // Cleanup
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      const watermark = document.getElementById('portfolio-watermark')
      if (watermark) watermark.remove()
    }
  }, [])

  return null
}
