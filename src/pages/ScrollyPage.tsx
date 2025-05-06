// src/pages/ScrollyPage.tsx
import ScrollyStep from '../components/ScrollyStep';
import {
  Intro,
  Unemployment,
  MentalDistress,
  MentalChart,
  SmokeSlide,
  SmokingGame
} from '../slides'

const slides = [
  { key: 'intro',        content: <Intro /> },
  { key: 'unemployment', content: <Unemployment /> },
  { key: 'mental',       content: <MentalDistress /> },
  { key: 'mentalChart',  content: <MentalChart /> },
  { key: 'smoke',  content: <SmokeSlide /> },
  { key: 'smokinggame',  content: <SmokingGame /> },
]

export default function ScrollyPage() {
  return (
    <div>
      {slides.map(slide => {
        switch (slide.key) {
          case 'intro':
            return <Intro key="intro" />;
          case 'unemployment':
            return <Unemployment key="unemployment" />;
          case 'mentalChart':
            return (
              <ScrollyStep key="mentalChart">
                <MentalChart />
              </ScrollyStep>
            );
          case 'smoke':
              // now only renders when scrolled into view
              return (
                <ScrollyStep key="smoke">
                  <SmokeSlide />
                </ScrollyStep>
              )
          default:
            return (
              <ScrollyStep key={slide.key}>
                {slide.content}
              </ScrollyStep>
            );
        }
      })}
    </div>
  );
}


