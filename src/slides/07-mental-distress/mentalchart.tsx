// src/slides/07-mental-distress/MentalChart.tsx

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import './mental.css';

// Define row structure
interface DistressRow {
  grade: 'A' | 'B' | 'C' | 'D';
  label: string;
  mental_distress_pct: number;
}

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
  C: '#dace74',
  D: '#c0747c'
};

// Neighborhood names mapping
const neighborhoodMap: Record<string, string> = {
  A1: 'Beacon Hill',
  B2: 'Back Bay',
  B3: 'Bay Village',
  B4: 'Waterfront',
  B5: 'South End',
  B6: 'Chinatown',
  B8: 'North End',
  C1: 'West End',
  C3: 'Downtown',
  C5: 'Leather District',
  C6: 'Mission Hill',
  C7: 'Fenway',
  C8: 'Roxbury',
  C9: 'Jamaica Plain',
  C10: 'Dorchester',
  C11: 'South Boston',
  C12: 'East Boston',
  C14: 'Charlestown',
  C16: 'Mattapan',
  C17: 'West Roxbury',
  D1: 'Allston',
  D2: 'Brighton',
  D3: 'Hyde Park',
  D4: 'Roslindale',
  D5: 'Jamaica Plain',
  D6: 'Mission Hill',
  D7: 'Fenway',
  D8: 'Dorchester',
  D9: 'Dorchester',
  D10: 'South Boston',
  D11: 'East Boston',
  D12: 'Charlestown'
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
    <div className="chart-wrapper">
      <h3 className="chart-title">Mental Distress by Neighborhood</h3>
      <ResponsiveContainer width="100%" height={550}>
        <BarChart data={sortedData} margin={{ top: 40, right: 30, left: 20, bottom: 120 }}>
          <XAxis
            dataKey="label"
            tickFormatter={(code) => neighborhoodMap[code] || code}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={120}
          />
          {/* YAxis removed */}
          <Tooltip formatter={(value: number) => `${value}%`} labelFormatter={() => ''} />
          <Legend payload={legendPayload} verticalAlign="top" align="center" />
          <Bar dataKey="mental_distress_pct" name="% Mental Distress">
            {sortedData.map((row, idx) => (
              <Cell key={idx} fill={COLOR_MAP[row.grade]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-text">
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
    </div>
  );
}