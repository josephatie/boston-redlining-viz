import React from 'react'

export default function Intro() {
  return (
    <div
      className="relative w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: "url('/Redlining%20background1.png')" }}
    >
      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* text on top */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6">
        <h2 className="text-3xl font-serif text-white mb-2">Introduction</h2>
        <p className="text-lg leading-relaxed text-white">
          In mid-20th century Boston, a silent line was drawn—not with fences,<br/>
          but with ink. Banks and federal agencies labeled entire<br/>
          neighborhoods as risky, solely because of the people who lived there.
        </p>
      </div>
    </div>
  )
}
