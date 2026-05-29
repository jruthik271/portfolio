import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function Blogs() {
  return (
    <section id="blogs" className="py-24 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tight">
            Recent <span className="text-[var(--color-accent)]">Writings</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl text-base sm:text-lg font-medium">
            Thoughts, technical guides, architectural discoveries, and development deep-dives.
          </p>
        </motion.div>

        {/* Blogs cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioConfig.blogs.map((blog, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="bg-card/45 border border-border/80 p-6 sm:p-8 rounded-3xl flex flex-col group hover:bg-card-hover hover:border-[var(--color-accent)]/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm shadow-xl min-h-[300px]"
            >
              {/* Radial backdrop overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center space-x-4 text-[10px] text-foreground/45 mb-4 font-black uppercase tracking-wider relative z-10">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" /> {blog.date}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {blog.readTime}</span>
              </div>
              
              <span className="text-[9px] font-black text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-2.5 py-1 rounded-lg w-fit mb-4 relative z-10 tracking-widest uppercase">
                {blog.category}
              </span>
              
              <h3 className="text-xl font-black mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 relative z-10 leading-snug text-white">
                {blog.title}
              </h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow relative z-10 font-medium leading-relaxed">
                {blog.excerpt}
              </p>
              
              <a
                href="#"
                className="flex items-center text-xs font-black text-[var(--color-accent)] uppercase tracking-wider group/link relative z-10 w-fit pt-4 border-t border-border/30 w-full"
              >
                Read Article
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1.5 transition-transform" />
              </a>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
