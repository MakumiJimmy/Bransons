import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Main Dishes' },
    { to: '/events', label: 'Events' },
    { to: '/catering', label: 'Catering' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            Bransons<span>Kitchen</span>
          </Link>

          <div className="navbar__links">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              id="theme-toggle"
            >
              {theme === 'dark' ? '☀' : '🌙'}
            </button>

            <Link to="/about#reservation" className="btn btn--primary navbar__cta desktop-only" id="nav-reserve-btn">
              Reserve
            </Link>

            <button
              className={`navbar__toggle ${mobileOpen ? 'active' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`navbar__mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={closeMobile}
      />

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="navbar__mobile-link"
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: '2rem' }}>
          <Link to="/about#reservation" className="btn btn--primary" onClick={closeMobile} style={{ width: '100%' }}>
            Reserve a Table
          </Link>
        </div>
      </div>
    </>
  )
}
