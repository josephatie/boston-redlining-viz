// src/components/AnimatedBarChart.tsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

// Define the props our chart will accept
interface AnimatedBarChartProps {
  dataKey: string; // the field in each data object to chart
}

// Sample data for each grade — in practice you’ll fetch or pass in real data
interface DataItem {
  grade: string;
  unemployment: number;
  income: number;
  // add other metrics here as needed
}

const sampleData: DataItem[] = [
  { grade: 'A', unemployment: 8,  income: 100 },
  { grade: 'B', unemployment: 12, income: 90  },
  { grade: 'C', unemployment: 18, income: 75  },
  { grade: 'D', unemployment: 25, income: 60  },
];

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({ dataKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={sampleData}>
      <XAxis dataKey="grade" />
      <Tooltip />
      {/*
        Wrap the Bar in a motion component so it fades in
      */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Bar dataKey={dataKey} fill="#C0747C" />
      </motion.g>
    </BarChart>
  </ResponsiveContainer>
);

export default AnimatedBarChart;
