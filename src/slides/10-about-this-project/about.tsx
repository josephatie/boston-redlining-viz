// src/slides/AboutUs.tsx
import React from 'react';

export default function AboutUs() {
  return (
    <section
      className="relative w-screen h-screen flex flex-col items-start justify-center text-gray-900 px-12"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <h2 className="text-4xl md:text-5xl font-serif mb-6">
        About Us
      </h2>
      <p className="text-lg md:text-xl leading-relaxed mb-4">
        We created this project as part of the Interactive Visualization & Society class (6.C35) at MIT in Spring 2025.
        In collaboration with the Metropolitan Area Planning Council (MAPC), we explored housing affordability in Greater Boston by researching the enduring effects of redlining.
      </p>
      <p className="text-lg md:text-xl leading-relaxed mb-2">
        Our analysis draws on data from:
      </p>
      <ul className="list-disc list-inside text-lg md:text-xl mb-6 pl-5">
        <li>U.S. Census</li>
        <li>Child Opportunity Index</li>
        <li>Boston Police crime reports</li>
        <li>CDC PLACES health data</li>
        <li>Eviction records</li>
      </ul>
      <p className="text-lg md:text-xl leading-relaxed mb-6">
        All datasets were cleaned and aggregated to historical redlining zones.
        Point-based data (crime incidents, eviction cases) were directly mapped by coordinates;
        tract-level data (income, homeownership) were assigned based on greatest-area overlap with each redlined zone.
      </p>
      <div className="mt-8">
        <h3 className="text-2xl font-serif mb-4">Team Members</h3>
        <ul className="text-lg md:text-xl list-none">
          <li className="mb-1">
            <span className="font-medium">Joseph Atie</span> – jatie@mit.edu
          </li>
          <li className="mb-1">
            <span className="font-medium">Andrea Jimenez Fernandez</span> – andrejim@mit.edu
          </li>
          <li className="mb-1">
            <span className="font-medium">Viola Tan</span> – iola_tan@gsd.harvard.edu
          </li>
          <li>
            <span className="font-medium">Zheng Fang</span> – zheng_fang@gsd.harvard.edu
          </li>
        </ul>
      </div>
    </section>
  );
}
