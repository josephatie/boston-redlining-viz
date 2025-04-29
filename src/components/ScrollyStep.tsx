import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const ScrollyStep: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: true });
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollyStep;
