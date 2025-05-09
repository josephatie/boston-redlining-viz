// src/slides/07-mental-distress/MentalChart.tsx
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend, Cell } from 'recharts';
import './mental.css';

// Define row structure
type DistressRow = {
  grade: 'A' | 'B' | 'C' | 'D';
  label: string;
  mental_distress_pct: number;
};

// Static data
const data: DistressRow[] = [
  { grade: 'A', label: 'A1', mental_distress_pct: 11.5 },
  { grade: 'B', label: 'B2', mental_distress_pct: 17.9 },
  { grade: 'B', label: 'B3', mental_distress_pct: 13.15 },
  { grade: 'B', label: 'B4', mental_distress_pct: 13.65 },
  { grade: 'B', label: 'B5', mental_distress_pct: 12.0 },
  { grade: 'B', label: 'B6', mental_distress_pct: 16.1 },
  { grade: 'B', label: 'B8', mental_distress_pct: 18.6 },
  { grade: 'C', label: 'C1', mental_distress_pct: 17.57 },
  { grade: 'C', label: 'C10', mental_distress_pct: 21.34 },
  { grade: 'C', label: 'C11', mental_distress_pct: 19.5 },
  { grade: 'C', label: 'C12', mental_distress_pct: 14.4 },
  { grade: 'C', label: 'C14', mental_distress_pct: 16.33 },
  { grade: 'C', label: 'C16', mental_distress_pct: 15.5 },
  { grade: 'C', label: 'C17', mental_distress_pct: 16.86 },
  { grade: 'C', label: 'C3', mental_distress_pct: 19.2 },
  { grade: 'C', label: 'C5', mental_distress_pct: 16.3 },
  { grade: 'C', label: 'C6', mental_distress_pct: 21.5 },
  { grade: 'C', label: 'C7', mental_distress_pct: 15.7 },
  { grade: 'C', label: 'C8', mental_distress_pct: 20.62 },
  { grade: 'C', label: 'C9', mental_distress_pct: 17.83 },
  { grade: 'D', label: 'D1', mental_distress_pct: 17.03 },
  { grade: 'D', label: 'D10', mental_distress_pct: 18.08 },
  { grade: 'D', label: 'D11', mental_distress_pct: 15.73 },
  { grade: 'D', label: 'D12', mental_distress_pct: 18.9 },
  { grade: 'D', label: 'D2', mental_distress_pct: 15.28 },
  { grade: 'D', label: 'D3', mental_distress_pct: 20.55 },
  { grade: 'D', label: 'D4', mental_distress_pct: 18.4 },
  { grade: 'D', label: 'D5', mental_distress_pct: 16.03 },
  { grade: 'D', label: 'D6', mental_distress_pct: 17.9 },
  { grade: 'D', label: 'D7', mental_distress_pct: 15.54 },
  { grade: 'D', label: 'D8', mental_distress_pct: 21.14 },
  { grade: 'D', label: 'D9', mental_distress_pct: 21.5 }
];

// Color palette
const COLOR_MAP: Record<DistressRow['grade'], string> = {
  A: '#5c8546',
  B: '#59829c',
  C: '#C4B968',
  D: '#c0747c'
};

// Neighborhood names mapping
const neighborhoodMap: Record<string, string> = {
  A1: 'Jamaica Plain',
  B2: 'Brighton',
  B3: 'Back Bay',
  B4: 'Jamaica Plain',
  B5: 'West Roxbury',
  B6: 'Forest Hills',
  B8: 'Ashmont',
  C1: 'Brighton',
  C3: 'East Boston',
  C5: 'Back Bay',
  C6: 'Fenway',
  C7: 'South Boston',
  C8: 'Dorchester',
  C9: 'Dorchester',
  C10: 'Dorchester',
  C11: 'Mattapan',
  C12: 'Jamaica Plain',
  C14: 'Roslindale',
  C16: 'West Roxbury',
  C17: 'Hyde Park',
  D1: 'Allston',
  D2: 'Charlestown',
  D3: 'East Boston',
  D4: 'East Boston',
  D5: 'North End',
  D6: 'Beacon Hill',
  D7: 'South End',
  D8: 'Roxbury',
  D9: 'Roxbury',
  D10: 'South Boston',
  D11: 'South Boston',
  D12: 'Dorchester'
};

export default function MentalChart() {
  const sortedData = [...data].sort((a, b) => a.mental_distress_pct - b.mental_distress_pct);
  const legendPayload = Object.entries(COLOR_MAP).map(([grade, color]) => ({
    value: `Grade ${grade}`,
    id: grade,
    type: 'square' as any,
    color
  }));

  return (
    <section className="relative w-screen h-screen bg-[#d9d9d9] text-black flex items-center">

      {/* Chart half, vertically & horizontally centered */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center px-6">
        <h3 className="text-3xl text-black mb-6 text-center">
          Mental Distress by Neighborhood
        </h3>
        <div className="w-full h-3/4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 20, right: 20, left: 50, bottom: 100 }}
            >
              <XAxis
                dataKey="label"
                tickFormatter={code => neighborhoodMap[code] || code}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={100}
                stroke="#ffffff"
                tick={{ fill: '#000000', fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                labelFormatter={() => ''}
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                itemStyle={{ color: '#ffffff' }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Legend
                payload={legendPayload}
                verticalAlign="top"
                align="center"
                wrapperStyle={{ color: '#ffffff', marginBottom: '10px' }}
              />
              <Bar dataKey="mental_distress_pct" name="% Mental Distress">
                {sortedData.map((row, idx) => (
                  <Cell key={idx} fill={COLOR_MAP[row.grade]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Text half, vertically centered */}
      <div className="w-1/2 h-full flex flex-col justify-center px-6 space-y-4 text-lg leading-relaxed">
        <p>
          We often talk about redlining’s economic legacy. But what about its <strong>psychological imprint</strong>?
        </p>
        <p>
          In 2022, residents of areas historically graded <strong>C and D</strong> reported higher levels of mental distress, including anxiety, depression, and chronic stress.
        </p>
        <p>
          While we can’t draw a direct causal line, these patterns raise important questions. Many of these communities have experienced longstanding disinvestment—in schools, in housing, in access to opportunity. Living in such environments can take a toll over time.
        </p>
        <p>
          Imagine growing up where resources are limited, stability is fragile, and violence feels near. These are not just external stressors—they can become internal burdens.
        </p>
        <p>
          Structural inequality doesn’t just shape our cities. It can shape how people feel, cope, and hope.
        </p>
      </div>
    </section>
  );
}