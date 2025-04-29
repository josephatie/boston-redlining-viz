// src/pages/ScrollyPage.tsx
import React from 'react';
import ScrollyStep from '../components/ScrollyStep';
import Hero from '../components/Hero';
import AnimatedBarChart from '../components/AnimatedBarChart';
import MetricMap from '../components/MetricMap';

// Define your slides: a key and the content to render
const slides = [
  {
    key: 'intro',
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">A legacy that still shapes lives</h1>
        <p className="max-w-2xl">
          In mid-20th century Boston, a silent line was drawn—not with fences,
          but with ink. Banks and federal agencies labeled entire
          neighborhoods as risky, solely because of the people who lived there.
        </p>
      </>
    )
  },
  {
    key: 'unemployment',
    content: (
      <>
        <h2 className="text-3xl font-semibold mb-2">
          Unemployment in 2024 – “The Geography of Joblessness”
        </h2>
        <AnimatedBarChart dataKey="unemployment" />
      </>
    )
  },
  // Add more metric slides here, for 'income', 'mentalDistress', etc.
  {
    key: 'map',
    content: (
      <>
        <h2 className="text-3xl font-semibold mb-2">Explore All Metrics</h2>
        <MetricMap />
      </>
    )
  },
  {
    key: 'about',
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">About this project</h2>
        <p className="max-w-2xl">
          Created for MIT’s Interactive Visualization & Society class (6.C35),
          in partnership with MAPC, this site explores how historical redlining
          continues to shape Boston today…
        </p>
      </>
    )
  }
];

const ScrollyPage: React.FC = () => (
  <div className="overflow-y-auto">
    {slides.map(slide => (
      <ScrollyStep key={slide.key}>{slide.content}</ScrollyStep>
    ))}
  </div>
);

export default ScrollyPage;
