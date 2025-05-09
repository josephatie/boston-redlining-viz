import React, { useEffect, useRef } from 'react';

const SCROLL_TEXTS = [
  <p key="0" className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
    We set out to answer a simple question:<br />
    <strong>How are historically redlined locations doing today?</strong>
  </p>,
  <p key="1" className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
    What we found was undeniable.
  </p>,
  <p key="2" className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
    From mental health to eviction, the neighborhoods once outlined in red still carry the weight of that ink.
  </p>,
  <p key="3" className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
    This isn’t about the past.<br />
    This is about now. About how we design cities. Who gets to feel safe. Who gets to thrive. And who’s still forced to fight for the basics.
  </p>,
  <p key="4" className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
    These maps are not just artifacts.<br />
    They’re mirrors.
  </p>,
];

export default function CallToAction() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <section className="relative">
      <video
        ref={videoRef}
        src="/firemap.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="sticky top-0 w-full h-screen object-cover z-0"
      />

      <div className="relative z-10">
        {SCROLL_TEXTS.map((content, idx) => (
          <div
            key={idx}
            className="h-screen flex items-center justify-center px-6 text-center"
          >
            <div
              className="max-w-2xl bg-[rgba(240,240,237,0.8)] p-8 rounded-lg"
            >
              {content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}








