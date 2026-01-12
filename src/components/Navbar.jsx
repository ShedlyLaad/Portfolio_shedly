import { Home, User, Briefcase, GraduationCap, FolderKanban, Mail, BriefcaseBusiness } from "lucide-react"
import { AnimeNavBar } from "./ui/anime-navbar"

export default function Navbar({ language, setLanguage }) {
  const items = [
    {
      name: "Home",
      url: "#hero",
      icon: Home,
    },
    {
      name: "About",
      url: "#about",
      icon: User,
    },
    {
      name: "Skills",
      url: "#skills",
      icon: Briefcase,
    },
    {
      name: "Education",
      url: "#education",
      icon: GraduationCap,
    },
    {
      name: "Experience",
      url: "#experience",
      icon: BriefcaseBusiness,
    },
    {
      name: "Projects",
      url: "#projects",
      icon: FolderKanban,
    },
    {
      name: "Contact",
      url: "#contact",
      icon: Mail,
    },
  ]

  return <AnimeNavBar items={items} defaultActive="Home" language={language} setLanguage={setLanguage} />
}
