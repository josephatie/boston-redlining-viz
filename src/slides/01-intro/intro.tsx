// src/slides/01-intro/intro.tsx
import React, { useState, useEffect, useRef } from 'react'
import './intro.css';

export default function Intro() {
  // Texts for the scroll-through section
  const TEXTS = [
    'Redlining was made illegal in the late 20th century.',
    'Yet…',
    'How different is the landscape today?'
  ]
  const [textIndex, setTextIndex] = useState(0)
  const textSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!textSectionRef.current) return
      const rect = textSectionRef.current.getBoundingClientRect()
      const scrollY = Math.max(0, -rect.top)

      // Compute the scrollable distance inside this section
      const sectionHeight = textSectionRef.current.clientHeight
      const maxScroll = sectionHeight - window.innerHeight
      // Divide into (n−1) equal frames for n texts
      const frameHeight = maxScroll / (TEXTS.length - 1)
      // Clamp scroll to [0, maxScroll]
      const effective = Math.min(scrollY, maxScroll)
      const idx = Math.floor(effective / frameHeight)

      setTextIndex(Math.min(TEXTS.length - 1, Math.max(0, idx)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [TEXTS.length])

  return (
    <div className="font-serif">
      {/* Hero */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/Redlining background1.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 max-w-3xl mx-auto space-y-4">
          <h2
            className="text-5xl md:text-7xl mb-6 text-white leading-tight"
          >
            Echoes of History:<br />
            From Redlining to Today’s Inequities
          </h2>
          <p
            className="text-2xl md:text-3xl text-white leading-relaxed"
          >
            How are Boston’s historically redlined areas doing today?
          </p>
        </div>
      </section>

      {/* “What happened?” section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              What happened?
            </h3>
            <div className="prose prose-lg" style={{ fontSize: '1.2rem' }}>
              <p>
                In mid-20th-century Boston, a silent line was drawn — not with fences,
                but with ink. Banks and federal agencies labeled entire neighborhoods
                as risky, solely because of the people who lived there.
              </p>
              <p>
                Roxbury and Dorchester, communities rich in culture and resilience,
                were marked in red. That single color cut them off from homeownership,
                investment, and opportunity.
              </p>
              <p>
                How did they do this?
              </p>
            </div>
          </div>
          <div className="md:w-2/3 flex justify-center">
            <img
              src="/RLmap1.png"
              alt="HOLC Redlining map of Boston"
              className="w-full max-w-xl md:max-w-2xl h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* “Federal grades” section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              On federal maps, neighborhoods were graded from A to D:
            </h3>
            <div className="prose prose-lg" style={{ fontSize: '1.2rem' }}>
              <p>
                <span style={{ color: '#5C8546', fontWeight: 'bold' }}>A</span>{' '}
                Affluent and white — “Best” for investment
              </p>
              <p>
                <span style={{ color: '#59829C', fontWeight: 'bold' }}>B</span>{' '}
                Stable and white-adjacent — “Still Desirable”
              </p>
              <p>
                <span style={{ color: '#DACE74', fontWeight: 'bold' }}>C</span>{' '}
                Working-class, immigrant — “Declining”
              </p>
              <p>
                <span style={{ color: '#C0747C', fontWeight: 'bold' }}>D</span>{' '}
                Black and brown communities — labeled “Hazardous”
              </p>
            </div>
          </div>
          <div className="md:w-2/3 flex justify-center">
            <img
              src="/map2.png"
              alt="HOLC federal grading legend"
              className="w-full max-w-xl md:max-w-2xl h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* “Civil rights pushback” section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Civil Rights Pushback</h3>
            <div className="prose prose-lg" style={{ fontSize: '1.2rem' }}>
              <p>
                As neighborhoods were walled off by red ink, people pushed back.
                Boston’s civil rights activists fought for equal housing, equal credit,
                equal respect. Redlining was declared illegal. But dismantling a policy
                doesn't dismantle its legacy.
              </p>
            </div>
          </div>
          <div className="md:w-2/3 flex justify-center">
            <img
              src="/protest.jpg"
              alt="Boston civil rights protest"
              className="w-full max-w-xl md:max-w-2xl h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* “Fixed background, changing text” section */}
      <section
        ref={textSectionRef}
        className="relative w-full h-[300vh] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/Redlining background1.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <p
            className="text-6xl md:text-7xl lg:text-8xl text-white text-center max-w-3xl px-6 transition-opacity duration-700 ease-in-out"
            key={textIndex}
            style={{ opacity: 0, animation: `fadeIn 0.7s forwards` }}
          >
            {TEXTS[textIndex]}
          </p>
        </div>
      </section>
    </div>
  )
}
