import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <img className="flower-one" src="/images/flower.png"/>
      <img className="flower-two" src="/images/flower2.png"/>
      <img className="flower-three" src="/images/flower3.png"/>
     
      <div className="footer-brand">
        <h2>Sugar Stitch</h2>
        <p>Crochet made simple, sustainable, and sweet.</p>
        <h3 className='social-banner'>Follow Us on Socials!</h3>
      </div>
      <div className="footer-socials">
        <a href="https://www.instagram.com/">
        <img src="/images/instagram.png" alt='Instagram Logo' className='Social-logo'/></a>

        <a href="https://x.com/">
        <img src='/images/twitter.png' alt='Twitter Logo' className='Social-logo'/></a>

        < a href="https://ca.pinterest.com/">
        <img src='/images/pinterest-logo.png' alt='Pinterest Logo' className='Social-logo'/></a>
      </div>
    <div className="footer-second-half">
      <div className="footer-links">
        <h3>Explore</h3>
        <div className="footer-link-list">
          <Link to="/">Home</Link>
          <Link to="/eco-guide">Eco Guide</Link>
          <Link to="/pattern-generator">Pattern Generator</Link>
          <Link to="/saved-patterns">Saved Patterns</Link>
          <Link to="/achievements">Achievements</Link>
          <Link to="/journal">Journal</Link>
        </div>
      </div>

      <div className="footer-extra">
        <h3>Our Promise</h3>
        <p>
          We support creativity, beginner-friendly learning, and more thoughtful
          crochet choices for a happier planet.
        </p>
     
        </div>
        </div>
        <div className="footer-bottom">
        <p>© 2026 Sugar Stitch. Made with love and yarn.</p>
      
      </div>
    </footer>
  )
}