import { Link } from 'react-router-dom'
import home from '../assets/home.png'
import leaf from '../assets/leaf.png'
import book from '../assets/open-book.png'
import person from '../assets/person.png'
import yarn from '../assets/yarn-ball.png'

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <nav className="navbar">
      <div className="logo"><img src={yarn} alt="Sugar Stitch Yarn" className="logo-yarn"/>Sugar Stitch</div>

      <div className="nav-links">
        {/* ALWAYS visible */}
        <Link to="/" className="nav-link">
        <img src={home} alt="Sugar Stitch Home" className="nav-logo"/>
        Home
        </Link>

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <>
            <Link to="/eco-guide" className="nav-link">
            <img src={leaf} alt="Sugar Stitch Leaf" class="nav-logo"/>
            Eco Guide</Link>

            <Link to="/login" className="nav-link"><img src={person} alt="Sugar Stitch Login" className="nav-logo"/>Login</Link>
          </>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            <Link to="/account" className="nav-link">Account</Link>

            <Link to="/journal" className="nav-link">Journal</Link>

            <Link to="/achievements" className="nav-link">Achievements</Link>

            <Link to="/pattern-generator" className="nav-link">Pattern Generator</Link>

            <Link to="/stitch-library" className="nav-link">
            <img src={book} alt="Sugar Stitch Book" className="nav-logo"/>Stitch Library</Link>

            <Link to="/saved-patterns" className="nav-link">Saved Patterns</Link>
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