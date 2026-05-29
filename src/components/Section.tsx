import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Elegant ease-out
      className={`py-20 px-6 max-w-7xl mx-auto relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
export default Section;
