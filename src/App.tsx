import React from 'react';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import AnimatedBarChart from './components/AnimatedBarChart';
import MetricMap from './components/MetricMap';

const App: React.FC = () => (
  <div className="antialiased text-gray-800">
    <Hero />
    <StorySection>
      <h2 className="text-2xl mb-4">Unemployment by Historic Grade</h2>
      <AnimatedBarChart />
    </StorySection>
    {/* …other story sections… */}
    <StorySection>
      <h2 className="text-2xl mb-4">Explore All Metrics</h2>
      <MetricMap />
    </StorySection>
  </div>
);

export default App;
