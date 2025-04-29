import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => (
  <motion.section
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="h-screen flex items-center justify-center bg-gray-100"
  >
    <h1 className="text-5xl font-bold">Boston’ss Redlining Legacy</h1>
  </motion.section>
);

export default Hero;
