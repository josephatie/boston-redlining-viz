import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  Cell
} from 'recharts';
import './crime.css';

type Grade = 'A' | 'B' | 'C' | 'D';
interface CrimeData { area: string; count: number; grade: Grade; }
const data: CrimeData[] = [
  { area: '5027',  count: 55,    grade: 'A' },
  { area: '9543',  count: 294,   grade: 'A' },
  { area: '4946',  count: 296,   grade: 'B' },
  { area: '9545',  count: 316,   grade: 'B' },
  { area: '4943',  count: 537,   grade: 'B' },
  { area: '5650',  count: 557,   grade: 'B' },
  { area: '4996',  count: 604,   grade: 'C' },
  { area: '4949',  count: 707,   grade: 'B' },
  { area: '4976',  count: 893,   grade: 'C' },
  { area: '4991',  count: 958,   grade: 'C' },
  { area: '4948',  count: 1008,  grade: 'C' },
  { area: '4951',  count: 1036,  grade: 'C' },
  { area: '4940',  count: 1090,  grade: 'C' },
  { area: '4986',  count: 1133,  grade: 'D' },
  { area: '4977',  count: 1261,  grade: 'D' },
  { area: '4922',  count: 1739,  grade: 'C' },
  { area: '4995',  count: 2074,  grade: 'D' },
  { area: '4992',  count: 2246,  grade: 'D' },
  { area: '4947',  count: 4496,  grade: 'C' },
  { area: '4993',  count: 4649,  grade: 'D' },
  { area: '4978',  count: 5212,  grade: 'D' },
  { area: '4925',  count: 5618,  grade: 'C' },
  { area: '4927',  count: 5668,  grade: 'C' },
  { area: '4930',  count: 6086,  grade: 'C' },
  { area: '4945',  count: 6933,  grade: 'C' },
  { area: '4924',  count: 7857,  grade: 'D' },
  { area: '4985',  count: 9677,  grade: 'C' },
  { area: '4921',  count: 9800,  grade: 'C' },
  { area: '4920',  count: 10078, grade: 'D' },
  { area: '4918',  count: 11918, grade: 'D' },
  { area: '4919',  count: 14326, grade: 'D' },
  { area: '4926',  count: 14785, grade: 'C' }
];

const gradeColor: Record<Grade, string> = {
  A: '#4C8C48',
  B: '#4C7C94',
  C: '#E0D88A',
  D: '#C96B6D'
};

interface Neighborhood { id: number; name: string; imageUrl: string; stat: string; story: string; }
const neighborhoods: Neighborhood[] = [
  {
    id: 0,
    name: 'Beacon Hill',
    imageUrl: '/img/beacon-hill.png',
    stat: '20 reported crimes (H1 2022)',
    story: 'As one of Boston’s most historic and affluent neighborhoods, Beacon Hill recorded just 20 crimes in the first half of 2022—a testament to its enduring low-crime reputation.'
  },
  {
    id: 1,
    name: 'South End',
    imageUrl: '/img/south-end.png',
    stat: '6.5 crimes per 1,000 (2022)',
    story: 'Historically “Still Desirable,” the South End saw a violent crime rate of 6.5 incidents per 1,000 residents in 2022, reflecting both its vibrant community life and pockets of urban safety challenges.'
  },
  {
    id: 2,
    name: 'Dorchester',
    imageUrl: '/img/dorchester.png',
    stat: '438 incidents (H1 2022)',
    story: 'Marked as “Definitely Declining,” Dorchester reported 438 crimes in early 2022, highlighting the legacy of underinvestment and the need for continued community-led safety initiatives.'
  },
  {
    id: 3,
    name: 'Roxbury',
    imageUrl: '/img/roxbury.png',
    stat: '257 incidents (H1 2022)',
    story: 'Once labeled “Hazardous,” Roxbury registered 257 incidents in the first half of 2022, underscoring persistent structural inequalities that influence public safety outcomes.'
  }
];

export default function CrimeViz() {
  const [flipped, setFlipped] = useState<boolean[]>(Array(neighborhoods.length).fill(false));
  const handleFlip = (i: number) => setFlipped(prev => prev.map((v, idx) => idx === i ? !v : v));

  return (
    <section className="w-screen h-screen flex">
      <aside
        className="w-1/2 h-screen sticky top-0 flex justify-center items-center p-6"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {neighborhoods.map((nb, idx) => (
            <div
              key={nb.id}
              className="w-72 h-80 cursor-pointer group"
              onClick={() => handleFlip(idx)}
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[idx] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.7s ease-in-out'
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={nb.imageUrl}
                    alt={nb.name}
                    className="w-full h-3/4 object-cover filter grayscale group-hover:grayscale-0 transition-filter duration-300 ease-in-out"
                  />
                  <div className="p-6 bg-white h-1/4 flex flex-col justify-center">
                    <h3 className="text-xl font-bold">{nb.name}</h3>
                    <p className="text-base text-gray-700">{nb.stat}</p>
                  </div>
                </div>
                {/* Back Side */}
                <div
                  className="absolute w-full h-full rounded-2xl shadow-xl bg-white p-6 overflow-y-auto"
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <h3 className="text-xl font-bold mb-3">{nb.name} Story</h3>
                  <p className="text-base text-gray-800 leading-relaxed">{nb.story}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right: Narrative + Chart */}
      <main className="w-1/2 h-screen p-8 flex flex-col">
        <h2 className="text-4xl font-bold mb-6">Crime</h2>
        <div className="prose mb-8">
          <p>Crime doesn’t occur in isolation—it often emerges in environments shaped by limited opportunity and persistent neglect.</p>
          <p>In areas historically marked by redlining, crime rates remain elevated even today. But this isn’t about so-called “bad neighborhoods.” It’s about neighborhoods that were systematically overlooked when it came to opportunity and investment.</p>
          <p>Communities facing poor infrastructure, underfunded schools, scarce economic prospects, and minimal support often struggle with cycles of instability.</p>
          <p>Too often, these areas received surveillance instead of support. Punishment instead of prevention. We can’t police our way out of the structural conditions that shaped this reality.</p>
        </div>

        {/* Chart Title */}
        <div className="text-xl font-semibold mb-2"># of Crimes (2022)</div>

        <div className="flex-1 min-h-0 chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }} style={{ backgroundColor: 'transparent' }}>
              <XAxis dataKey="area" interval={0} angle={-45} textAnchor="end" height={60} tick={{ fill: '#333' }} />
              <Tooltip labelFormatter={() => ''} />
              <Legend payload={( ['A','B','C','D'] as Grade[] ).map(g => ({ value: `Grade ${g}`, type: 'square', color: gradeColor[g] }))} />
              <Bar dataKey="count" name="Crime Count" barSize={8}>
                {data.map((entry, i) => <Cell key={i} fill={gradeColor[entry.grade]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </section>
  );
}
