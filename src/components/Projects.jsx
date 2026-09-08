import { useState, useRef, useEffect, memo, useCallback } from "react"
import { ExternalLink, Github, Play } from "lucide-react"
import { data } from "../data/data"
import { VideoModal } from "./ui/video-modal"
import { cn } from "../lib/utils"
import { useInView } from "../hooks/useInView"

// Optimized project cover images (WebP, hashed by Vite) + video poster frames.
// Regenerate with: npm run optimize:media
import jobBoardImage from "../assets/Projects/optimized/job-board.webp"
import ekitabImage from "../assets/Projects/optimized/ekitab.webp"
import dewiniImage from "../assets/Projects/optimized/dewini.webp"
import sneakerHubImage from "../assets/Projects/optimized/sneakerhub.webp"
import excelleMangerImage from "../assets/Projects/optimized/excellemanger.webp"
import bigsImage from "../assets/Projects/optimized/bigscreen.webp"
import bitchestImage from "../assets/Projects/optimized/bitchest.webp"

import bitchestPoster from "../assets/Projects/optimized/bitchest-poster.jpg"
import bigsPoster from "../assets/Projects/optimized/bigscreen-poster.jpg"
import dewiniPoster from "../assets/Projects/optimized/dewini-poster.jpg"
import ekitabPoster from "../assets/Projects/optimized/ekitab-poster.jpg"
import excelPoster from "../assets/Projects/optimized/excellemanger-poster.jpg"

// Compressed demo videos live in /public/videos and are served from a stable,
// deploy-safe absolute path (long-lived CDN cache set in vercel.json).
const VIDEO_BASE = "/videos"

// Resolve a project title (EN or FR) to a stable slug.
const getProjectSlug = (title) => {
  const key = title?.toLowerCase().replace(/\s+/g, "-")
  const slugMap = {
    "job-board-ch": "job-board",
    "e-kitab": "ekitab",
    "ekitab": "ekitab",
    "dewini": "dewini",
    "sneakerhub": "sneakerhub",
    "excellemanger": "excellemanger",
    "bigscreen-sondage": "bigscreen",
    "bigscreen-survey": "bigscreen",
    "bigs": "bigscreen",
    "bitchest": "bitchest",
  }
  return slugMap[key] || null
}

// Mapping helper function
const getProjectAssets = (title) => {
  const slug = getProjectSlug(title)

  const imageMap = {
    "job-board": jobBoardImage,
    "ekitab": ekitabImage,
    "dewini": dewiniImage,
    "sneakerhub": sneakerHubImage,
    "excellemanger": excelleMangerImage,
    "bigscreen": bigsImage,
    "bitchest": bitchestImage,
  }

  // Only these projects have a recorded demo (sneakerhub / job-board don't).
  const posterMap = {
    "bitchest": bitchestPoster,
    "bigscreen": bigsPoster,
    "dewini": dewiniPoster,
    "ekitab": ekitabPoster,
    "excellemanger": excelPoster,
  }

  return {
    image: imageMap[slug] || null,
    video: posterMap[slug] ? `${VIDEO_BASE}/${slug}.mp4` : null,
    poster: posterMap[slug] || null,
  }
}

// Project Card Component with React.memo
const ProjectCard = memo(({ project, index, language, isMobile, hoveredIndex, setHoveredIndex, visibleIndex, openVideoModal, videoRefs, cardRefs, onVideoPlay, onVideoPause }) => {
  const title = project.title || project.titre
  const { image, video, poster } = getProjectAssets(title)
  const isHovered = hoveredIndex === index
  const isVisible = visibleIndex === index
  const shouldShowVideo = isMobile ? isVisible : isHovered
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.1, rootMargin: "-50px", triggerOnce: true })

  // Load the video file only once it is actually needed (hover / in view on
  // mobile). Falls back silently to the cover image if the video can't load.
  const [videoRequested, setVideoRequested] = useState(false)
  const [videoError, setVideoError] = useState(false)
  useEffect(() => {
    if (shouldShowVideo && !videoError) setVideoRequested(true)
  }, [shouldShowVideo, videoError])
  const showVideoLayer = shouldShowVideo && video && !videoError

  // Drive playback from state rather than mouse events (more reliable once the
  // element swaps in after a lazy src assignment).
  useEffect(() => {
    const el = videoRefs.current?.[index]
    if (!el) return
    el.muted = true
    if (showVideoLayer && videoRequested) {
      const p = el.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [showVideoLayer, videoRequested, index, videoRefs])
  
  // Store cardRefs in a ref to avoid dependency issues
  const cardRefsRef = useRef(cardRefs)
  const inViewRefStable = useRef(inViewRef)
  
  useEffect(() => {
    cardRefsRef.current = cardRefs
    inViewRefStable.current = inViewRef
  }, [cardRefs, inViewRef])

  // Combine refs: one for IntersectionObserver, one for cardRefs
  // Apply both refs to the same DOM element
  // Use a callback ref that handles both refs - must always be a function
  // React requires: function, React.createRef() object, or undefined/null
  const setRefs = useCallback((el) => {
    // Store in cardRefs for video control
    const currentCardRefs = cardRefsRef.current
    if (currentCardRefs && typeof currentCardRefs === 'object' && currentCardRefs !== null && 'current' in currentCardRefs && currentCardRefs.current) {
      if (el) {
        currentCardRefs.current[index] = el
      } else {
        delete currentCardRefs.current[index]
      }
    }
    // Assign to useInView ref (useRef object) - must be a valid useRef
    // Use stable ref to avoid dependency issues
    const currentInViewRef = inViewRefStable.current
    if (currentInViewRef && typeof currentInViewRef === 'object' && currentInViewRef !== null && 'current' in currentInViewRef) {
      currentInViewRef.current = el
    }
  }, [index]) // Only index as dependency - refs are stored in refs

  return (
    <div
      ref={setRefs}
      data-index={index}
      className="group glass-card rounded-2xl overflow-hidden relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        willChange: 'transform, opacity',
        transition: `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`
      }}
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
    >
      {/* Project Image/Video Container */}
      {(image || video) && (
        <div className="relative w-full h-48 bg-black/50 overflow-hidden">
          {/* Cover Image (always the reliable base layer / video fallback) */}
          {image && (
            <img
              src={image}
              alt={title}
              width="1000"
              height="563"
              loading="lazy"
              decoding="async"
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                showVideoLayer ? "opacity-0" : "opacity-100"
              )}
              style={{ willChange: 'opacity' }}
            />
          )}

          {/* Video on Hover (Desktop) or Scroll (Mobile) — lazily loaded */}
          {video && (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={videoRequested ? video : undefined}
              poster={poster || undefined}
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                showVideoLayer ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              style={{ willChange: 'opacity' }}
              onError={() => setVideoError(true)}
              onMouseEnter={() => !isMobile && onVideoPlay(index)}
              onMouseLeave={() => !isMobile && onVideoPause(index)}
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-20" />
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-gray-300 mb-6 leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {/* Demo Video Button */}
          {video && (
            <button
              onClick={() => openVideoModal(video, title, poster)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300"
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
              <Play className="w-4 h-4" />
              {language === "en" ? "Demo" : "Démo"}
            </button>
          )}

          {(project.githubLink || project.lienGitHub) && (
            <a
              href={project.githubLink || project.lienGitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all duration-300"
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
              <Github className="w-4 h-4" />
              {language === "en" ? "Code" : "Code"}
            </a>
          )}

          {(project.demoLink || project.lienDemo) && (
            <a
              href={project.demoLink || project.lienDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300"
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
              <ExternalLink className="w-4 h-4" />
              {language === "en" ? "Live" : "Live"}
            </a>
          )}

          {(project.linkedinLink || project.lienLinkedIn) && (
            <a
              href={project.linkedinLink || project.lienLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300"
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
              <ExternalLink className="w-4 h-4" />
              {language === "en" ? "View" : "Voir"}
            </a>
          )}
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default function Projects({ language = "en" }) {
  const projects = data.projets[language]
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [selectedPoster, setSelectedPoster] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [visibleIndex, setVisibleIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const videoRefs = useRef({})
  const cardRefs = useRef({})

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer pour détecter les projets visibles sur mobile
  useEffect(() => {
    if (!isMobile) return

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Déclenche quand 50% du projet est visible
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.dataset.index)
        if (entry.isIntersecting) {
          setVisibleIndex(index)
          // Lancer la vidéo si elle existe
          const video = videoRefs.current[index]
          if (video) {
            video.play().catch(() => {
              // Gérer les restrictions d'autoplay
            })
          }
        } else {
          // Pause la vidéo quand elle n'est plus visible
          const video = videoRefs.current[index]
          if (video) {
            video.pause()
            video.currentTime = 0
          }
          if (visibleIndex === index) {
            setVisibleIndex(null)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observer tous les projets
    Object.keys(cardRefs.current).forEach((key) => {
      const card = cardRefs.current[key]
      if (card) {
        observer.observe(card)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [isMobile, projects.length, visibleIndex])

  useEffect(() => {
    // Pause all videos when hover changes (desktop only)
    if (!isMobile) {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause()
          video.currentTime = 0
        }
      })
    }
  }, [hoveredIndex, isMobile])

  const openVideoModal = (videoSrc, title, posterSrc) => {
    if (videoSrc) {
      setSelectedVideo(videoSrc)
      setSelectedTitle(title)
      setSelectedPoster(posterSrc || null)
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    setSelectedTitle(null)
    setSelectedPoster(null)
  }

  const onVideoPlay = (index) => {
    const video = videoRefs.current?.[index]
    if (video) {
      video.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }

  const onVideoPause = (index) => {
    const video = videoRefs.current?.[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <>
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div
            ref={sectionRef}
            className="text-center mb-12"
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
            }}
          >
            <h2 className="text-4xl md:text-5xl section-title mb-8">
              {language === "en" ? "Projects" : "Projets"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {language === "en"
                ? "A showcase of my recent work and side projects"
                : "Un aperçu de mes travaux récents et projets personnels"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                language={language}
                isMobile={isMobile}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                visibleIndex={visibleIndex}
                openVideoModal={openVideoModal}
                videoRefs={videoRefs}
                cardRefs={cardRefs}
                onVideoPlay={onVideoPlay}
                onVideoPause={onVideoPause}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        videoSrc={selectedVideo}
        poster={selectedPoster || undefined}
        title={selectedTitle || undefined}
      />
    </>
  )
}
