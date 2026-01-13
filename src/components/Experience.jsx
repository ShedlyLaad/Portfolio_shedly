import { useInView } from "../hooks/useInView"
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react"
import { data } from "../data/data"

export default function Experience({ language = "en" }) {
  const experiences = data.experience[language]

  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={sectionRef}
          className="text-center mb-16"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            willChange: 'transform, opacity',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <h2 className="text-4xl md:text-5xl section-title mb-8">
            {language === "en" ? "Experience" : "Expérience"}
          </h2>
        </div>

        <div className="relative">
          {/* Modern vertical timeline with gradient - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 transform -translate-x-1/2 rounded-full opacity-30" />
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500 transform -translate-x-1/2 rounded-full" 
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const { ref: expRef, isInView: expInView } = useInView({ threshold: 0.1, triggerOnce: true })
              return (
              <div
                key={index}
                ref={expRef}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{
                  opacity: expInView ? 1 : 0,
                  transform: expInView ? 'translate3d(0, 0, 0)' : `translate3d(${index % 2 === 0 ? -80 : 80}px, 0, 0)`,
                  willChange: 'transform, opacity',
                  transition: `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`
                }}
              >
                {/* Enhanced timeline node */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-20">
                  <div
                    className="relative"
                    style={{
                      opacity: expInView ? 1 : 0,
                      transform: expInView ? 'scale(1)' : 'scale(0)',
                      willChange: 'transform, opacity',
                      transition: `opacity 0.5s ease-out ${index * 0.2 + 0.3}s, transform 0.5s ease-out ${index * 0.2 + 0.3}s`
                    }}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'scale(1.2) rotate(360deg)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                      }
                    }}
                  >
                    {/* Outer glow */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 blur-lg -z-10"
                      style={{
                        willChange: 'opacity, transform',
                        animation: `pulse-glow-exp 2s ease-in-out infinite`,
                        animationDelay: `${index * 0.3}s`
                      }}
                    />
                    
                    {/* Icon container */}
                    <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 backdrop-blur-lg border-2 border-cyan-400/50 flex items-center justify-center shadow-lg"
                      style={{
                        boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <Briefcase className="w-4 h-4 md:w-7 md:h-7 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Content card with modern design */}
                <div
                  className={`ml-12 md:ml-0 md:w-[48%] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div
                    className="glass-card rounded-2xl p-5 md:p-8 relative overflow-hidden group w-full"
                    style={{
                      opacity: expInView ? 1 : 0,
                      transform: expInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(1)',
                      willChange: 'transform, opacity',
                      transition: `opacity 0.6s ease-out ${index * 0.2 + 0.1}s, transform 0.6s ease-out ${index * 0.2 + 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, -8px, 0) scale(1.01)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
                      }
                    }}
                  >
                    {/* Gradient accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 rounded-l-2xl" />
                    
                    {/* Animated gradient overlay */}
                    <div
                      className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl -z-10"
                      style={{
                        willChange: 'transform, opacity',
                        animation: `pulse-overlay-exp 4s ease-in-out infinite`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    />
                    
                    {/* Company header */}
                    <div className="mb-5 md:mb-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                            {exp.company || exp.entreprise}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />
                              <span className="text-xs md:text-sm font-medium text-cyan-300">
                                {exp.location || exp.localisation}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30">
                              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-400" />
                              <span className="text-xs md:text-sm font-medium text-teal-300">
                                {exp.period || exp.periode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Position badge */}
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 backdrop-blur-sm">
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />
                        <span className="text-xs md:text-sm font-semibold text-white">
                          {exp.position || exp.poste}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full" />
                        {language === "en" ? "Key Responsibilities" : "Missions Principales"}
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.missions.map((mission, missionIndex) => {
                          const { ref: missionRef, isInView: missionInView } = useInView({ threshold: 0.1, triggerOnce: true })
                          return (
                          <li
                            key={missionIndex}
                            ref={missionRef}
                            className="flex items-start gap-2 md:gap-3 text-gray-300 text-sm md:text-base leading-relaxed group/item"
                            style={{
                              opacity: missionInView ? 1 : 0,
                              transform: missionInView ? 'translate3d(0, 0, 0)' : 'translate3d(-20px, 0, 0)',
                              willChange: 'transform, opacity',
                              transition: `opacity 0.4s ease-out ${missionIndex * 0.1}s, transform 0.4s ease-out ${missionIndex * 0.1}s`
                            }}
                          >
                            <span 
                              className="text-cyan-400 mt-1.5 flex-shrink-0 text-lg"
                              style={{
                                willChange: 'transform',
                                animation: `move-bullet-exp 2s ease-in-out infinite`,
                                animationDelay: `${missionIndex * 0.2}s`
                              }}
                            >
                              ▸
                            </span>
                            <span className="group-hover/item:text-white transition-colors duration-300">
                              {mission}
                            </span>
                          </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-glow-exp {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-overlay-exp {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes move-bullet-exp {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(4px, 0, 0); }
        }
        @media (max-width: 768px) {
          @keyframes pulse-glow-exp,
          @keyframes pulse-overlay-exp,
          @keyframes move-bullet-exp {
            0%, 100% { }
          }
        }
      `}</style>
    </section>
  )
}
