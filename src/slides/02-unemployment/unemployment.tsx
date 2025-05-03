import { useState, useEffect } from 'react'

const IMAGES = [
  '/picture1.png',
  '/picture2.png',
  '/picture3.png',
  '/picture4.png',
]

export default function Unemployment() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const idx = Math.floor(window.scrollY / window.innerHeight)
      setCurrent(Math.min(IMAGES.length - 1, Math.max(0, idx)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative h-[400vh] px-6">
      {/* 1) sticky container, centered, padded exactly like your other slides */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* 2) inner “frame” to constrain width & height */}
        <div className="relative w-full max-w-3xl h-[80vh]">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className={`
                absolute inset-0
                bg-center bg-contain bg-no-repeat
                transition-opacity duration-500 ease-in-out
                ${current === i ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
