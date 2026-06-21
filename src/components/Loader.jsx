import { useState, useEffect } from 'react'
import './Loader.css'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200)
    const removeTimer = setTimeout(() => setRemoved(true), 3000)
    return () => { clearTimeout(timer); clearTimeout(removeTimer) }
  }, [])

  if (removed) return null

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`} id="page-loader">
      <div className="loader__logo shimmer-text">Bransons Kitchen</div>
      <div className="loader__bar">
        <div className="loader__bar-fill" />
      </div>
    </div>
  )
}
