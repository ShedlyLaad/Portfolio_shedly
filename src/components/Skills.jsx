import { useInView } from "../hooks/useInView"
import { data } from "../data/data"
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiJava,
  DiHtml5,
  DiCss3,
  DiPhp,
  DiPostgresql,
} from "react-icons/di"
import {
  SiNextdotjs,
  SiSolidity,
  SiMysql,
  SiFigma,
  SiAngular,
  SiPostman,
  SiSlack,
  SiVercel,
  SiCanva,
  SiStartrek,
} from "react-icons/si"
import { MdDesignServices, MdCode } from "react-icons/md"
import { FaCode } from "react-icons/fa"

// Icon mapping for skills
const getTechIcon = (skillName) => {
  const iconMap = {
    "JavaScript": DiJavascript1,
    "Node.js": DiNodejs,
    "React": DiReact,
    "Solidity": SiSolidity,
    "MongoDB": DiMongodb,
    "Next.js": SiNextdotjs,
    "Angular": SiAngular,
    "Git": DiGit,
    "PostgreSQL": DiPostgresql,
    "MySQL": SiMysql,
    "Figma": SiFigma,
    "UI/UX": MdDesignServices,
    "Java": DiJava,
  }
  return iconMap[skillName] || FaCode
}

const getToolIcon = (toolName) => {
  const iconMap = {
    "Visual Studio Code": MdCode,
    "Postman": SiPostman,
    "Slack": SiSlack,
    "Vercel": SiVercel,
    "Canva": SiCanva,
    "UML": SiStartrek,
  }
  return iconMap[toolName] || FaCode
}

const getLanguageIcon = (langName) => {
  const iconMap = {
    "JavaScript": DiJavascript1,
    "HTML5": DiHtml5,
    "CSS3": DiCss3,
    "PHP": DiPhp,
    "Java": DiJava,
    "SQL": DiPostgresql,
  }
  return iconMap[langName] || FaCode
}

export default function Skills({ language = "en" }) {
  const competences = data.competences
  const skills = competences.techniques[language]
  const tools = competences.outils[language]
  const languages = competences.langages[language]

  const skillCategories = [
    {
      title: language === "en" ? "Technologies" : "Technologies",
      skills: skills,
      getIcon: getTechIcon,
      gradient: "from-cyan-400 via-teal-400 to-emerald-400",
      hoverColor: "rgba(34, 211, 238, 0.6)",
      textHoverColor: "rgb(103, 232, 249)",
    },
    {
      title: language === "en" ? "Tools" : "Outils",
      skills: tools,
      getIcon: getToolIcon,
      gradient: "from-teal-400 via-cyan-400 to-sky-400",
      hoverColor: "rgba(20, 184, 166, 0.6)",
      textHoverColor: "rgb(94, 234, 212)",
    },
    {
      title: language === "en" ? "Languages" : "Langages",
      skills: languages,
      getIcon: getLanguageIcon,
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      hoverColor: "rgba(16, 185, 129, 0.6)",
      textHoverColor: "rgb(110, 231, 183)",
    }
  ]

  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
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
            {language === "en" ? "Skills" : "Compétences"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const { ref: categoryRef, isInView: categoryInView } = useInView({ threshold: 0.1, triggerOnce: true })
            return (
            <div
              key={category.title}
              ref={categoryRef}
              className="glass-card rounded-2xl p-6 md:p-8"
              style={{
                opacity: categoryInView ? 1 : 0,
                transform: categoryInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                willChange: 'transform, opacity',
                transition: `opacity 0.8s ease-out ${categoryIndex * 0.2}s, transform 0.8s ease-out ${categoryIndex * 0.2}s`
              }}
            >
              {/* Category header */}
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-display font-bold mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className={`h-0.5 w-16 mx-auto bg-gradient-to-r ${category.gradient} rounded-full`} />
              </div>
              
              {/* Skills grid in columns - cleaner layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {category.skills.map((skill, index) => {
                  const IconComponent = category.getIcon(skill)
                  const { ref: skillRef, isInView: skillInView } = useInView({ threshold: 0.1, triggerOnce: true })
                  return (
                    <div
                      key={skill}
                      ref={skillRef}
                      className="group flex flex-col items-center gap-3 cursor-pointer"
                      style={{
                        opacity: skillInView ? 1 : 0,
                        transform: skillInView ? 'scale(1)' : 'scale(0.8)',
                        willChange: 'transform, opacity',
                        transition: `opacity 0.4s ease-out ${index * 0.03}s, transform 0.4s ease-out ${index * 0.03}s`
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'scale(1.05) translate3d(0, -4px, 0)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'scale(1) translate3d(0, 0, 0)'
                        }
                      }}
                    >
                      {/* Icon container - clean and simple, no constant animations */}
                      <div 
                        className="relative rounded-xl p-4 bg-white/5 border border-white/10 transition-all duration-300"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = category.hoverColor
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <IconComponent 
                          className="text-3xl md:text-4xl text-white group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Skill name */}
                      <span 
                        className="text-xs md:text-sm font-medium text-gray-400 transition-colors duration-300 text-center"
                        style={{
                          color: 'rgb(156, 163, 175)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = category.textHoverColor
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgb(156, 163, 175)'
                        }}
                      >
                        {skill}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
