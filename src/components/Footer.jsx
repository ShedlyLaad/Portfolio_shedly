import { motion } from "framer-motion"
import { MapPin, Shield } from "lucide-react"
import logoFooter from "../assets/LogoFooter.png"

export default function Footer({ language = "en" }) {
  const address = language === "en" 
    ? "Tunisia, Nabeul, Soliman 108 Avenue de République"
    : "Tunisie, Nabeul, Soliman 108 Avenue de République"
  
  const copyrightText = language === "en"
    ? "All rights reserved"
    : "Tous droits réservés"

  const protectedText = language === "en"
    ? "Protected by copyright"
    : "Protégé par copyright"

  return (
    <footer className="relative border-t border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3"
        >
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <img 
              src={logoFooter} 
              alt="CL Logo" 
              className="h-7 md:h-8 w-auto opacity-90 hover:opacity-100 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
              loading="lazy"
            />
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              © {new Date().getFullYear()} Chedly Laadhiby - {copyrightText}
            </div>
          </div>

          {/* Address and Protection */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 flex-shrink-0" />
              <span className="font-medium text-center">{address}</span>
            </div>
             <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Shield className="w-3 h-3 text-cyan-400/50" />
              <span>{protectedText}</span>
            </div> 
                      </div>
        </motion.div>
      </div>
    </footer>
  )
}
