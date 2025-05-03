import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  '/picture1.png',
  '/picture2.png',
  '/picture3.png',
  '/picture4.png',
]

const CAPTIONS = [
  'Decades after redlining was outlawed, the neighborhoods once marked in red continue to face economic challenges.',
  `Our data shows a striking pattern: in 2024, areas that were historically redlined as grades C and D tend to have significantly higher unemployment than those once deemed “investment-worthy.” Today, unemployment is concentrated in many of the same places where opportunity was once denied. The red lines may have disappeared from maps, but echoes of that past remain embedded in the present.`,
  'While this does not prove causation, the historical context is hard to ignore. For decades, these neighborhoods were systematically excluded from mortgage access and business investment.',
  `Today, unemployment is concentrated in many of the same places where opportunity was once denied. The red lines may have disappeared from maps, but echoes of that past remain embedded in the present.`,
]

export default function Unemployment() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      // rect.top is distance from section top to viewport top.
      // Once it goes negative, section has entered the viewport.
      const scrollInSection = Math.max(0, -rect.top)
      const idx = Math.floor(scrollInSection / window.innerHeight)

      setCurrent(Math.min(IMAGES.length - 1, Math.max(0, idx)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* container to center + gutter */}
      <div className="container mx-auto px-6 h-full">
        {/* sticky two-column viewer */}
        <div className="sticky top-0 h-screen flex items-center">
          {/* left: image */}
          <div className="relative w-1/2 max-w-xl h-[80vh]">
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

          {/* right: caption */}
          <div className="relative w-1/2 max-w-xl h-[80vh] px-8">
            {CAPTIONS.map((text, i) => (
              <p
                key={i}
                className={`
                  absolute inset-0
                  flex items-center
                  text-2xl leading-relaxed
                  transition-opacity duration-500 ease-in-out
                  ${current === i ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

