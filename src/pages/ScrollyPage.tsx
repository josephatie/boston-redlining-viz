// src/pages/ScrollyPage.tsx
import React from 'react'
import ScrollyStep from '../components/ScrollyStep'
import { Intro, MentalDistress, MentalChart, Unemployment, MapView} from '../slides'

const slides = [
  { key: 'intro',        content: <Intro /> },
  { key: 'unemployment', content: <Unemployment /> },
  { key: 'mental',       content: <MentalDistress /> },
  { key: 'mentalChart',  content: <MentalChart /> },
  { key: 'map',          content: <MapView /> },
]

export default function ScrollyPage() {
  return (
    <div>
      {slides.map(slide => {
        // full-bleed hero: render directly
        if (slide.key === 'intro') {
          return <Intro key="intro" />
        }

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
