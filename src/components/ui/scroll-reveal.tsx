import { useInView } from "../../hooks/useInView"
import { useEffect, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  distance = 30,
  className = ""
}: ScrollRevealProps) {
  const { ref, isInView } = useInView({ 
    threshold: 0.1, 
    rootMargin: "-100px",
    triggerOnce: true 
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  // Calculate transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return `translate3d(0, ${distance}px, 0)`
        case "down":
          return `translate3d(0, -${distance}px, 0)`
        case "left":
          return `translate3d(${distance}px, 0, 0)`
        case "right":
          return `translate3d(-${distance}px, 0, 0)`
        default:
          return `translate3d(0, ${distance}px, 0)`
      }
    }
    return "translate3d(0, 0, 0)"
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        willChange: isVisible ? 'auto' : 'transform, opacity',
        transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
