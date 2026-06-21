import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Catering from './pages/Catering'
import About from './pages/About'
import './components/BackToTop.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bransons-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('bransons-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Loader />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/events" element={<Events />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
