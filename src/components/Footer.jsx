import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              Bransons<span>Kitchen</span>
            </Link>
            <p>
              Where culinary excellence meets luxury. An unforgettable fine dining 
              experience in the heart of Nairobi, blending African heritage with 
              world-class gastronomy.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">𝕏</a>
              <a href="#" className="footer__social-link" aria-label="Facebook">f</a>
              <a href="#" className="footer__social-link" aria-label="Instagram">◎</a>
              <a href="#" className="footer__social-link" aria-label="TikTok">♪</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">Navigate</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Main Dishes</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/catering">Catering</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="footer__heading">Hours</h4>
            <ul className="footer__hours">
              <li><span>Mon – Fri</span><span>11:00 AM – 10:00 PM</span></li>
              <li><span>Saturday</span><span>10:00 AM – 11:00 PM</span></li>
              <li><span>Sunday</span><span>10:00 AM – 9:00 PM</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer__heading">Newsletter</h4>
            <p className="footer__newsletter-text">
              Subscribe for exclusive dining events, seasonal menus, and special offers.
            </p>
            <form className="footer__newsletter-form" onSubmit={e => { e.preventDefault(); e.target.reset(); }}>
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Your email"
                required
                id="newsletter-email"
              />
              <button type="submit" className="footer__newsletter-btn" id="newsletter-submit">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Bransons Kitchen. All rights reserved. | Nairobi, Kenya
          </p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
