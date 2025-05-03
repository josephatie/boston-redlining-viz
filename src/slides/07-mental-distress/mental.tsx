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
      setSliderX(width * 0.1);
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
    <div className="mental-wrapper">
      <h2 className="mental-title">
        Mental Health: The Psychological Cost to Injustice
      </h2>

      <div className="compare-container" ref={containerRef}>
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

      <p className="caption">
        Two zipcodes. Twenty minutes apart. Worlds away in mental health.
      </p>
    </div>
  );
}