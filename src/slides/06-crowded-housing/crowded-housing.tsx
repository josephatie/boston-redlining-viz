// small human icon ,and small house icon. juxtaposed side by side.
// for example on the left 10 ppl living 5 houses, and on the right 100 people live in 10 house

// src/slides/Intro.tsx
import React, { useState, useEffect, useRef } from 'react'
import {Legend} from 'recharts';

const COLOR_MAP = {
    A: '#5c8546',
    B: '#59829c',
    C: '#dace74',
    D: '#c0747c'
  };

export default function CrowdedHousing() {

    const legendPayload = Object.entries(COLOR_MAP).map(([grade, color]) => ({
        value: `Grade ${grade}`,
        id: grade,
        type: 'square' as any,
        color
      }));

  return (
    <section className="w-screen h-screen flex flex-col">
      <h2 className="sticky top-0 w-full bg-white font-serif font-bold text-3xl md:text-4xl px-6 py-4 z-20">
        Crowded Housing
      </h2>
      <div className="flex flex-1 overflow-hidden items-center gap-8 pl-6 md:pl-12 pr-6 md:pr-12">
        <div className="md:w-3/5 flex flex-col justify-center">

          <div className="flex flex-row justify-center gap-8">
            <div className="flex flex-row items-center">
              <img src="/2.png" alt="Crowd icon" className="w-12 h-12" />
              <p> = 10 rooms of moderately crowded housing</p>
            </div>
            <div className="flex flex-row items-center">
              <img src="/3.png" alt="Crowd icon" className="w-12 h-12" />
              <p> = 10 rooms of severely crowded housing</p>
            </div>
            </div>

            <div className="w-full h-12 flex items-center justify-center">
              <Legend 
                payload={legendPayload} 
                verticalAlign="top" 
                align="center"
                wrapperStyle={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
              />
            </div>
            
            <div className="flex justify-center">
              <img
                src="/crowded.png"
                alt="HOLC Redlining map of Boston"
                className="w-4/5 h-auto object-cover"
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="md:w-2/5 flex flex-col justify-center">
            <div className="chart-text" style={{fontFamily: 'Georgia, serif', fontSize: '1.125rem'}}>
              <p>
                Imagine raising a family where multiple households share one roof, where privacy is rare, and where every inch feels borrowed.​
              </p>
              <p>
                This is the reality in many neighborhoods that were once redlined.​
              </p>
              <p>
                Our findings show that <strong>crowded housing</strong> is more common in areas historically graded C and D.​
              </p>
              <p>
                We can't say this is solely because of redlining—but when neighborhoods face long-term disinvestment, limited new development, and a lack of affordable housing, <strong>supply often fails to meet demand</strong>.​
              </p>
              <p>
                Crowding isn't a cultural preference. It often reflects <strong>limited housing options</strong>, not personal choice.​
              </p>
              <p>
                Redlining didn't just influence where people could buy—it shaped the conditions in which many still live.​
              </p>
            </div>
          </div>
      </div>
    </section>
  )
}
