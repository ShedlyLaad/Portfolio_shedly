import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { DottedSurface } from './components/ui/dotted-surface'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Copyright from './components/Copyright'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  useEffect(() => {
    // Detect user's preferred language
    const userLang = navigator.language.split('-')[0]
    if (userLang === 'fr') {
      setLanguage('fr')
    }
    
    // Apply dark theme to document
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ThemeProvider>
      <Copyright />
      <div className="min-h-screen text-foreground relative overflow-x-hidden">
        {/* Global animated background - covers entire page */}
        <DottedSurface className="fixed inset-0 w-full h-full" />
        
        {/* Background overlay for readability - optimized to show dots */}
        <div className="fixed inset-0 bg-background/50 backdrop-blur-[0.5px] -z-[5]" />
        
        <Navbar language={language} setLanguage={setLanguage} />
        <main className="relative z-10">
          <Hero language={language} />
          <About language={language} />
          <Skills language={language} />
          <Education language={language} />
          <Experience language={language} />
          <Projects language={language} />
          <Contact language={language} />
        </main>
        <Footer language={language} />
      </div>
    </ThemeProvider>
  )
}

export default App
