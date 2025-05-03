import ScrollyStep from '../components/ScrollyStep'
import { Intro, MentalDistress, MentalChart, Unemployment } from '../slides'

const slides = [
  { key: 'intro',        content: <Intro /> },
  { key: 'unemployment', content: <Unemployment /> },
  { key: 'mental', content: <MentalDistress />},
  { key: 'mentalChart', content: <MentalChart />},
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
]

export default function ScrollyPage() {
  return (
    <div>
      {slides.map(slide => {
        if (slide.key === 'unemployment') {
          return <Unemployment key="unemployment" />
        }
        return (
          <ScrollyStep key={slide.key}>
            {slide.content}
          </ScrollyStep>
        )
      })}
    </div>
  )
}

