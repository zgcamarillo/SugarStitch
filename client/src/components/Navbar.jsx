import { Link } from 'react-router-dom'

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <nav className="navbar">
      <div className="logo">Sugar Stitch</div>

      <div className="nav-links">
        {/* ALWAYS visible */}
        <Link to="/">Home</Link>

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <>
            <Link to="/mission">Our Mission</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            <Link to="/account">Account</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/pattern-generator">Pattern Generator</Link>
            <Link to="/stitch-library">Stitch Library</Link>
            <Link to="/saved-patterns">Saved Patterns</Link>
          </>
        )}
      </div>

      {/* LOGOUT BUTTON (ONLY WHEN LOGGED IN) */}
      {isLoggedIn && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  )
}