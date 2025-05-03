import ScrollyStep from '../components/ScrollyStep'
import { Intro } from '../slides'
import AnimatedBarChart from '../components/AnimatedBarChart'
import Unemployment from '../slides/02-unemployment/unemployment.tsx'

const slides = [
  { key: 'intro',        content: <Intro /> },
  { key: 'unemployment', content: <Unemployment /> },
  {
    key: 'chart',
    content: (
      <>
        <h2 className="text-3xl font-semibold mb-2">
          Unemployment in 2024 – “The Geography of Joblessness”
        </h2>
        <AnimatedBarChart dataKey="unemployment" />
      </>
    )
  },
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

