import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import home from '../assets/home.png'
import leaf from '../assets/leaf.png'
import book from '../assets/open-book.png'
import person from '../assets/person.png'
import yarn from '../assets/yarn-ball.png'

export default function Navbar() {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  )

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
    window.dispatchEvent(new Event('authChange'))

    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={yarn} alt="Sugar Stitch Yarn" className="logo-yarn" />
        Sugar Stitch
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          <img src={home} alt="Home" className="nav-logo" />
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/eco-guide" className="nav-link">
              <img src={leaf} alt="Eco Guide" className="nav-logo" />
              Eco Guide
            </Link>

            <Link to="/login" className="nav-link">
              <img src={person} alt="Login" className="nav-logo" />
              Login / Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/account" className="nav-link">Account</Link>
            <Link to="/journal" className="nav-link">Journal</Link>
            <Link to="/achievements" className="nav-link">Achievements</Link>
            <Link to="/pattern-generator" className="nav-link">Pattern Generator</Link>

            <Link to="/stitch-library" className="nav-link">
              <img src={book} alt="Stitch Library" className="nav-logo" />
              Stitch Library
            </Link>

            <Link to="/saved-patterns" className="nav-link">
              Saved Patterns
            </Link>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  )
}