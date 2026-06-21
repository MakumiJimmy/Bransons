import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = node.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxEls = document.querySelectorAll('[data-parallax]')
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3
        const rect = el.getBoundingClientRect()
        const scrolled = window.scrollY
        el.style.transform = `translateY(${scrolled * speed}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
