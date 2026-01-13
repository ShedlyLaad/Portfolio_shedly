import { useInView } from "../hooks/useInView"
import { Mail, Github, Linkedin, Instagram, Phone, ArrowUp } from "lucide-react"
import { data } from "../data/data"
import { useState, useEffect } from "react"

export default function Contact({ language = "en" }) {
  const personal = data.personal[language]
  const contact = personal.contact

  const whatsappNumber = contact.whatsapp || "+21648062093"
  
  const socialLinks = [
    {
      name: "Email",
      url: `mailto:${contact.email}`,
      icon: Mail,
      hoverClass: "email",
      hoverGradient: "radial-gradient(circle at 30% 50%, rgba(0, 240, 255, 0.8) 0%, rgba(20, 184, 166, 0.6) 50%, rgba(16, 185, 129, 0.4) 100%)",
      hoverShadow: "rgba(0, 240, 255, 0.6)",
    },
    {
      name: "GitHub",
      url: contact.github,
      icon: Github,
      hoverClass: "github",
      hoverGradient: "linear-gradient(135deg, rgba(0, 240, 255, 0.8), rgba(20, 184, 166, 0.6))",
      hoverShadow: "rgba(0, 240, 255, 0.6)",
    },
    {
      name: "LinkedIn",
      url: contact.linkedin,
      icon: Linkedin,
      hoverClass: "linkedin",
      hoverGradient: "linear-gradient(135deg, rgba(0, 240, 255, 0.8), rgba(20, 184, 166, 0.6))",
      hoverShadow: "rgba(20, 184, 166, 0.6)",
    },
    {
      name: "Instagram",
      url: contact.instagram,
      icon: Instagram,
      hoverClass: "instagram",
      hoverGradient: "radial-gradient(circle at 30% 107%, rgba(0, 240, 255, 0.8) 0%, rgba(20, 184, 166, 0.6) 45%, rgba(16, 185, 129, 0.4) 60%)",
      hoverShadow: "rgba(16, 185, 129, 0.6)",
    },
    {
      name: language === "en" ? "Call" : "Appeler",
      url: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`,
      icon: Phone,
      hoverClass: "whatsapp",
      hoverGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(20, 184, 166, 0.6))",
      hoverShadow: "rgba(16, 185, 129, 0.6)",
      isWhatsApp: true
    }
  ]

  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: containerRef, isInView: containerInView } = useInView({ threshold: 0.1, triggerOnce: true })
  
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            willChange: 'transform, opacity',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="section-title">
              {language === "en" ? "Connect" : "Contactez"}
            </span>
            <span className="text-white ml-3">
              {language === "en" ? "With Me" : "Moi"}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {language === "en"
              ? "Let's work together or just have a chat"
              : "Travaillons ensemble ou discutons simplement"}
          </p>
        </div>

        {/* 3D Glowing Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            opacity: containerInView ? 1 : 0,
            transform: containerInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
            willChange: 'transform, opacity',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
          }}
        >
          <div 
            className="rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden p-8 md:p-12 transition-all duration-500 hover:scale-[1.02]"
            style={{
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.4), 0 0 80px rgba(20, 184, 166, 0.3), inset 0 0 40px rgba(16, 185, 129, 0.1)'
            }}
          >
            {/* Description text */}
            <div className="text-center mb-10">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {language === "en"
                  ? "Feel free to reach out if you're looking for a developer, have a question, or just want to connect."
                  : "N'hésitez pas à me contacter si vous recherchez un développeur, avez une question ou souhaitez simplement entrer en contact."}
              </p>
            </div>

            {/* Social Icons Grid */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                const { ref: linkRef, isInView: linkInView } = useInView({ threshold: 0.1, triggerOnce: true })
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={linkRef}
                    className="social-icon group flex flex-col items-center text-decoration-none transition-all duration-300 relative z-10"
                    style={{
                      opacity: linkInView ? 1 : 0,
                      transform: linkInView ? 'scale(1)' : 'scale(0.8)',
                      willChange: 'transform, opacity',
                      transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, -10px, 0) scale(1.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
                      }
                    }}
                  >
                    {/* Icon Container */}
                    <div 
                      className="icon-container inline-flex w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-300 relative justify-center items-center bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-transparent"
                      style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = link.hoverGradient
                        e.currentTarget.style.boxShadow = `0 0 30px ${link.hoverShadow}, 0 8px 32px rgba(0, 0, 0, 0.4)`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                        style={{
                          background: `radial-gradient(circle at center, ${link.hoverShadow}, transparent 70%)`,
                          filter: 'blur(10px)',
                        }}
                      />
                      
                      {/* Icon */}
                      <Icon 
                        className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                        }}
                      />
                    </div>
                    
                    {/* Label */}
                    <span 
                      className="icon-label mt-4 text-white font-medium opacity-70 transition-all duration-300 text-sm md:text-base"
                      style={{
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.transform = 'translateY(2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {link.name}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Email CTA */}
            {/* <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <motion.a
                href={`mailto:${contact.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 border border-white/20 hover:border-cyan-400/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(20, 184, 166, 0.15))'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Mail className="w-5 h-5" />
                <span>{contact.email}</span>
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll to top button - Green/Cyan design */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border-2 border-cyan-400/50 hover:border-cyan-400 text-white z-50 flex items-center justify-center group shadow-lg"
          style={{
            willChange: 'transform, box-shadow',
            transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            animation: 'pulse-glow-contact 2s ease-in-out infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)'
          }}
          aria-label={language === "en" ? "Scroll to top" : "Retour en haut"}
        >
          <ArrowUp className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}

      <style>{`
        @keyframes pulse-glow-contact {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
          }
        }
        @media (max-width: 768px) {
          .social-icon:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
