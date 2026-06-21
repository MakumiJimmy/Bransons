import { useState } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'
import './Catering.css'

const packages = [
  {
    name: 'Silver',
    price: 'From KES 3,500/guest',
    icon: '🥈',
    featured: false,
    features: ['3-course menu selection', 'Professional service staff', 'Table settings & linens', 'Setup & cleanup', 'Non-alcoholic beverages', 'Min. 30 guests'],
  },
  {
    name: 'Gold',
    price: 'From KES 6,500/guest',
    icon: '🥇',
    featured: true,
    features: ['5-course premium menu', 'Dedicated event coordinator', 'Premium table décor & florals', 'Full bar service included', 'Live cooking station', 'Custom menu options', 'Min. 20 guests'],
  },
  {
    name: 'Platinum',
    price: 'From KES 12,000/guest',
    icon: '💎',
    featured: false,
    features: ['7-course tasting menu', 'Private chef experience', 'Luxury décor & ambiance', 'Premium wine & spirits pairing', 'Entertainment coordination', 'Personalized menu creation', 'VIP concierge service', 'Min. 10 guests'],
  },
]

const services = [
  { title: 'Corporate Catering', desc: 'Elevate your business events with sophisticated dining that impresses clients and stakeholders.', icon: '🏢' },
  { title: 'Wedding Catering', desc: 'Create the wedding feast of your dreams with bespoke menus and flawless service.', icon: '💒' },
  { title: 'Private Parties', desc: 'From intimate dinners to grand celebrations, we bring the Bransons experience to you.', icon: '🎉' },
  { title: 'Outdoor Events', desc: 'Garden parties, rooftop soirées, and outdoor galas with premium on-site catering.', icon: '🌿' },
]

export default function Catering() {
  const revealRef = useScrollReveal()
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 4000)
  }

  return (
    <div ref={revealRef}>
      {/* ── Page Hero ── */}
      <section className="page-hero" id="catering-hero">
        <div className="page-hero__bg"><img src="/images/dish-seafood.png" alt="Catering" /></div>
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <span className="text-label reveal">Catering Services</span>
          <h1 className="reveal delay-1" style={{ fontSize: 'var(--fs-h1)' }}>Bransons, Delivered</h1>
          <p className="reveal delay-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-text-secondary)', maxWidth: 600, margin: 'var(--space-sm) auto 0' }}>
            Bring the luxury of Bransons Kitchen to any venue with our world-class catering service
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" id="catering-services">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">What We Offer</span>
            <h2 className="section-header__title">Catering Services</h2>
          </div>
          <div className="catering-services-grid">
            {services.map((s, i) => (
              <div className={`catering-service-card reveal delay-${i + 1}`} key={i}>
                <div className="catering-service-card__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="section reservation-section" id="catering-packages">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Packages</span>
            <h2 className="section-header__title">Choose Your Experience</h2>
            <p className="section-header__subtitle">Three tiers of luxury, each crafted to deliver an exceptional dining experience</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div className={`package-card ${pkg.featured ? 'package-card--featured' : ''} reveal delay-${i + 1}`} key={i}>
                <div className="package-card__icon">{pkg.icon}</div>
                <h3 className="package-card__name">{pkg.name}</h3>
                <div className="package-card__price">{pkg.price}</div>
                <ul className="package-card__features">
                  {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
                </ul>
                <button className={`btn ${pkg.featured ? 'btn--primary' : 'btn--outline'}`} style={{ width: '100%' }}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Gallery ── */}
      <section className="section" id="catering-gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Portfolio</span>
            <h2 className="section-header__title">Our Catering in Action</h2>
          </div>
          <div className="catering-gallery-grid">
            <div className="catering-gallery-item reveal delay-1"><img src="/images/hero.png" alt="Catering setup" loading="lazy" /></div>
            <div className="catering-gallery-item reveal delay-2"><img src="/images/dish-steak.png" alt="Catered dish" loading="lazy" /></div>
            <div className="catering-gallery-item reveal delay-3"><img src="/images/about.png" alt="Event catering" loading="lazy" /></div>
            <div className="catering-gallery-item reveal delay-4"><img src="/images/gallery-bar.png" alt="Bar service" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section className="section reservation-section" id="catering-inquiry">
        <div className="container container--narrow">
          <div className="section-header reveal">
            <span className="section-header__label">Get Started</span>
            <h2 className="section-header__title">Request a Quote</h2>
          </div>

          {formStatus === 'success' ? (
            <div className="reservation-form form-success-container reveal">
              <div className="form-success show">
                <div className="form-success__icon">✓</div>
                <h3 className="form-success__title">Request Received</h3>
                <p className="form-success__text">Our catering coordinator will contact you within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form className="reservation-form reveal" onSubmit={handleSubmit} id="catering-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-group__label">Full Name</label>
                  <input type="text" className="form-group__input" placeholder="Your name" required id="cat-name" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Email</label>
                  <input type="email" className="form-group__input" placeholder="email@example.com" required id="cat-email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-group__label">Event Date</label>
                  <input type="date" className="form-group__input" required id="cat-date" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Number of Guests</label>
                  <input type="number" className="form-group__input" placeholder="Estimated guests" min="10" required id="cat-guests" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-group__label">Preferred Package</label>
                <select className="form-group__select" id="cat-package">
                  <option value="">Select package</option>
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-group__label">Additional Details</label>
                <textarea className="form-group__textarea" placeholder="Venue details, dietary requirements, special requests..." rows="4" id="cat-details" />
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-sm)' }} id="cat-submit">Request Quote</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
