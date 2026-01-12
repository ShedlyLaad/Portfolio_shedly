import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { data } from "../data/data"
import moiImage from "../assets/Moi.png"
import cvFile from "../assets/Chedly Laadhiby CV (Fr)..pdf"

export default function Hero({ language = "en" }) {
  const personal = data.personal[language]
  const profession = data.profession[language]

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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-2 rounded-full glass mb-6">
                <span className="text-sm text-primary font-medium">
                  {profession.mainTitle || profession.titrePrincipal}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
              className="text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              <span className="gradient-text font-futuristic">
                {personal.fullName || personal.nomComplet}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-6"
            >
              {profession.tagline || profession.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-gray-400 mb-10 max-w-xl"
            >
              {profession.quote || profession.citation}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={handleScroll}
                className="group relative px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                <span className="flex items-center justify-center gap-2">
                  {language === "en" ? "View Projects" : "Voir Projets"}
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={handleDownload}
                className="group px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {language === "en" ? "Download CV" : "Télécharger CV"}
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - Photo with animated circle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer animated circle */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                style={{
                  width: '420px',
                  height: '420px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Middle animated circle */}
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                style={{
                  width: '380px',
                  height: '380px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Inner circle with glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                    '0 0 40px rgba(0, 240, 255, 0.5)',
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-full overflow-hidden border-4 border-primary"
                style={{
                  width: '350px',
                  height: '350px',
                }}
              >
                {/* Photo */}
                <motion.img
                  src={moiImage}
                  alt={personal.fullName || personal.nomComplet}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 pointer-events-none" />
              </motion.div>

              {/* Floating particles effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/40"
                  style={{
                    width: '8px',
                    height: '8px',
                    top: `${20 + i * 15}%`,
                    left: `${10 + (i % 2) * 80}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={handleScroll}
          >
            <ArrowDown className="w-6 h-6 text-white/50 hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background gradient effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute -top-10 left-1/2 w-full h-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.15),transparent_50%)] blur-[80px]" />
      </div>
    </section>
  )
}
