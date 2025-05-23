// app/slide/smokinggame/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SmokingGame() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = 'Twice as much';

  const options = [
    'Half as much',
    'As much',
    'Twice as much',
    'Three times as much',
  ];

  return (
    <section className="w-screen h-screen flex flex-col font-serif">
      <h2 className="sticky top-0 w-full bg-white font-serif font-bold text-3xl md:text-4xl px-6 py-4 z-20">
        Smoking
      </h2>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        {/* Bold, centered question */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-center max-w-2xl mx-auto">
          In 2022, how much was the smoking rate in Grade C areas compared to Grade A areas?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className="px-4 py-2 rounded border font-serif text-base"
              style={
                selected === opt
                  ? { backgroundColor: '#D2D3C0', borderColor: '#D2D3C0' }
                  : {}
              }
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          disabled={!selected}
          className="px-6 py-3 rounded mb-8 text-white font-serif"
          style={{ backgroundColor: '#5C8546', opacity: selected ? 1 : 0.5 }}
        >
          Check Answer
        </button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-2xl text-center space-y-6 font-serif"
          >
            {selected === correct ? (
              <p className="text-xl font-serif font-semibold text-green-400">✅ Correct!</p>
            ) : (
              <p className="text-xl font-serif font-semibold text-red-400">❌ Sorry, that’s not correct.</p>
            )}
            <p className="text-base md:text-lg font-serif">
              In 2022, smoking rates were <strong>twice as much</strong> in areas that were
              historically redlined.
            </p>
            <p className="text-base md:text-lg font-serif">
              We can't say for certain why—but many of these communities have faced
              persistent stressors: economic instability, limited access to
              healthcare, and underinvestment in local infrastructure. In such
              conditions, coping behaviors often emerge.
            </p>
            <p className="text-base md:text-lg font-serif">
              These aren’t simply individual decisions in a vacuum—they reflect
              broader, accumulated pressures.
            </p>
            <p className="text-base md:text-lg font-serif">
              This map doesn’t just highlight where smoking occurs. It invites us
              to consider where support systems have been missing.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}