import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    setMounted(true)
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
        <motion.div 
          className={cn(
            "flex items-center gap-1 md:gap-2 bg-black/50 border border-white/10 backdrop-blur-lg py-1.5 md:py-2 px-1 md:px-3 rounded-full shadow-lg relative",
            "max-w-[95vw] md:max-w-fit",
            "overflow-x-auto scrollbar-hide",
            className
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Footer à gauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0 mr-1 md:mr-2"
          >
            <img 
              src={logoFooter} 
              alt="CL Logo" 
              className="h-7 w-7 md:h-8 md:w-8 opacity-95 hover:opacity-100 transition-all duration-300 filter drop-shadow-[0_0_6px_rgba(0,240,255,0.4)] hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)] hover:scale-110"
            />
          </motion.div>

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
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite"
                      }}
                    />
                  </motion.div>
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
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/5 -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  />
                )}
              </a>
            )
          })}

          {/* Language Toggle Button */}
          {setLanguage && (
            <motion.button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className={cn(
                "ml-1 md:ml-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full",
                "bg-white/5 hover:bg-white/10 border border-white/10",
                "text-white/70 hover:text-white text-xs md:text-sm font-semibold",
                "transition-all duration-300 flex-shrink-0"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'en' ? 'FR' : 'EN'}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
