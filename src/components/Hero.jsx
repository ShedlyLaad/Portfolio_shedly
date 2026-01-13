import { Download, ArrowDown } from "lucide-react"
import { data } from "../data/data"
import moiImage from "../assets/Moi.png"
import cvFile from "../assets/Chedly Laadhiby CV (Fr)..pdf"
import { useEffect, useRef, useState } from "react"

export default function Hero({ language = "en" }) {
  const personal = data.personal[language]
  const profession = data.profession[language]
  const [mounted, setMounted] = useState(false)
  const leftContentRef = useRef(null)
  const rightContentRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const quoteRef = useRef(null)
  const buttonsRef = useRef(null)
  const imageRef = useRef(null)
  const outerCircleRef = useRef(null)
  const middleCircleRef = useRef(null)
  const innerCircleRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    // Animate elements on mount
    const animateElements = () => {
      // Left content
      if (leftContentRef.current) {
        leftContentRef.current.style.opacity = '0'
        leftContentRef.current.style.transform = 'translate3d(-50px, 0, 0)'
        requestAnimationFrame(() => {
          if (leftContentRef.current) {
            leftContentRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
            leftContentRef.current.style.opacity = '1'
            leftContentRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        })
      }
      // Badge
      if (badgeRef.current) {
        badgeRef.current.style.opacity = '0'
        badgeRef.current.style.transform = 'scale(0.9)'
        setTimeout(() => {
          if (badgeRef.current) {
            badgeRef.current.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
            badgeRef.current.style.opacity = '1'
            badgeRef.current.style.transform = 'scale(1)'
          }
        }, 50)
      }
      // Title
      if (titleRef.current) {
        titleRef.current.style.opacity = '0'
        titleRef.current.style.transform = 'translate3d(0, 20px, 0) scale(0.9)'
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            titleRef.current.style.opacity = '1'
            titleRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)'
          }
        }, 50)
      }
      // Tagline
      if (taglineRef.current) {
        taglineRef.current.style.opacity = '0'
        taglineRef.current.style.transform = 'translate3d(0, 20px, 0)'
        setTimeout(() => {
          if (taglineRef.current) {
            taglineRef.current.style.transition = 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s'
            taglineRef.current.style.opacity = '1'
            taglineRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        }, 50)
      }
      // Quote
      if (quoteRef.current) {
        quoteRef.current.style.opacity = '0'
        quoteRef.current.style.transform = 'translate3d(0, 20px, 0)'
        setTimeout(() => {
          if (quoteRef.current) {
            quoteRef.current.style.transition = 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s'
            quoteRef.current.style.opacity = '1'
            quoteRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        }, 50)
      }
      // Buttons
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = '0'
        buttonsRef.current.style.transform = 'translate3d(0, 20px, 0)'
        setTimeout(() => {
          if (buttonsRef.current) {
            buttonsRef.current.style.transition = 'opacity 0.8s ease-out 1s, transform 0.8s ease-out 1s'
            buttonsRef.current.style.opacity = '1'
            buttonsRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        }, 50)
      }
      // Right content
      if (rightContentRef.current) {
        rightContentRef.current.style.opacity = '0'
        rightContentRef.current.style.transform = 'translate3d(50px, 0, 0)'
        setTimeout(() => {
          if (rightContentRef.current) {
            rightContentRef.current.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
            rightContentRef.current.style.opacity = '1'
            rightContentRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        }, 50)
      }
      // Image
      if (imageRef.current) {
        imageRef.current.style.opacity = '0'
        imageRef.current.style.transform = 'scale(1.1)'
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.style.transition = 'opacity 0.8s ease-out 0.9s, transform 0.8s ease-out 0.9s'
            imageRef.current.style.opacity = '1'
            imageRef.current.style.transform = 'scale(1)'
          }
        }, 50)
      }
    }
    animateElements()
  }, [])

  const handleScroll = () => {
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = cvFile
    link.download = language === "en" ? personal.resume?.fileName || "CV.pdf" : personal.cv?.nomFichier || "CV.pdf"
    link.click()
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div
            ref={leftContentRef}
            className="text-center lg:text-left"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              ref={badgeRef}
              className="mb-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="inline-block px-4 py-2 rounded-full glass mb-6">
                <span className="text-sm text-primary font-medium">
                  {profession.mainTitle || profession.titrePrincipal}
                </span>
              </div>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="gradient-text font-futuristic">
                {personal.fullName || personal.nomComplet}
              </span>
            </h1>

            <p
              ref={taglineRef}
              className="text-xl md:text-2xl text-gray-300 mb-6"
              style={{ willChange: 'transform, opacity' }}
            >
              {profession.tagline || profession.tagline}
            </p>

            <p
              ref={quoteRef}
              className="text-lg text-gray-400 mb-10 max-w-xl"
              style={{ willChange: 'transform, opacity' }}
            >
              {profession.quote || profession.citation}
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                onClick={handleScroll}
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border-2 border-cyan-400/50 hover:border-cyan-400 text-white font-semibold flex items-center justify-center"
                style={{
                  willChange: 'transform',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)'
                }}
                aria-label={language === "en" ? "View Projects" : "Voir Projets"}
              >
                <ArrowDown className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:translate-y-1" />
              </button>

              <button
                onClick={handleDownload}
                className="group px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold"
                style={{
                  willChange: 'transform',
                  transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {language === "en" ? "Download CV" : "Télécharger CV"}
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Photo with animated circle */}
          <div
            ref={rightContentRef}
            className="flex justify-center lg:justify-end"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              {/* Outer animated circle */}
              <div
                ref={outerCircleRef}
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                style={{
                  width: '420px',
                  height: '420px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform',
                  animation: 'rotate-circle 20s linear infinite, pulse-scale 3s ease-in-out infinite'
                }}
              />

              {/* Middle animated circle */}
              <div
                ref={middleCircleRef}
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                style={{
                  width: '380px',
                  height: '380px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform',
                  animation: 'rotate-circle-reverse 15s linear infinite, pulse-scale-slow 4s ease-in-out infinite'
                }}
              />

              {/* Inner circle with glow effect */}
              <div
                ref={innerCircleRef}
                className="relative rounded-full overflow-hidden border-4 border-primary"
                style={{
                  width: '350px',
                  height: '350px',
                  willChange: 'box-shadow',
                  animation: 'glow-pulse 2s ease-in-out infinite'
                }}
              >
                {/* Photo */}
                <img
                  ref={imageRef}
                  src={moiImage}
                  alt={personal.fullName || personal.nomComplet}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ willChange: 'transform, opacity' }}
                />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 pointer-events-none" />
              </div>

              {/* Floating particles effect - disabled on mobile */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary/40 hidden md:block"
                  style={{
                    width: '8px',
                    height: '8px',
                    top: `${20 + i * 15}%`,
                    left: `${10 + (i % 2) * 80}%`,
                    willChange: 'transform, opacity',
                    animation: `float-particle 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute -top-10 left-1/2 w-full h-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.15),transparent_50%)] blur-[80px]" />
      </div>
      <style>{`
        @keyframes rotate-circle {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotate-circle-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes pulse-scale-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.03); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.5); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.4; }
          50% { transform: translate3d(0, -20px, 0); opacity: 1; }
        }
        @media (max-width: 768px) {
          @keyframes rotate-circle,
          @keyframes rotate-circle-reverse,
          @keyframes pulse-scale,
          @keyframes pulse-scale-slow,
          @keyframes glow-pulse {
            0%, 100% { }
          }
        }
      `}</style>
    </section>
  )
}
