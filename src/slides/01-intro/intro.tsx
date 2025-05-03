// src/slides/Intro.tsx
import React from 'react'

export default function Intro() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Redlining background1.png')" }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* title & subtitle */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 max-w-3xl mx-auto">
          <h2
            className="text-5xl md:text-7xl mb-6 text-white leading-tight"
            style={{ fontFamily: 'Rockwell Nova, serif' }}
          >
            Echoes of History:<br />
            From Redlining to Today’s Inequities
          </h2>
          <p
            className="text-2xl md:text-3xl text-white leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            How are Boston’s historically redlined areas doing today?
          </p>
        </div>
      </section>

      {/* “What happened?” two-column section */}
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-start gap-8">
          {/* Left: text */}
          <div className="md:w-1/2">
            <h3 className="text-3xl md:text-5xl font-serif mb-6">
              What happened?
            </h3>
            <p className="text-2xl md:text-3xl leading-relaxed mb-6"  style={{ fontFamily: 'Georgia, serif' }}> 
              In mid-20th-century Boston, a silent line was drawn — not with fences,
              but with ink. Banks and federal agencies labeled entire neighborhoods
              as risky, solely because of the people who lived there.
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Roxbury and Dorchester, communities rich in culture and resilience,
              were marked in red. That single color cut them off from homeownership,
              investment, and opportunity.
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed"style={{ fontFamily: 'Georgia, serif' }}>
              How did they do this?
            </p>
          </div>

          {/* Right: image */}
          <div className="md:w-1/2 flex justify-center"style={{ fontFamily: 'Georgia, serif' }}>
            <img
              src="/RLmap1.png"
              alt="HOLC Redlining map of Boston"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* “Federal grades” two-column section */}
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-start gap-8">
          {/* Left: legend text */}
          <div className="md:w-1/2">
            <h3 className="text-4xl md:text-5xl font-serif mb-6"style={{ fontFamily: 'Georgia, serif' }}>
              On federal maps, neighborhoods were graded from A to D:
            </h3>
            <p className="text-2xl md:text-3xl leading-relaxed mb-4"style={{ fontFamily: 'Georgia, serif' }}>
              <span style={{ color: '#5C8546', fontWeight: 'bold' }}>A</span>{' '}
              Affluent and white — “Best” for investment
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed mb-4"style={{ fontFamily: 'Georgia, serif' }}>
              <span style={{ color: '#59829C', fontWeight: 'bold' }}>B</span>{' '}
              Stable and white-adjacent — “Still Desirable”
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed mb-4"style={{ fontFamily: 'Georgia, serif' }}>
              <span style={{ color: '#DACE74', fontWeight: 'bold' }}>C</span>{' '}
              Working-class, immigrant — “Declining”
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed"style={{ fontFamily: 'Georgia, serif' }}>
              <span style={{ color: '#C0747C', fontWeight: 'bold' }}>D</span>{' '}
              Black and brown communities — labeled “Hazardous”
            </p>
          </div>

          {/* Right: map2 image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/map2.png"
              alt="HOLC federal grading legend"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

