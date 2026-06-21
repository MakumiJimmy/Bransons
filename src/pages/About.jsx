import { useState } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'
import './About.css'

const timeline = [
  { year: '2009', title: 'The Beginning', desc: 'Bransons Kitchen opens its doors on Mamlaka Road, Nairobi, with a vision to redefine fine dining in East Africa.' },
  { year: '2012', title: 'First Recognition', desc: 'Named among Nairobi\'s Top 10 Restaurants, establishing our reputation for culinary excellence and exceptional service.' },
  { year: '2015', title: 'Menu Evolution', desc: 'Launch of our signature African-fusion tasting menu, blending traditional Kenyan flavours with international fine dining techniques.' },
  { year: '2018', title: 'Catering Launch', desc: 'Expansion into luxury catering services, bringing the Bransons experience to private events, corporate galas, and weddings.' },
  { year: '2021', title: 'Renovation', desc: 'Complete restaurant redesign with modern luxury interiors, private dining rooms, and an expanded kitchen with world-class equipment.' },
  { year: '2024', title: 'Today', desc: 'Continuing our pursuit of culinary perfection, serving thousands of guests annually and setting the standard for luxury dining in Kenya.' },
]

const values = [
  { icon: '🌿', title: 'Premium Ingredients', desc: 'We source the finest local and international ingredients, from Kenyan highlands produce to Japanese wagyu beef.' },
  { icon: '⭐', title: 'Exceptional Service', desc: 'Every guest is treated like royalty. Our staff is trained to anticipate needs and deliver flawless hospitality.' },
  { icon: '🍽️', title: 'Fine Dining Experience', desc: 'Each dish is composed with artistic precision, offering a multi-sensory journey of flavour, texture, and presentation.' },
  { icon: '✨', title: 'Elegant Atmosphere', desc: 'Our meticulously designed space creates an atmosphere of refined sophistication and intimate luxury.' },
  { icon: '👨‍🍳', title: 'Professional Chefs', desc: 'Our culinary team brings decades of combined experience from the world\'s most prestigious kitchens.' },
  { icon: '🤝', title: 'Community', desc: 'We are committed to supporting local farmers, sustainable sourcing, and giving back to the Nairobi community.' },
]

export default function About() {
  const revealRef = useScrollReveal()
  const [formStatus, setFormStatus] = useState('idle')

  const handleReservation = (e) => {
    e.preventDefault()
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 4000)
  }

  return (
    <div ref={revealRef}>
      {/* ── Page Hero ── */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg"><img src="/images/about.png" alt="About Bransons Kitchen" /></div>
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <span className="text-label reveal">Our Story</span>
          <h1 className="reveal delay-1" style={{ fontSize: 'var(--fs-h1)' }}>The Bransons Journey</h1>
          <p className="reveal delay-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-text-secondary)', maxWidth: 600, margin: 'var(--space-sm) auto 0' }}>
            Fifteen years of culinary passion, uncompromising quality, and unforgettable experiences
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section" id="our-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image reveal-left">
              <img src="/images/hero.png" alt="Bransons Kitchen interior" />
            </div>
            <div className="story-content reveal-right">
              <span className="text-label">Our Philosophy</span>
              <h2>More Than a Restaurant</h2>
              <div className="divider" />
              <p>
                Bransons Kitchen was born from a single, powerful belief: that dining should be 
                an experience that nourishes not just the body, but the soul. Founded in 2009 in 
                the vibrant heart of Nairobi, we set out to create a space where world-class 
                culinary artistry meets the warmth and richness of African hospitality.
              </p>
              <p>
                Our chefs draw inspiration from Kenya's incredible natural bounty — the freshest 
                produce from highland farms, the finest seafood from the Indian Ocean coast, and 
                the bold, complex spice traditions of Swahili cuisine — all elevated through the 
                lens of international fine dining technique.
              </p>
              <p>
                Today, Bransons Kitchen stands as a testament to our unwavering commitment to 
                excellence. Every detail, from the artistry on each plate to the warmth of our 
                service, is crafted to create moments that linger long after the last course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section reservation-section" id="timeline">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Our Journey</span>
            <h2 className="section-header__title">Milestones</h2>
          </div>

          <div className="timeline">
            <div className="timeline__line" />
            {timeline.map((item, i) => (
              <div className={`timeline__item ${i % 2 === 0 ? '' : 'timeline__item--right'} reveal delay-${(i % 3) + 1}`} key={i}>
                <div className="timeline__year">{item.year}</div>
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section" id="why-us">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Why Bransons</span>
            <h2 className="section-header__title">The Bransons Difference</h2>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div className={`value-card reveal delay-${(i % 3) + 1}`} key={i}>
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservation ── */}
      <section className="section reservation-section" id="reservation">
        <div className="container">
          <div className="reservation-layout">
            <div className="reservation-info-col reveal-left">
              <span className="text-label">Reservations</span>
              <h2>Reserve Your Table</h2>
              <div className="divider" />
              <p>Experience the luxury of Bransons Kitchen. Book your table today and let us create an unforgettable evening for you.</p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="contact-info-icon">📍</span>
                  <div><strong>Location</strong><br />YWCA, Mamlaka Road, Nairobi, Kenya</div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📞</span>
                  <div><strong>Phone</strong><br /><a href="tel:+254720885835">+254 720 885 835</a><br /><a href="tel:+254706081110">+254 706 081 110</a></div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">✉</span>
                  <div><strong>Email</strong><br /><a href="mailto:bransonskitchen@gmail.com">bransonskitchen@gmail.com</a></div>
                </div>
              </div>

              <div className="hours-list">
                <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-small)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)' }}>Opening Hours</h4>
                <div className="hours-row"><span>Monday – Friday</span><span>11:00 AM – 10:00 PM</span></div>
                <div className="hours-row"><span>Saturday</span><span>10:00 AM – 11:00 PM</span></div>
                <div className="hours-row"><span>Sunday</span><span>10:00 AM – 9:00 PM</span></div>
              </div>
            </div>

            <div className="reveal-right">
              {formStatus === 'success' ? (
                <div className="reservation-form form-success-container">
                  <div className="form-success show">
                    <div className="form-success__icon">✓</div>
                    <h3 className="form-success__title">Reservation Confirmed</h3>
                    <p className="form-success__text">We look forward to welcoming you. A confirmation will be sent shortly.</p>
                  </div>
                </div>
              ) : (
                <form className="reservation-form" onSubmit={handleReservation} id="about-reservation-form">
                  <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-md)', color: 'var(--color-white)' }}>Book a Table</h3>
                  <div className="form-row">
                    <div className="form-group"><label className="form-group__label">Full Name</label><input type="text" className="form-group__input" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-group__label">Email</label><input type="email" className="form-group__input" placeholder="email@example.com" required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-group__label">Phone</label><input type="tel" className="form-group__input" placeholder="+254..." required /></div>
                    <div className="form-group"><label className="form-group__label">Guests</label>
                      <select className="form-group__select" required>
                        <option value="">Select</option>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                        <option value="9+">9+ Guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-group__label">Date</label><input type="date" className="form-group__input" required /></div>
                    <div className="form-group"><label className="form-group__label">Time</label>
                      <select className="form-group__select" required>
                        <option value="">Select</option>
                        {['11:00 AM','12:00 PM','1:00 PM','2:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-group__label">Special Requests</label><textarea className="form-group__textarea" placeholder="Dietary requirements, celebrations..." rows="3" /></div>
                  <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-sm)' }}>Confirm Reservation</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="section" id="location-map">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Find Us</span>
            <h2 className="section-header__title">Our Location</h2>
          </div>
          <div className="map-container reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819!2d36.8127!3d-1.2775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17366d0e4d3f%3A0x7c5d7e0e8e0e0e0e!2sYWCA%2C%20Mamlaka%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
              title="Bransons Kitchen Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
