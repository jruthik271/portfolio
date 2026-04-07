import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      { name: 'Dart (Primary)', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'C', level: 80 },
    ]
  },
  {
    title: 'Frameworks & BaaS',
    skills: [
      { name: 'Flutter (Mobile/Web)', level: 95 },
      { name: 'Node.js / Express.js', level: 80 },
      { name: 'REST APIs', level: 85 },
      { name: 'Firebase', level: 80 },
    ]
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'MongoDB / Mongoose', level: 85 },
      { name: 'MySQL / Oracle SQL', level: 80 },
      { name: 'Git / Postman', level: 90 },
      { name: 'Data Structures & Algorithms', level: 85 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Technical <span className="text-[var(--color-accent)]">Arsenal</span></h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">Technologies, languages, and tools I use to build solutions.</p>
        </motion.div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all group"
            >
              <h3 className="text-2xl font-black mb-8 border-b border-border pb-4 group-hover:text-[var(--color-accent)] transition-colors">{category.title}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm tracking-wide">{skill.name}</span>
                      <span className="text-xs font-black text-[var(--color-accent)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                        className="h-full bg-[var(--color-accent)] rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
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
