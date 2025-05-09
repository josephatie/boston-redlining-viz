// src/slides/action.tsx
import React from 'react';
import './action.css';

export default function ActionSlide() {
  return (
    <section className="relative w-screen min-h-screen overflow-y-auto bg-[url('/Redlining background1.png')] bg-fixed bg-cover bg-center">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col items-center justify-start space-y-64 py-40 px-8 text-center text-white">
        {/* 1st Text Block */}
        <div className="reveal">
          <h1 className="text-5xl sm:text-6xl font-extrabold">
            Redlining may be gone from policy
            <br />
            <span className="block mt-4 text-2xl sm:text-3xl font-semibold">
              But, redlined areas are still facing challenges
            </span>
          </h1>
        </div>

        {/* 2nd Text Block */}
        <div className="reveal max-w-2xl">
          <div className="prose prose-lg sm:prose-xl text-left mx-auto">
            <p>We set out to answer a simple question:</p>
            <p className="font-bold">Is Boston still suffering the effects of redlining?</p>
            <p>What we found was undeniable.</p>
            <p>
              From income to mental health, from eviction risk to life expectancy,
              the neighborhoods once outlined in red still carry the weight of that ink.
            </p>
            <p>This isn’t about the past.</p>
            <p>
              This is about now. About how we design cities. Who gets to feel safe.
              Who gets to thrive. And who’s still forced to fight for the basics.
            </p>
            <p>These maps are not just artifacts.</p>
            <p>They’re mirrors.</p>
          </div>
        </div>

        {/* 3rd Text Block */}
        <div className="reveal">
          <h2 className="text-4xl sm:text-5xl font-bold max-w-2xl mx-auto leading-relaxed">
            You, right now, can choose to see the invisible lines and help erase them.
            <br />
            The story of redlining isn’t finished.
            <br />
            But it can end differently if we decide to redraw the map
          </h2>
        </div>
      </div>
    </section>
  );
}
