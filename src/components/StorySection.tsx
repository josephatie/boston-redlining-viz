import React from 'react';

const StorySection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="py-16 px-8 max-w-4xl mx-auto">
    {children}
  </section>
);

export default StorySection;
