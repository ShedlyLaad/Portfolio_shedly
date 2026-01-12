import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Instagram, Phone } from "lucide-react"
import { data } from "../data/data"

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

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
        </motion.div>

        {/* 3D Glowing Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
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
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.1 }}
                    className="social-icon group flex flex-col items-center text-decoration-none transition-all duration-300 relative z-10"
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
                  </motion.a>
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
              </motion.a>
            </div> */}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { 
            transform: translateX(0) rotate(0); 
          }
          20% { 
            transform: translateX(-3px) rotate(-3deg); 
          }
          40% { 
            transform: translateX(3px) rotate(3deg); 
          }
          60% { 
            transform: translateX(-3px) rotate(-3deg); 
          }
          80% { 
            transform: translateX(3px) rotate(3deg); 
          }
        }
        
        .social-icon:hover .icon-container svg,
        .social-icon:hover .icon-container {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  )
}
