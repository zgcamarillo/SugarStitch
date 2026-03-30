import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }

    window.addEventListener('authChange', checkLogin)
    window.addEventListener('storage', checkLogin)

    return () => {
      window.removeEventListener('authChange', checkLogin)
      window.removeEventListener('storage', checkLogin)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setIsLoggedIn(false)
    setMenuOpen(false)
    window.dispatchEvent(new Event('authChange'))

    navigate('/login')
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={handleLinkClick}>
        Sugar Stitch
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {!isLoggedIn && (
          <>
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              <img
                src="/images/home.png"
                alt="Sugar Stitch home"
                className="nav-logo"
              />
              Home
            </Link>

            <Link
              to="/eco-guide"
              className="nav-link"
              id="eco-guide-link"
              onClick={handleLinkClick}
            >
              <img
                src="/images/leaf.png"
                alt="Sugar Stitch Leaf"
                className="nav-logo"
              />
              Eco Guide
            </Link>

            <Link to="/login" className="nav-link" onClick={handleLinkClick}>
              <img
                src="/images/avatar.png"
                alt="Sugar Stitch Avatar"
                className="nav-logo"
              />
              Login / Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/account" className="nav-link" onClick={handleLinkClick}>
              Account
            </Link>

            <Link to="/journal" className="nav-link" onClick={handleLinkClick}>
              Journal
            </Link>

            <Link
              to="/achievements"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Achievements
            </Link>

            <Link
              to="/pattern-generator"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Pattern Generator
            </Link>

            <Link
              to="/stitch-library"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Stitch Library
            </Link>

            <Link
              to="/saved-patterns"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Saved Patterns
            </Link>

            <button className="logout-btn mobile-only" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn desktop-only">
          Logout
        </button>
      )}
    </nav>
  )
}