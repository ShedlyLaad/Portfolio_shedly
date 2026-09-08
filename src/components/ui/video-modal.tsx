import { X, Download, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string | null
  poster?: string
  title?: string
}

export function VideoModal({ isOpen, onClose, videoSrc, poster, title }: VideoModalProps) {
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setErrored(false)
    document.body.style.overflow = "hidden"

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !videoSrc) return null

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4">
          <h3 className="truncate text-lg font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          {errored ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center text-gray-300">
              <AlertCircle className="h-8 w-8 text-primary" />
              <p className="text-sm">
                The demo video couldn&apos;t be loaded right now.
              </p>
              <a
                href={videoSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/30"
              >
                <Download className="h-4 w-4" />
                Open video in a new tab
              </a>
            </div>
          ) : (
            <video
              key={videoSrc}
              src={videoSrc}
              poster={poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              onEnded={onClose}
              onError={() => setErrored(true)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
