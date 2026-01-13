import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import logoFooter from '../../assets/LogoFooter.png'

interface NavItem {
  name: string
  url: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
  onNavClick?: (url: string) => void
  language?: 'en' | 'fr'
  setLanguage?: (lang: 'en' | 'fr') => void
}

export function AnimeNavBar({ items, className, defaultActive = "Home", onNavClick, language = 'en', setLanguage }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const navRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
    // Animate navbar entrance
    if (navRef.current) {
      navRef.current.style.opacity = '0'
      navRef.current.style.transform = 'translate3d(0, -20px, 0)'
      requestAnimationFrame(() => {
        if (navRef.current) {
          navRef.current.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
          navRef.current.style.opacity = '1'
          navRef.current.style.transform = 'translate3d(0, 0, 0)'
        }
      })
    }
    // Animate logo entrance
    if (logoRef.current) {
      logoRef.current.style.opacity = '0'
      logoRef.current.style.transform = 'scale(0.8)'
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.style.transition = 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
          logoRef.current.style.opacity = '1'
          logoRef.current.style.transform = 'scale(1)'
        }
      }, 50)
    }
  }, [])

  const handleClick = (e: React.MouseEvent, url: string, name: string) => {
    e.preventDefault()
    setActiveTab(name)
    
    if (onNavClick) {
      onNavClick(url)
    }
    
    // Smooth scroll to section with offset for fixed navbar
    const target = document.querySelector(url)
    if (target) {
      const element = target as HTMLElement
      const offsetTop = element.offsetTop - 120 // Offset for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-2 md:top-5 left-0 right-0 z-[9999] px-2 md:px-0">
      <div className="flex justify-center">
        <div 
          ref={navRef}
          className={cn(
            "flex items-center gap-1 md:gap-2 bg-black/50 border border-white/10 backdrop-blur-lg py-1.5 md:py-2 px-1 md:px-3 rounded-full shadow-lg relative",
            "max-w-[95vw] md:max-w-fit",
            "overflow-x-auto scrollbar-hide",
            className
          )}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Logo Footer à gauche */}
          <div
            ref={logoRef}
            className="flex-shrink-0 mr-1 md:mr-2"
            style={{ willChange: 'transform, opacity' }}
          >
            <img 
              src={logoFooter} 
              alt="CL Logo" 
              loading="eager"
              decoding="async"
              className="h-7 w-7 md:h-8 md:w-8 opacity-95 hover:opacity-100 transition-all duration-300 filter drop-shadow-[0_0_6px_rgba(0,240,255,0.4)] hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]"
              style={{ 
                willChange: 'transform, opacity',
                transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </div>

          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => handleClick(e, item.url, item.name)}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer font-semibold rounded-full transition-all duration-300 flex items-center justify-center",
                  "text-white/70 hover:text-white",
                  isActive && "text-white",
                  // Mobile: smaller padding, only icon
                  "px-2 md:px-6 py-2 md:py-3 text-xs md:text-sm",
                  "min-w-[40px] md:min-w-0"
                )}
              >
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    style={{
                      opacity: 0.4,
                      willChange: 'opacity, transform',
                      animation: 'pulse-glow 2s ease-in-out infinite'
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite",
                        willChange: 'transform'
                      }}
                    />
                  </div>
                )}

                {/* Mobile: Only icon, larger */}
                <div className="md:hidden">
                  <Icon size={20} strokeWidth={2} className="text-inherit" />
                </div>

                {/* Desktop: Icon + Text */}
                <div className="hidden md:flex items-center gap-2">
                  <Icon size={18} strokeWidth={2} className="text-inherit" />
                  <span>{item.name}</span>
                </div>

                {/* Hover effect */}
                {isHovered && !isActive && (
                  <div
                    className="absolute inset-0 rounded-full bg-white/5 -z-10"
                    style={{
                      opacity: 1,
                      transform: 'scale(1)',
                      willChange: 'opacity, transform',
                      transition: 'opacity 0.3s ease, transform 0.3s ease'
                    }}
                  />
                )}
              </a>
            )
          })}

          {/* Language Toggle Button */}
          {setLanguage && (
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className={cn(
                "ml-1 md:ml-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full",
                "bg-white/5 hover:bg-white/10 border border-white/10",
                "text-white/70 hover:text-white text-xs md:text-sm font-semibold",
                "transition-all duration-300 flex-shrink-0"
              )}
              style={{
                willChange: 'transform',
                transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.03); }
        }
        @media (max-width: 768px) {
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.4; }
          }
        }
      `}</style>
    </div>
  )
}
