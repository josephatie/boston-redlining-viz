// src/pages/ScrollyPage.tsx
import React from 'react';
import ScrollyStep from '../components/ScrollyStep';
import {Intro, MentalDistress, MentalChart} from '../slides'
import AnimatedBarChart from '../components/AnimatedBarChart';

// Define your slides: a key and the content to render
const slides = [
  { id: 'intro', content: <Intro />, viz: null},
  { id: 'mental', content: <MentalDistress />, viz: null},
  { id: 'mentalChart', content: <MentalChart />, viz: null},

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
