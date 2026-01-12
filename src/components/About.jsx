import { motion } from "framer-motion"
import { Code2, Sparkles, Rocket, Target } from "lucide-react"
import { data } from "../data/data"

export default function About({ language = "en" }) {
  const description = data.descriptionPersonnelle[language]
  const profession = data.profession[language]

  const features = [
    {
      icon: Code2,
      title: language === "en" ? "Clean Code" : "Code Propre",
      description: language === "en" 
        ? "Writing maintainable and scalable code"
        : "Écriture de code maintenable et évolutif",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: language === "en" ? "Innovation" : "Innovation",
      description: language === "en"
        ? "Creative solutions for complex problems"
        : "Solutions créatives pour des problèmes complexes",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Rocket,
      title: language === "en" ? "Performance" : "Performance",
      description: language === "en"
        ? "Fast and efficient applications"
        : "Applications rapides et efficaces",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: language === "en" ? "User Focus" : "Focus Utilisateur",
      description: language === "en"
        ? "Designing with users in mind"
        : "Conception centrée sur l'utilisateur",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl section-title mb-8">
            {language === "en" ? "About" : "À Propos"}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 font-display font-light tracking-wide"
          >
            {language === "en" ? "Get to know me better" : "Apprenez à mieux me connaître"}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-white">
                {language === "en" ? "Who I Am" : "Qui Je Suis"}
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                {description}
              </p>
            </motion.div>

            {/* Professional Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card rounded-2xl p-8 md:p-10 border-l-4"
              style={{
                borderLeftColor: '#00F0FF',
                borderLeftWidth: '4px'
              }}
            >
              <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 gradient-text">
                {language === "en" ? "My Journey" : "Mon Parcours"}
              </h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {profession.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white text-center lg:text-left mb-8">
              <span className="gradient-text">
                {language === "en" ? "What I Bring" : "Ce Que J'Apporte"}
              </span>
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                  >
                    {/* Gradient background on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h4 className="text-xl font-display font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Background decorative elements - Cyan/Turquoise/Green */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)' }} />
    </section>
  )
}
