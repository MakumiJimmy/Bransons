import { useState } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'
import './Menu.css'

const categories = ['All', 'Starters', 'Main Courses', 'Seafood', 'Grills', 'Desserts', 'Beverages']

const menuItems = [
  // Starters
  { name: 'Truffle Burrata', desc: 'Creamy burrata with black truffle oil, heirloom tomatoes & micro basil', price: 'KES 2,200', category: 'Starters', special: false },
  { name: 'Seared Foie Gras', desc: 'Pan-seared duck foie gras with caramelized figs & port wine reduction', price: 'KES 3,800', category: 'Starters', special: false },
  { name: 'Nairobi Ceviche', desc: 'Fresh tilapia ceviche with lime, avocado, chili & crispy plantain', price: 'KES 2,400', category: 'Starters', special: false },
  { name: 'Wagyu Tartare', desc: 'Hand-cut wagyu beef tartare, quail egg yolk, truffle & sourdough crisps', price: 'KES 3,200', category: 'Starters', special: true },
  // Main Courses
  { name: 'Gold-Leaf Wagyu Tenderloin', desc: 'Prime wagyu with 24k gold leaf, truffle jus & roasted bone marrow', price: 'KES 8,500', category: 'Main Courses', special: true, img: '/images/dish-steak.png' },
  { name: 'Nyama Choma Reimagined', desc: 'Slow-roasted prime rib with smoked paprika glaze & heritage grain pilaf', price: 'KES 6,500', category: 'Main Courses', special: true },
  { name: 'Duck Confit à l\'Orange', desc: 'Crispy duck confit, blood orange gastrique, dauphinoise potatoes', price: 'KES 5,800', category: 'Main Courses', special: false },
  { name: 'Lamb Rack Provençal', desc: 'Herb-crusted lamb rack, ratatouille, rosemary jus & potato fondant', price: 'KES 7,200', category: 'Main Courses', special: false },
  // Seafood
  { name: 'Swahili-Spiced Lobster', desc: 'Indian Ocean lobster with coconut-lime beurre blanc & saffron risotto', price: 'KES 7,200', category: 'Seafood', special: true, img: '/images/dish-seafood.png' },
  { name: 'Mombasa Prawn Tempura', desc: 'Tiger prawns in light tempura, yuzu aioli & pickled daikon salad', price: 'KES 5,800', category: 'Seafood', special: false },
  { name: 'Pan-Seared Sea Bass', desc: 'Wild sea bass, lemon beurre blanc, asparagus & crushed new potatoes', price: 'KES 5,200', category: 'Seafood', special: false },
  { name: 'Tuna Tataki', desc: 'Seared yellowfin tuna, sesame crust, wasabi cream & ponzu dressing', price: 'KES 4,800', category: 'Seafood', special: false },
  // Grills
  { name: 'Tomahawk Ribeye', desc: '1.2kg bone-in ribeye, chargrilled, chimichurri & roasted garlic butter', price: 'KES 9,800', category: 'Grills', special: true },
  { name: 'Chargrilled Veal Chop', desc: 'Premium veal chop, sage butter, grilled vegetables & truffle fries', price: 'KES 7,500', category: 'Grills', special: false },
  { name: 'Bransons Burger', desc: 'Wagyu beef patty, aged cheddar, caramelized onions & brioche bun', price: 'KES 3,500', category: 'Grills', special: false },
  // Desserts
  { name: 'Dark Chocolate Sphere Royale', desc: 'Valrhona chocolate sphere, raspberry coulis, edible gold & vanilla crème', price: 'KES 3,800', category: 'Desserts', special: true, img: '/images/dish-dessert.png' },
  { name: 'Passion Fruit Crème Brûlée', desc: 'Tropical passion fruit custard, caramelized sugar crust & fresh mint', price: 'KES 2,800', category: 'Desserts', special: false },
  { name: 'Tiramisu Classico', desc: 'Classic Italian tiramisu, mascarpone, espresso-soaked ladyfingers', price: 'KES 2,500', category: 'Desserts', special: false },
  { name: 'Mango Panna Cotta', desc: 'Silky vanilla panna cotta, Kenyan mango coulis & tuile biscuit', price: 'KES 2,200', category: 'Desserts', special: false },
  // Beverages
  { name: 'Signature Gold Martini', desc: 'Premium vodka, elderflower, gold flakes & champagne float', price: 'KES 1,800', category: 'Beverages', special: true },
  { name: 'Kenyan Coffee Flight', desc: 'Three single-origin Kenyan coffees, artisanally roasted', price: 'KES 1,200', category: 'Beverages', special: false },
  { name: 'Rose & Hibiscus Spritz', desc: 'Hibiscus tea, rose water, prosecco & edible flowers', price: 'KES 1,500', category: 'Beverages', special: false },
  { name: 'Aged Scotch Selection', desc: 'Curated 18-year single malt with dark chocolate pairing', price: 'KES 3,500', category: 'Beverages', special: false },
]

export default function Menu() {
  const revealRef = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState('All')
  const [modalDish, setModalDish] = useState(null)

  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter(i => i.category === activeCategory)
  const specialDishes = menuItems.filter(i => i.special)

  return (
    <div ref={revealRef}>
      {/* ── Page Hero ── */}
      <section className="page-hero" id="menu-hero">
        <div className="page-hero__bg"><img src="/images/dish-steak.png" alt="Fine dining" /></div>
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <span className="text-label reveal">The Menu</span>
          <h1 className="reveal delay-1" style={{ fontSize: 'var(--fs-h1)' }}>Main Dishes</h1>
          <p className="reveal delay-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 'var(--lh-relaxed)', marginTop: 'var(--space-sm)' }}>
            A curated collection of culinary masterpieces, crafted with the finest ingredients from around the world
          </p>
        </div>
      </section>

      {/* ── Special Dishes ── */}
      <section className="section" id="special-dishes">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">★ Chef's Signature ★</span>
            <h2 className="section-header__title">Special Dishes</h2>
            <p className="section-header__subtitle">Our most celebrated creations — dishes that define the Bransons Kitchen experience</p>
          </div>

          <div className="special-grid">
            {specialDishes.map((dish, i) => (
              <div className={`special-card reveal delay-${(i % 4) + 1}`} key={i} onClick={() => setModalDish(dish)}>
                {dish.img && (
                  <div className="special-card__image">
                    <img src={dish.img} alt={dish.name} loading="lazy" />
                  </div>
                )}
                <div className="special-card__content">
                  <span className="special-card__badge">Chef's Special</span>
                  <h3>{dish.name}</h3>
                  <p>{dish.desc}</p>
                  <span className="special-card__price">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Menu ── */}
      <section className="section" id="full-menu">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-header__label">Full Menu</span>
            <h2 className="section-header__title">Our Complete Selection</h2>
          </div>

          <div className="tabs reveal">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filtered.map((item, i) => (
              <div
                className={`menu-card reveal delay-${(i % 4) + 1}`}
                key={`${item.name}-${i}`}
                onClick={() => setModalDish(item)}
              >
                <div className="menu-card__info">
                  <div className="menu-card__name">
                    {item.special && <span className="menu-card__special-dot" />}
                    {item.name}
                  </div>
                  <div className="menu-card__desc">{item.desc}</div>
                  <div className="menu-card__category">{item.category}</div>
                </div>
                <div className="menu-card__price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dish Modal ── */}
      {modalDish && (
        <div className="dish-modal open" onClick={() => setModalDish(null)} id="dish-modal">
          <button className="dish-modal__close" onClick={() => setModalDish(null)}>✕</button>
          <div className="dish-modal__content" onClick={e => e.stopPropagation()}>
            {modalDish.img && (
              <div className="dish-modal__image">
                <img src={modalDish.img} alt={modalDish.name} />
              </div>
            )}
            <div className="dish-modal__body">
              {modalDish.special && <span className="special-card__badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Chef's Special</span>}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', marginBottom: '0.5rem' }}>{modalDish.name}</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)', marginBottom: '1.5rem', fontSize: 'var(--fs-body)' }}>{modalDish.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h3)', color: 'var(--color-gold)' }}>{modalDish.price}</span>
                <span style={{ fontSize: 'var(--fs-small)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)' }}>{modalDish.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
