import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface DataItem { grade: string; value: number; }
const sampleData: DataItem[] = [
  { grade: 'A', value: 8 },
  { grade: 'B', value: 12 },
  { grade: 'C', value: 18 },
  { grade: 'D', value: 25 },
];

const AnimatedBarChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={sampleData}>
      <XAxis dataKey="grade" />
      <Tooltip />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Bar dataKey="value" fill="#C0747C" />
      </motion.g>
    </BarChart>
  </ResponsiveContainer>
);

export default AnimatedBarChart;
