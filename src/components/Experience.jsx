import { motion } from "framer-motion"
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react"
import { data } from "../data/data"

export default function Experience({ language = "en" }) {
  const experiences = data.experience[language]

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl section-title mb-8">
            {language === "en" ? "Experience" : "Expérience"}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Modern vertical timeline with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 transform md:-translate-x-1/2 rounded-full opacity-30" />
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500 transform md:-translate-x-1/2 rounded-full" 
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Enhanced timeline node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Outer glow */}
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 blur-lg -z-10"
                    />
                    
                    {/* Icon container */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 backdrop-blur-lg border-2 border-cyan-400/50 flex items-center justify-center shadow-lg"
                      style={{
                        boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <Briefcase className="w-7 h-7 text-cyan-400" />
                    </div>
                  </motion.div>
                </div>

                {/* Content card with modern design */}
                <div
                  className={`ml-24 md:ml-0 md:w-[48%] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group"
                  >
                    {/* Gradient accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 rounded-l-2xl" />
                    
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Company header */}
                    <div className="mb-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                            {exp.company || exp.entreprise}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                              <MapPin className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-medium text-cyan-300">
                                {exp.location || exp.localisation}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30">
                              <Calendar className="w-4 h-4 text-teal-400" />
                              <span className="text-sm font-medium text-teal-300">
                                {exp.period || exp.periode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Position badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 backdrop-blur-sm">
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-white">
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
                        {exp.missions.map((mission, missionIndex) => (
                          <motion.li
                            key={missionIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: missionIndex * 0.1 }}
                            className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed group/item"
                          >
                            <motion.span 
                              className="text-cyan-400 mt-1.5 flex-shrink-0 text-lg"
                              animate={{
                                x: [0, 4, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: missionIndex * 0.2
                              }}
                            >
                              ▸
                            </motion.span>
                            <span className="group-hover/item:text-white transition-colors duration-300">
                              {mission}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
