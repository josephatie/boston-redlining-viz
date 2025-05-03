import React from 'react'

export default function Intro() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Redlining background1.png')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* text column, constrained to match your other slides */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 max-w-3xl mx-auto text-white">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Echoes of History:<br/>From Redlining to Today’s Inequities
</h2>
        <p className="text-lg md:text-xl leading-relaxed">
        How are Boston’s historically redlined areas doing today?
        </p>
      </div>
    </section>
  )
}


