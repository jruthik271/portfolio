import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-card border border-[var(--color-accent)]/30 px-4 py-2 rounded-full mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]"></span>
          </span>
          <span className="text-sm font-medium text-[var(--color-accent)] tracking-wide">Available for Internship</span>
        </motion.div>

        {/* Main Typography */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">R P G Sumanth</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50">AI/ML & Flutter Dev.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Artificial Intelligence and Machine Learning undergraduate building AI-powered, real-time, and full-stack applications using Flutter, cloud services, and APIs.
        </motion.p>

        {/* Social Icons */}
        <motion.div 
          className="flex justify-center space-x-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <a href="https://github.com/jruthik271" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all">
            <Github size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all">
            <Linkedin size={24} />
          </a>
          <a href="mailto:jruthik271@gmail.com" className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all">
            <Mail size={24} />
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a href="#about" className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-[var(--color-accent)] text-white px-8 py-4 font-bold tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_var(--color-accent)] transition-all">
            <span className="relative z-10 flex items-center justify-center">
              EXPLORE PROFILE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="http://localhost:5000/api/resume/download" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto rounded-full bg-card border border-border text-foreground px-8 py-4 font-bold tracking-widest text-sm transition-all hover:bg-card-hover flex items-center justify-center">
            DOWNLOAD CV <Download className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        {/* Developer Stats Integration */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto border-t border-border/50 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {[
            { label: 'Role', value: 'Intern' },
            { label: 'Primary Tech', value: 'Flutter' },
            { label: 'Major', value: 'AI / ML' },
            { label: 'Focus', value: 'Full-Stack' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h4 className="text-xl md:text-2xl font-black text-foreground mb-1 group-hover:scale-110 transition-transform">{stat.value}</h4>
              <p className="text-xs text-[var(--color-accent)] font-bold tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
