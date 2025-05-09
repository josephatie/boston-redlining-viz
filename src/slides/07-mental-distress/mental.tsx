// src/slides/07-mental-distress/MentalDistress.tsx

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import './mental.css';

export default function MentalDistress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderX, setSliderX] = useState(0);      // will be set to 10% on mount
  const [isDragging, setIsDragging] = useState(false);

  // Measure container and initialize slider to 10% of width
  useLayoutEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
      setSliderX(width * 0.3);
    }
  }, []);

  // Handle drag movement
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      setSliderX(x);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="w-screen h-screen flex flex-col">
      <h2 className="sticky top-0 w-full bg-white font-serif font-bold text-3xl md:text-4xl px-6 py-4 mb-6 z-20">
        Mental Health
      </h2>
      <div className="flex flex-1 overflow-hidden items-center justify-center flex-col">
        <div className="compare-container mt-6" ref={containerRef}>
          {/* Base image */}
          <img
            src="/img/grade-a.png"
            className="compare-img"
            alt="Grade A"
          />

          {/* Overlay image clipped from the right */}
          <img
            src="/img/grade-d.png"
            className="compare-img overlay-img"
            alt="Grade D"
            style={{
              clipPath: `inset(0px ${containerWidth - sliderX}px 0px 0px)`,
            }}
          />

          {/* Draggable slider bar */}
          <div
            className="slider-bar"
            style={{ left: `${sliderX}px` }}
            onMouseDown={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
          />
        </div>

        <p className="caption font-serif mb-6" style={{ fontSize: '1.5rem' }}>
          Two zipcodes. Twenty minutes apart. Worlds away in mental health.
        </p>
      </div>
    </section>
  );
}