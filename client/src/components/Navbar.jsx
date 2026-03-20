import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
       <nav className="navbar">
        <div className="logo">Sugar Stitch</div>

        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/mission">Our Mission</Link>
            <Link to="/login">Login</Link>


            <Link to="/account">Account</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/pattern-generator">Pattern Generator</Link>
            <Link to="/stitch-library">Stitch Library</Link>
            <Link to="/saved-patterns">Saved Patterns</Link>
        </div>

        <button 
            onClick={() => {
            localStorage.clear()
             window.location.href = '/login'
            }}
        >
  Logout
</button>
       </nav>
    )
}