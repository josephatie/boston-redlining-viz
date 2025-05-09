// src/pages/ScrollyPage.tsx
import React from 'react'
import ScrollyStep from '../components/ScrollyStep'
import { Intro, MentalDistress, MentalChart, Unemployment, CrowdedHousing, Evictions, SmokeSlide, SmokingGame, CrimeCards,CalltoAction, AboutUs,MapView } from '../slides'

const slides = [
  { key: 'intro',        content: <Intro /> },
  { key: 'unemployment', content: <Unemployment /> },
  { key: 'crime',       content: <CrimeCards /> },
  { key: 'evictions',    content: <Evictions /> },
  { key: 'crowdedHousing', content: <CrowdedHousing /> },
  { key: 'mental',       content: <MentalDistress /> },
  { key: 'mentalChart',  content: <MentalChart /> },
  { key: 'smoke',  content: <SmokeSlide /> },
  { key: 'smokinggame',  content: <SmokingGame /> },
  { key: 'map',          content: <MapView /> },
  { key: 'calltoaction', content: <CalltoAction /> },
  { key: 'about',  content: <AboutUs /> },
]

export default function ScrollyPage() {
  return (
    <div>
      {slides.map(slide => {
        // full-bleed hero: render directly
        if (slide.key === 'intro') {
          return <Intro key="intro" />
        }
        if (slide.key === 'calltoaction') return <CalltoAction key="calltoaction" />
        // your custom 400vh scrolly sequence: render directly
        if (slide.key === 'unemployment') {
          return <Unemployment key="unemployment" />
        }

        // everything else stays wrapped in <ScrollyStep>
        return (
          <ScrollyStep key={slide.key}>
            {slide.content}
          </ScrollyStep>
        )
      })}
    </div>
  )
}
