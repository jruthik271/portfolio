import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const MOCK_BLOGS = [
  {
    title: 'Understanding React Server Components',
    date: 'Oct 15, 2023',
    readTime: '5 min read',
    category: 'React',
    excerpt: 'A deep dive into how React Server Components work and why they represent the future of React development.',
  },
  {
    title: 'Mastering Tailwind CSS Animations',
    date: 'Nov 02, 2023',
    readTime: '8 min read',
    category: 'CSS',
    excerpt: 'Learn how to create complex, performant animations using only Tailwind CSS utility classes.',
  },
  {
    title: 'Building Scalable Node.js Backends',
    date: 'Dec 10, 2023',
    readTime: '12 min read',
    category: 'Node.js',
    excerpt: 'Architecture patterns and best practices for building enterprise-grade backend systems with Node.js.',
  }
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Recent <span className="text-[var(--color-accent)]">Writings</span></h2>
          <p className="text-foreground/60 max-w-2xl text-lg">Thoughts, learnings, and technical deep-dives.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOGS.map((blog, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border p-6 rounded-2xl flex flex-col group hover:bg-card-hover hover:border-[var(--color-accent)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center space-x-4 text-xs text-foreground/50 mb-4 font-medium uppercase tracking-wider relative z-10">
                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {blog.date}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {blog.readTime}</span>
              </div>
              
              <span className="text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-1 rounded w-fit mb-3 relative z-10">{blog.category}</span>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors relative z-10">{blog.title}</h3>
              <p className="text-foreground/60 text-sm mb-6 flex-grow relative z-10">{blog.excerpt}</p>
              
              <a href="#" className="flex items-center text-sm font-bold text-[var(--color-accent)] group/link relative z-10 w-fit">
                Read article <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
