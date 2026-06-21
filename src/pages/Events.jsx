import { useState } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'
import './Events.css'

const eventTypes = [
  { title: 'Corporate Events', desc: 'Impress clients and colleagues with sophisticated corporate dining, product launches, and executive retreats in our elegant private spaces.', icon: '🏢' },
  { title: 'Weddings', desc: 'Celebrate your special day with an exquisite reception. Our team creates bespoke wedding dining experiences that are truly unforgettable.', icon: '💍' },
  { title: 'Birthday Celebrations', desc: 'Mark milestones with a private dining experience tailored to your vision — from intimate gatherings to grand celebrations.', icon: '🎂' },
  { title: 'Anniversary Dinners', desc: 'Rekindle romance with a curated multi-course dinner, personally crafted by our head chef for your special evening.', icon: '🥂' },
  { title: 'VIP Private Dining', desc: 'Our exclusive private dining room offers the ultimate luxury experience with personalized menus and dedicated service.', icon: '⭐' },
  { title: 'Cocktail Receptions', desc: 'Elegant cocktail evenings with artisanal drinks, premium canapés and live entertainment in a refined atmosphere.', icon: '🍸' },
]

const testimonials = [
  { text: 'Our corporate gala at Bransons was spectacular. The team handled every detail with precision and elegance. Our guests are still talking about it.', author: 'Wanjiku Muturi, CEO, Savanna Corp' },
  { text: 'The most beautiful wedding reception we could have imagined. The food, the décor, the service — absolutely world-class.', author: 'Grace & Michael Otieno' },
  { text: 'We\'ve hosted three events here now. Each time, Bransons exceeds our expectations. The private dining experience is unmatched in Nairobi.', author: 'Patrick Njoroge, Events Director' },
]

export default function Events() {
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
      <section className="page-hero" id="events-hero">
        <div className="page-hero__bg"><img src="/images/gallery-bar.png" alt="Events at Bransons Kitchen" /></div>
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <span className="text-label reveal">Events & Private Dining</span>
          <h1 className="reveal delay-1" style={{ fontSize: 'var(--fs-h1)' }}>Unforgettable Gatherings</h1>
          <p className="reveal delay-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-text-secondary)', maxWidth: 600, margin: 'var(--space-sm) auto 0' }}>
            Transform your special occasions into extraordinary memories at Bransons Kitchen
          </p>
        </div>
      </section>

      {/* ── Event Types ── */}
      <section className="section" id="event-types">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Our Services</span>
            <h2 className="section-header__title">Events We Host</h2>
          </div>

          <div className="events-grid">
            {eventTypes.map((event, i) => (
              <div className={`event-type-card reveal delay-${(i % 3) + 1}`} key={i}>
                <div className="event-type-card__icon">{event.icon}</div>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section" id="events-gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Gallery</span>
            <h2 className="section-header__title">Past Events</h2>
          </div>
          <div className="events-gallery-grid">
            <div className="events-gallery-item reveal delay-1"><img src="/images/hero.png" alt="Corporate event" loading="lazy" /><div className="events-gallery-item__label">Corporate Gala</div></div>
            <div className="events-gallery-item reveal delay-2"><img src="/images/about.png" alt="Wedding reception" loading="lazy" /><div className="events-gallery-item__label">Wedding Reception</div></div>
            <div className="events-gallery-item reveal delay-3"><img src="/images/gallery-bar.png" alt="Cocktail evening" loading="lazy" /><div className="events-gallery-item__label">Cocktail Evening</div></div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" id="event-testimonials">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Testimonials</span>
            <h2 className="section-header__title">What Hosts Say</h2>
          </div>
          <div className="event-testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`testimonial-card reveal delay-${i + 1}`} key={i}>
                <div className="testimonial-card__quote-icon">"</div>
                <p className="testimonial-card__text">{t.text}</p>
                <p className="testimonial-card__author">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Event Inquiry Form ── */}
      <section className="section reservation-section" id="event-inquiry">
        <div className="container container--narrow">
          <div className="section-header reveal">
            <span className="section-header__label">Get in Touch</span>
            <h2 className="section-header__title">Plan Your Event</h2>
            <p className="section-header__subtitle">Tell us about your vision and we'll craft a bespoke event experience</p>
          </div>

          {formStatus === 'success' ? (
            <div className="reservation-form form-success-container reveal">
              <div className="form-success show">
                <div className="form-success__icon">✓</div>
                <h3 className="form-success__title">Inquiry Received</h3>
                <p className="form-success__text">Our events team will contact you within 24 hours to discuss your event.</p>
              </div>
            </div>
          ) : (
            <form className="reservation-form reveal" onSubmit={handleSubmit} id="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-group__label">Full Name</label>
                  <input type="text" className="form-group__input" placeholder="Your name" required id="event-name" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Email</label>
                  <input type="email" className="form-group__input" placeholder="email@example.com" required id="event-email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-group__label">Phone</label>
                  <input type="tel" className="form-group__input" placeholder="+254..." required id="event-phone" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Event Type</label>
                  <select className="form-group__select" required id="event-type-select">
                    <option value="">Select event type</option>
                    {eventTypes.map(e => <option key={e.title} value={e.title}>{e.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-group__label">Preferred Date</label>
                  <input type="date" className="form-group__input" required id="event-date" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Number of Guests</label>
                  <input type="number" className="form-group__input" placeholder="Estimated guests" min="1" required id="event-guests" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-group__label">Event Details</label>
                <textarea className="form-group__textarea" placeholder="Tell us about your event vision, special requirements, budget range..." rows="4" id="event-details" />
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-sm)' }} id="event-submit">Submit Inquiry</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
