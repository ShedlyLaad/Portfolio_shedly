import { motion } from "framer-motion"
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react"
import { data } from "../data/data"

export default function Education({ language = "en" }) {
  const education = data.education[language]

  return (
    <section id="education" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl section-title mb-8">
            {language === "en" ? "Education" : "Formation"}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Elegant vertical timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-cyan-400 to-emerald-400 transform md:-translate-x-1/2 rounded-full"
            style={{
              boxShadow: '0 0 15px rgba(20, 184, 166, 0.4)',
            }}
          />
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-cyan-500/50 to-emerald-500/50 transform md:-translate-x-1/2" />

          <div className="space-y-14">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Elegant timeline node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="relative"
                  >
                    {/* Glowing ring */}
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 blur-md -z-10"
                    />
                    
                    {/* Icon container with elegant design */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500/30 to-emerald-500/30 backdrop-blur-xl border-2 border-teal-400/60 flex items-center justify-center shadow-xl"
                      style={{
                        boxShadow: '0 0 25px rgba(20, 184, 166, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <GraduationCap className="w-6 h-6 text-teal-300" />
                    </div>
                  </motion.div>
                </div>

                {/* Content card with academic style */}
                <div
                  className={`ml-20 md:ml-0 md:w-[48%] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="glass-card rounded-2xl p-6 md:p-7 relative overflow-hidden group"
                  >
                    {/* Top accent border */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 rounded-t-2xl" />
                    
                    {/* Subtle gradient overlay */}
                    <motion.div
                      className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-teal-500/8 via-cyan-500/5 to-transparent rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.6
                      }}
                    />
                    
                    {/* Header section */}
                    <div className="mb-5">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Icon badge */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="p-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-400/40 flex-shrink-0"
                        >
                          <Award className="w-6 h-6 text-teal-300" />
                        </motion.div>
                        
                        {/* Title and institution */}
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                            {edu.title || edu.titre}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-teal-400" />
                            <p className="text-base md:text-lg font-semibold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                              {edu.institution || edu.etablissement}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-gray-400 font-medium">
                              {edu.period || edu.periode}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2.5 pt-4 border-t border-white/10">
                      {edu.description.map((desc, descIndex) => (
                        <motion.div
                          key={descIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: descIndex * 0.1 }}
                          className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed group/item"
                        >
                          <motion.span 
                            className="text-teal-400 mt-1 flex-shrink-0 text-lg"
                            animate={{
                              rotate: [0, 10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: descIndex * 0.3
                            }}
                          >
                            •
                          </motion.span>
                          <span className="group-hover/item:text-white transition-colors duration-300">
                            {desc}
                          </span>
                        </motion.div>
                      ))}
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
