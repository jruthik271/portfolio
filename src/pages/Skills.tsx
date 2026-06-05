import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tight">
            Technical <span className="text-[var(--color-accent)]">Arsenal</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Core programming languages, frameworks, databases, and engineering tools I leverage to engineer solutions.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioConfig.skills.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="bg-card/45 border border-border/80 rounded-3xl p-8 shadow-xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:border-[var(--color-accent)]/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
            >
              {/* Subtle top edge shine */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <h3 className="text-xl font-black mb-8 border-b border-border/60 pb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {cat.title}
              </h3>
              
              <div className="space-y-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs sm:text-sm tracking-wide text-foreground/80">
                        {skill.name}
                      </span>
                      <span className="text-[10px] sm:text-xs font-black text-[var(--color-accent)]">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Floating progress bar track */}
                    <div className="h-2 w-full bg-background/80 border border-border/40 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + (sIdx * 0.08), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-[var(--color-accent)] rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
