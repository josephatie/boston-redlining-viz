// src/slides/AboutUs.tsx
import React from 'react';

export default function AboutUs() {
  return (
    <section className="w-screen h-screen flex flex-col font-serif bg-white" style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem' }}>
      <div className="container mx-auto w-full max-w-4xl flex flex-col">
        <h2 className="sticky top-0 bg-white font-serif font-bold text-3xl md:text-4xl py-4 mb-6 border-b border-gray-200 text-left z-20">
          About Us
        </h2>
        <div className="overflow-y-auto prose prose-lg text-gray-700 bg-gray-50 rounded-lg shadow p-8">
          <p className="text-base md:text-lg leading-relaxed">
            We created this project as part of the Interactive Visualization & Society class (6.C35) at MIT in Spring 2025.
            In collaboration with the Metropolitan Area Planning Council (MAPC), we explored housing affordability in Greater Boston by researching the enduring effects of redlining.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-2">
            Our analysis draws on data from:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg mb-6 pl-5">
            <li>U.S. Census</li>
            <li>Child Opportunity Index</li>
            <li>Boston Police crime reports</li>
            <li>CDC PLACES health data</li>
            <li>Eviction records</li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            All datasets were cleaned and aggregated to historical redlining zones.
            Point-based data (crime incidents, eviction cases) were directly mapped by coordinates;
            tract-level data (income, homeownership) were assigned based on greatest-area overlap with each redlined zone.
          </p>
          <div className="mt-8">
            <h3 className="text-2xl font-serif font-bold mb-4">Team Members</h3>
            <ul className="text-base md:text-lg grid grid-cols-1 gap-4 divide-y divide-gray-300 list-none">
              <li className="py-2">
                <span className="font-medium">Joseph Atie</span> – jatie@mit.edu
              </li>
              <li className="py-2">
                <span className="font-medium">Andrea Jimenez Fernandez</span> – andrejim@mit.edu
              </li>
              <li className="py-2">
                <span className="font-medium">Viola Tan</span> – viola_tan@gsd.harvard.edu
              </li>
              <li className="py-2">
                <span className="font-medium">Zheng Fang</span> – zheng_fang@gsd.harvard.edu
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}