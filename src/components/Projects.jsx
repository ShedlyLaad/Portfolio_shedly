import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Play } from "lucide-react"
import { data } from "../data/data"
import { VideoModal } from "./ui/video-modal"
import { cn } from "../lib/utils"

// Import project images
import jobBoardImage from "../assets/Projects/Job-Board.png"
import ekitabImage from "../assets/Projects/Ekitab.png"
import dewiniImage from "../assets/Projects/dewini.png"
import sneakerHubImage from "../assets/Projects/SneakerHub.png"
import excelleMangerImage from "../assets/Projects/ExcelleManger.png"
import bigsImage from "../assets/Projects/Bigs.png"

// Import project videos
import bigsVideo from "../assets/Projects/BigS_vid.mp4"
import dewiniVideo from "../assets/Projects/Dewini_Vid.mp4"
import ekitabVideo from "../assets/Projects/Ekitab_Vid.mp4"
import excelVideo from "../assets/Projects/Excel_Vid.mp4"

// Mapping helper function
const getProjectAssets = (title) => {
  const titleLower = title?.toLowerCase().replace(/\s+/g, "-")
  
  const imageMap = {
    "job-board-ch": jobBoardImage,
    "e-kitab": ekitabImage,
    "ekitab": ekitabImage,
    "dewini": dewiniImage,
    "sneakerhub": sneakerHubImage,
    "excellemanger": excelleMangerImage,
    "bigscreen-sondage": bigsImage,
    "bigscreen-survey": bigsImage,
    "bigs": bigsImage,
  }

  const videoMap = {
    "bigscreen-sondage": bigsVideo,
    "bigscreen-survey": bigsVideo,
    "bigs": bigsVideo,
    "dewini": dewiniVideo,
    "e-kitab": ekitabVideo,
    "ekitab": ekitabVideo,
    "excellemanger": excelVideo,
  }

  return {
    image: imageMap[titleLower] || null,
    video: videoMap[titleLower] || null,
  }
}

export default function Projects({ language = "en" }) {
  const projects = data.projets[language]
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)
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

  const handleVideoPlay = (video) => {
    if (video) {
      video.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }

  const handleVideoPause = (video) => {
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const openVideoModal = (videoSrc, title) => {
    if (videoSrc) {
      setSelectedVideo(videoSrc)
      setSelectedTitle(title)
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    setSelectedTitle(null)
  }

  return (
    <>
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl section-title mb-8">
              {language === "en" ? "Projects" : "Projets"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {language === "en"
                ? "A showcase of my recent work and side projects"
                : "Un aperçu de mes travaux récents et projets personnels"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const title = project.title || project.titre
              const { image, video } = getProjectAssets(title)
              const isHovered = hoveredIndex === index
              const isVisible = visibleIndex === index
              // Sur mobile, utiliser isVisible, sur desktop utiliser isHovered
              const shouldShowVideo = isMobile ? isVisible : isHovered

              return (
                <motion.div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => !isMobile && setHoveredIndex(index)}
                  onHoverEnd={() => !isMobile && setHoveredIndex(null)}
                  className="group glass-card rounded-2xl overflow-hidden relative"
                >
                  {/* Project Image/Video Container */}
                  {(image || video) && (
                    <div className="relative w-full h-48 bg-black/50 overflow-hidden">
                      {/* Cover Image */}
                      {image && (
                        <motion.img
                          src={image}
                          alt={title}
                          className={cn(
                            "w-full h-full object-cover transition-opacity duration-300",
                            shouldShowVideo && video ? "opacity-0" : "opacity-100"
                          )}
                        />
                      )}

                      {/* Video on Hover (Desktop) or Scroll (Mobile) */}
                      {video && (
                        <motion.video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={video}
                          muted
                          loop
                          playsInline
                          className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                            shouldShowVideo ? "opacity-100 z-10" : "opacity-0 z-0"
                          )}
                          onMouseEnter={() => !isMobile && handleVideoPlay(videoRefs.current[index])}
                          onMouseLeave={() => !isMobile && handleVideoPause(videoRefs.current[index])}
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
                          onClick={() => openVideoModal(video, title)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300 hover:scale-105"
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
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all duration-300 hover:scale-105"
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
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300 hover:scale-105"
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
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {language === "en" ? "View" : "Voir"}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        videoSrc={selectedVideo}
        title={selectedTitle || undefined}
      />
    </>
  )
}
