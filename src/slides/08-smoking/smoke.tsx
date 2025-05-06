'use client';

import React from 'react';

export default function Page() {
  return (
    // Use w-screen to span full viewport width, ignoring parent containers
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background video of burning cigarette */}
      <video
        src="/img/cigarette.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-screen h-screen object-cover"
      />

      {/* Dark overlay to fade video */}
      <div className="absolute inset-0 bg-black opacity-35" />

      {/* Centered text overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-screen h-screen text-center px-6">
        <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
          When we think about smoking,<br /> we often frame it as a personal choice.
        </h1>
        <p className="text-lg md:text-2xl text-white max-w-2xl">
          But public health research reminds us: choices are shaped by context.
        </p>
      </div>
    </div>
  );
}

/*
  • Ensure your video file lives at public/video/cigarette.mp4.
  • Navigate to /slide/smoke — it will now stretch edge-to-edge across the viewport.
*/