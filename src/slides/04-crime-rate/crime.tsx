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
  { area: 'Forest Hills',  count: 55,    grade: 'A' },
  { area: 'Jamaica Plain',  count: 294,   grade: 'A' },
  { area: 'Jamaica Plain',  count: 296,   grade: 'B' },
  { area: 'Brighton',  count: 316,   grade: 'B' },
  { area: 'West Roxbury',  count: 537,   grade: 'B' },
  { area: 'Ashmont',  count: 557,   grade: 'B' },
  { area: 'East Boston',  count: 604,   grade: 'C' },
  { area: 'Back Bay',  count: 707,   grade: 'B' },
  { area: 'South Boston',  count: 893,   grade: 'C' },
  { area: 'North End',  count: 958,   grade: 'C' },
  { area: 'Back Bay',  count: 1008,  grade: 'C' },
  { area: 'Beacon Hill',  count: 1036,  grade: 'C' },
  { area: 'West Roxbury',  count: 1090,  grade: 'C' },
  { area: 'Allston',  count: 1133,  grade: 'D' },
  { area: 'South Boston',  count: 1261,  grade: 'D' },
  { area: 'Jamaica Plain',  count: 1739,  grade: 'C' },
  { area: 'East Boston',  count: 2074,  grade: 'D' },
  { area: 'Charlestown',  count: 2246,  grade: 'D' },
  { area: 'Fenway',  count: 4496,  grade: 'C' },
  { area: 'East Boston',  count: 4649,  grade: 'D' },
  { area: 'South Boston',  count: 5212,  grade: 'D' },
  { area: 'Dorchester',  count: 5618,  grade: 'C' },
  { area: 'Mattapan',  count: 5668,  grade: 'C' },
  { area: 'Hyde Park',  count: 6086,  grade: 'C' },
  { area: 'Roslindale',  count: 6933,  grade: 'C' },
  { area: 'Dorchester',  count: 7857,  grade: 'D' },
  { area: 'Brighton',  count: 9677,  grade: 'C' },
  { area: 'Dorchester',  count: 9800,  grade: 'C' },
  { area: 'Roxbury',  count: 10078, grade: 'D' },
  { area: 'South End',  count: 11918, grade: 'D' },
  { area: 'Roxbury',  count: 14326, grade: 'D' },
  { area: 'Dorchester',  count: 14785, grade: 'C' }
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
      <section className="w-screen h-screen bg-gray-200 flex flex-col">
        <h2 className="sticky top-0 w-full bg-white font-serif font-bold text-3xl md:text-4xl px-6 py-4 z-20">
          Crime
        </h2>
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-1/2 flex justify-center items-center p-6 bg-gray-200 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {neighborhoods.map((nb, idx) => (
                <div key={nb.id} className="w-72 h-80 cursor-pointer group" onClick={() => handleFlip(idx)} style={{ perspective: '1200px' }}>
                  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: flipped[idx] ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s ease-in-out' }}>
                    <div className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden bg-white" style={{ backfaceVisibility: 'hidden' }}>
                      <img src={nb.imageUrl} alt={nb.name} className="w-full h-3/4 object-cover filter grayscale group-hover:grayscale-0 transition-filter duration-300 ease-in-out" />
                      <div className="p-4 bg-white h-1/4 flex flex-col justify-center font-serif text-black">
                        <h3 className="text-lg font-bold">{nb.name}</h3>
                        <p className="text-base text-gray-700">{nb.stat}</p>
                      </div>
                    </div>
                    <div className="absolute w-full h-full rounded-2xl shadow-xl bg-white p-4 overflow-y-auto font-serif text-black" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                      <h3 className="text-lg font-bold mb-2">{nb.name} Story</h3>
                      <p className="text-base leading-relaxed">{nb.story}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
    
          <main className="w-1/2 p-8 flex flex-col bg-gray-200 font-serif text-black overflow-y-auto" style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem' }}>
            <div className="prose mb-6">
              <p>Crime doesn’t occur in isolation—it often emerges in environments shaped by limited opportunity and persistent neglect.</p>
              <p>In areas historically marked by redlining, crime rates remain elevated even today. But this isn’t about so-called “bad neighborhoods.” It’s about neighborhoods that were systematically overlooked when it came to opportunity and investment.</p>
              <p>Communities facing poor infrastructure, underfunded schools, scarce economic prospects, and minimal support often struggle with cycles of instability.</p>
              <p>Too often, these areas received surveillance instead of support. Punishment instead of prevention. We can’t police our way out of the structural conditions that shaped this reality.</p>
            </div>
    
            <div className="text-xl font-semibold mb-2"># of Crimes (2022)</div>
    
            <div className="bg-white p-4 rounded-lg shadow chart-wrapper" style={{ height: 600 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 20, left: 40, bottom: 80 }}
                >
                  <XAxis
                    dataKey="area"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fill: '#333' }}
                    tickLine={false}
                  />
                  <Tooltip labelFormatter={() => ''} formatter={(value: number) => [`${value}`, '#']} />
                  <Bar dataKey="count" name="Crime Count" barSize={8}>
                    {data.map((entry, i) => (
                      <Cell key={i} fill={gradeColor[entry.grade]} />
                    ))}
                  </Bar>
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    height={36}
                    wrapperStyle={{ bottom: -20 }}
                    payload={( ['A','B','C','D'] as Grade[] ).map(g => ({ value: `Grade ${g}`, type: 'square', color: gradeColor[g] }))}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </section>
    );
  }