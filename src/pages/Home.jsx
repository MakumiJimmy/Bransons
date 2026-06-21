import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useAnimations'
import './Home.css'

/* ─── Particles Component ─── */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 8}s`,
      size: `${1 + Math.random() * 2}px`,
    })), [])

  return (
    <div className="particles">
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Signature Dishes Data ─── */
const signatureDishes = [
  { name: 'Gold-Leaf Wagyu Tenderloin', desc: 'Prime wagyu with 24k gold leaf, truffle jus & roasted bone marrow', price: 'KES 8,500', img: '/images/dish-steak.png' },
  { name: 'Swahili-Spiced Lobster Tail', desc: 'Indian Ocean lobster with coconut-lime beurre blanc & saffron risotto', price: 'KES 7,200', img: '/images/dish-seafood.png' },
  { name: 'Dark Chocolate Sphere Royale', desc: 'Valrhona chocolate sphere, raspberry coulis, edible gold & vanilla crème', price: 'KES 3,800', img: '/images/dish-dessert.png' },
  { name: 'Nyama Choma Reimagined', desc: 'Slow-roasted prime rib with smoked paprika glaze & heritage grain pilaf', price: 'KES 6,500', img: '/images/dish-steak.png' },
  { name: 'Mombasa Prawn Tempura', desc: 'Tiger prawns in light tempura, yuzu aioli & pickled daikon salad', price: 'KES 5,800', img: '/images/dish-seafood.png' },
  { name: 'Passion Fruit Crème Brûlée', desc: 'Tropical passion fruit custard, caramelized sugar crust & mint', price: 'KES 2,800', img: '/images/dish-dessert.png' },
]

/* ─── Stats Data ─── */
const stats = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '200+', label: 'Curated Dishes' },
  { number: '50K+', label: 'Happy Guests' },
  { number: '25+', label: 'Expert Chefs' },
]

/* ─── Testimonials ─── */
const testimonials = [
  { text: 'An extraordinary dining experience. Every dish was a masterpiece of flavour and artistry. Bransons Kitchen has set a new standard for fine dining in Nairobi.', author: 'James Mwangi', stars: 5 },
  { text: 'The ambiance, the service, the food — everything was absolutely impeccable. This is without doubt the finest restaurant in East Africa.', author: 'Sarah Ochieng', stars: 5 },
  { text: 'From the moment we walked in, we felt like royalty. The tasting menu is a journey through flavours you never knew existed. Spectacular.', author: 'David Kimani', stars: 5 },
]

/* ─── Home Page ─── */
export default function Home() {
  const revealRef = useScrollReveal()
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [formStatus, setFormStatus] = useState('idle')
  const slidesPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3

  const maxIdx = Math.max(0, signatureDishes.length - slidesPerView)

  const nextSlide = () => setCarouselIdx(i => Math.min(i + 1, maxIdx))
  const prevSlide = () => setCarouselIdx(i => Math.max(i - 1, 0))

  const handleReservation = (e) => {
    e.preventDefault()
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 4000)
  }

  return (
    <div ref={revealRef}>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <img src="/images/hero.png" alt="Bransons Kitchen luxury interior" />
        </div>
        <div className="hero__overlay" />
        <Particles />

        <div className="hero__content">
          <span className="hero__label" style={{ animation: 'heroReveal 1.2s var(--ease-out) 0.2s both' }}>
            ★ Fine Dining — Nairobi, Kenya ★
          </span>
          <h1 className="hero__title" style={{ animation: 'heroReveal 1.2s var(--ease-out) 0.4s both' }}>
            Where Culinary <em className="accent">Excellence</em> Meets Luxury
          </h1>
          <p className="hero__subtitle" style={{ animation: 'heroReveal 1.2s var(--ease-out) 0.7s both' }}>
            An unforgettable gastronomic journey, blending African heritage with world-class fine dining artistry
          </p>
          <div className="hero__buttons" style={{ animation: 'heroReveal 1.2s var(--ease-out) 1s both' }}>
            <Link to="/about#reservation" className="btn btn--primary" id="hero-reserve-btn">Reserve a Table</Link>
            <Link to="/menu" className="btn btn--outline" id="hero-menu-btn">Explore Menu</Link>
          </div>
        </div>

        <div className="hero__scroll" style={{ animation: 'heroReveal 1.2s var(--ease-out) 1.3s both' }}>
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-icon" />
        </div>
      </section>

      {/* ═══════════ ABOUT PREVIEW ═══════════ */}
      <section className="section" id="about-section">
        <div className="container">
          <div className="about-preview">
            <div className="about-preview__image reveal-left">
              <img src="/images/about.png" alt="Bransons Kitchen elegant interior" />
            </div>
            <div className="about-preview__content reveal-right">
              <span className="text-label">Our Story</span>
              <h2>A Culinary Journey Like No Other</h2>
              <div className="divider" />
              <p>
                Nestled in the heart of Nairobi, Bransons Kitchen is more than a restaurant — 
                it is a destination. Our world-class chefs craft each dish as a work of art, 
                drawing from the rich tapestry of African culinary heritage while embracing 
                the precision and elegance of international fine dining.
              </p>
              <p>
                Every ingredient is sourced with intention, every plate composed with passion, 
                and every moment curated to deliver an experience that transcends the ordinary.
              </p>
              <Link to="/about" className="btn btn--outline" id="about-learn-more">Discover More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SIGNATURE DISHES CAROUSEL ═══════════ */}
      <section className="section carousel-section" id="signature-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Chef's Selection</span>
            <h2 className="section-header__title">Signature Creations</h2>
            <p className="section-header__subtitle">
              Exquisite dishes crafted by our master chefs, each telling a unique story of flavour and artistry
            </p>
          </div>

          <div className="carousel reveal">
            <div
              className="carousel__track"
              style={{ transform: `translateX(-${carouselIdx * (100 / slidesPerView)}%)` }}
            >
              {signatureDishes.map((dish, i) => (
                <div className="carousel__slide" key={i}>
                  <img src={dish.img} alt={dish.name} loading="lazy" />
                  <div className="carousel__slide-overlay">
                    <h3 className="carousel__slide-name">{dish.name}</h3>
                    <p className="carousel__slide-desc">{dish.desc}</p>
                    <span className="carousel__slide-price">{dish.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel__controls">
              <button className="carousel__btn" onClick={prevSlide} aria-label="Previous" id="carousel-prev">‹</button>
              <div className="carousel__dots">
                {Array.from({ length: maxIdx + 1 }, (_, i) => (
                  <button key={i} className={`carousel__dot ${i === carouselIdx ? 'active' : ''}`} onClick={() => setCarouselIdx(i)} />
                ))}
              </div>
              <button className="carousel__btn" onClick={nextSlide} aria-label="Next" id="carousel-next">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="section" id="stats-section">
        <div className="container">
          <div className="stats reveal">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat__number shimmer-text">{s.number}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="section" id="gallery-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Gallery</span>
            <h2 className="section-header__title">A Feast for the Eyes</h2>
            <p className="section-header__subtitle">
              Glimpses into the world of Bransons Kitchen — from our stunning interiors to exquisite plating
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-grid__item gallery-grid__item--wide reveal delay-1">
              <img src="/images/hero.png" alt="Restaurant ambiance" loading="lazy" />
            </div>
            <div className="gallery-grid__item reveal delay-2">
              <img src="/images/dish-steak.png" alt="Wagyu steak" loading="lazy" />
            </div>
            <div className="gallery-grid__item reveal delay-3">
              <img src="/images/about.png" alt="Dining atmosphere" loading="lazy" />
            </div>
            <div className="gallery-grid__item reveal delay-4">
              <img src="/images/dish-dessert.png" alt="Dessert plating" loading="lazy" />
            </div>
            <div className="gallery-grid__item gallery-grid__item--wide reveal delay-5">
              <img src="/images/gallery-bar.png" alt="Bar area" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section" id="testimonials-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Testimonials</span>
            <h2 className="section-header__title">What Our Guests Say</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`testimonial-card reveal delay-${i + 1}`} key={i}>
                <div className="testimonial-card__quote-icon">"</div>
                <div className="testimonial-card__stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-card__text">{t.text}</p>
                <p className="testimonial-card__author">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ RESERVATION PREVIEW ═══════════ */}
      <section className="section reservation-section" id="reservation-section">
        <div className="container">
          <div className="reservation-grid">
            <div className="reservation-info reveal-left">
              <span className="text-label">Reservations</span>
              <h2>Reserve Your Experience</h2>
              <div className="divider" />
              <p>
                Secure your table at Bransons Kitchen and prepare for an evening of culinary excellence. 
                For special occasions or large parties, please contact us directly.
              </p>
              <ul className="reservation-info__hours">
                <li><span>Monday – Friday</span><span>11:00 AM – 10:00 PM</span></li>
                <li><span>Saturday</span><span>10:00 AM – 11:00 PM</span></li>
                <li><span>Sunday</span><span>10:00 AM – 9:00 PM</span></li>
              </ul>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-small)' }}>
                  📞 +254 720 885 835 &nbsp;|&nbsp; +254 706 081 110
                </p>
              </div>
            </div>

            <div className="reveal-right">
              {formStatus === 'success' ? (
                <div className="reservation-form form-success-container">
                  <div className="form-success show">
                    <div className="form-success__icon">✓</div>
                    <h3 className="form-success__title">Reservation Confirmed</h3>
                    <p className="form-success__text">We look forward to welcoming you. A confirmation will be sent to your email.</p>
                  </div>
                </div>
              ) : (
                <form className="reservation-form" onSubmit={handleReservation} id="reservation-form">
                  <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-md)', color: 'var(--color-white)' }}>
                    Book a Table
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-group__label">Full Name</label>
                      <input type="text" className="form-group__input" placeholder="Your name" required id="res-name" />
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Email</label>
                      <input type="email" className="form-group__input" placeholder="email@example.com" required id="res-email" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-group__label">Phone</label>
                      <input type="tel" className="form-group__input" placeholder="+254..." required id="res-phone" />
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Guests</label>
                      <select className="form-group__select" required id="res-guests">
                        <option value="">Select</option>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                        <option value="9+">9+ Guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-group__label">Date</label>
                      <input type="date" className="form-group__input" required id="res-date" />
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Time</label>
                      <select className="form-group__select" required id="res-time">
                        <option value="">Select</option>
                        {['11:00 AM','12:00 PM','1:00 PM','2:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-group__label">Special Requests</label>
                    <textarea className="form-group__textarea" placeholder="Dietary requirements, celebrations, seating preferences..." rows="3" id="res-requests" />
                  </div>
                  <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-sm)' }} id="res-submit">
                    Confirm Reservation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT PREVIEW ═══════════ */}
      <section className="section" id="contact-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Find Us</span>
            <h2 className="section-header__title">Visit Bransons Kitchen</h2>
          </div>

          <div className="contact-grid">
            <div className="reveal-left">
              <div className="contact-card">
                <div className="contact-card__icon">📍</div>
                <div className="contact-card__content">
                  <h4>Location</h4>
                  <p>YWCA, Mamlaka Road<br />Nairobi, Kenya</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card__icon">📞</div>
                <div className="contact-card__content">
                  <h4>Phone</h4>
                  <p><a href="tel:+25420885835">+254 20 885 835</a></p>
                  <p><a href="tel:+254706081110">+254 706 081 110</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card__icon">✉</div>
                <div className="contact-card__content">
                  <h4>Email</h4>
                  <p><a href="mailto:bransonskitchen@gmail.com">bransonskitchen@gmail.com</a></p>
                </div>
              </div>
            </div>

            <div className="contact-map reveal-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819!2d36.8127!3d-1.2775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17366d0e4d3f%3A0x7c5d7e0e8e0e0e0e!2sYWCA%2C%20Mamlaka%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                title="Bransons Kitchen Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
