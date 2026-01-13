import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string | null
  title?: string
}

export function VideoModal({ isOpen, onClose, videoSrc, title }: VideoModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setShouldRender(true)
      // Trigger animation after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
        document.body.style.overflow = "unset"
      }, 300)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!shouldRender || !videoSrc) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'opacity',
          transition: 'opacity 0.3s ease-out'
        }}
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl bg-background/95 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(0.9)',
            willChange: 'transform, opacity',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
          }}
        >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                {title && (
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative w-full bg-black aspect-video">
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={onClose}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </>
      )
}
