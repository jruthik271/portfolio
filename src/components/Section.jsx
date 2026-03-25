import { motion } from 'framer-motion'

export const Section = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}
