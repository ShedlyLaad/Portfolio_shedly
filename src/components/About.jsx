import { Code2, Sparkles, Rocket, Target } from "lucide-react"
import { data } from "../data/data"
import { useInView } from "../hooks/useInView"

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

  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1, rootMargin: "-100px", triggerOnce: true })
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1, rootMargin: "-100px", triggerOnce: true })
  const { ref: leftRef, isInView: leftInView } = useInView({ threshold: 0.1, rootMargin: "-100px", triggerOnce: true })
  const { ref: rightRef, isInView: rightInView } = useInView({ threshold: 0.1, rootMargin: "-100px", triggerOnce: true })

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Title Section */}
        <div
          ref={titleRef}
          className="flex flex-col items-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, -50px, 0)',
            willChange: 'transform, opacity',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl section-title mb-8">
            {language === "en" ? "About" : "À Propos"}
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-400 font-display font-light tracking-wide"
            style={{
              opacity: subtitleInView ? 1 : 0,
              willChange: 'opacity',
              transition: 'opacity 0.8s ease-out 0.3s'
            }}
          >
            {language === "en" ? "Get to know me better" : "Apprenez à mieux me connaître"}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Description */}
          <div
            ref={leftRef}
            className="space-y-6"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translate3d(0, 0, 0)' : 'translate3d(-50px, 0, 0)',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
            }}
          >
            <div
              className="glass-card rounded-2xl p-8 md:p-10"
              style={{
                opacity: leftInView ? 1 : 0,
                transform: leftInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                willChange: 'transform, opacity',
                transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s'
              }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-white">
                {language === "en" ? "Who I Am" : "Qui Je Suis"}
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                {description}
              </p>
            </div>

            {/* Professional Description */}
            <div
              className="glass-card rounded-2xl p-8 md:p-10 border-l-4"
              style={{
                borderLeftColor: '#00F0FF',
                borderLeftWidth: '4px',
                opacity: leftInView ? 1 : 0,
                transform: leftInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                willChange: 'transform, opacity',
                transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
              }}
            >
              <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 gradient-text">
                {language === "en" ? "My Journey" : "Mon Parcours"}
              </h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {profession.description}
              </p>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div
            ref={rightRef}
            className="space-y-6"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? 'translate3d(0, 0, 0)' : 'translate3d(50px, 0, 0)',
              willChange: 'transform, opacity',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white text-center lg:text-left mb-8">
              <span className="gradient-text">
                {language === "en" ? "What I Bring" : "Ce Que J'Apporte"}
              </span>
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const { ref: featureRef, isInView: featureInView } = useInView({ threshold: 0.1, triggerOnce: true })
                return (
                  <div
                    key={feature.title}
                    ref={featureRef}
                    className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                    style={{
                      opacity: featureInView ? 1 : 0,
                      transform: featureInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 30px, 0) scale(0.9)',
                      willChange: 'transform, opacity',
                      transition: `opacity 0.5s ease-out ${0.4 + index * 0.1}s, transform 0.5s ease-out ${0.4 + index * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, -8px, 0) scale(1.02)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
                      }
                    }}
                  >
                    {/* Gradient background on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                    />
                    
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                      style={{
                        willChange: 'transform',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
                        }
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-display font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                      style={{
                        willChange: 'transform',
                        transition: 'transform 1s ease'
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Background decorative elements - Cyan/Turquoise/Green */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)' }} />
      <style>{`
        @media (max-width: 768px) {
          .glass-card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
