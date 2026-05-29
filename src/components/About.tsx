import { motion } from 'framer-motion';
import { Compass, Globe, Rocket, CheckCircle, Terminal, Github, Linkedin } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { Link } from 'react-router-dom';

export default function About() {
  const techStack = [
    'React', 'Next.js', 'Node.js', 'Python', 'Java', 
    'TypeScript', 'Flutter', 'Dart', 'MongoDB', 'MySQL', 'Git'
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Background soft glow shader */}
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Picture frame with floating stats cards (Matching Picture 2) */}
          <div className="w-full lg:w-[45%] flex justify-center relative">
            
            {/* Top Subtitle Button (Matching Picture 2) */}
            <div className="absolute -top-10 left-4 z-20">
              <span className="px-4 py-1.5 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 rounded-full text-[10px] font-black tracking-widest uppercase text-[var(--color-accent)] flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Compass size={12} className="animate-spin-slow" /> About Me
              </span>
            </div>

            {/* Main Portrait Card Layout */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative w-full max-w-[380px] rounded-[32px] border border-white/10 bg-white/[0.02] p-4 shadow-2xl backdrop-blur-md group overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-background border border-border flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}avatar.png`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fb = parent.querySelector('.avatar-fallback');
                      if (fb) fb.classList.remove('hidden');
                    }
                  }}
                  alt="Sumanth's Setup"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* SVG avatar fallback */}
                <div className="avatar-fallback hidden flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-tr from-[var(--color-accent)]/10 to-blue-500/10 text-[var(--color-accent)]">
                  <svg className="w-16 h-16 opacity-50 mb-3 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 14a5 5 0 100-10 5 5 0 000 10zM12 17c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/50">J. Sumanth</span>
                  <span className="text-[8px] text-[var(--color-accent)] font-bold mt-1 uppercase tracking-widest font-mono">&lt;AI/ML & DEV&gt;</span>
                </div>

                {/* Bottom details tag overlay on photo (Matching Picture 2) */}
                <div className="absolute bottom-4 left-4 right-4 bg-background/85 border border-border/80 p-4 rounded-2xl backdrop-blur-xl z-20 shadow-xl">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{portfolioConfig.personal.fullName}</h4>
                  <p className="text-[9px] text-[var(--color-accent)] font-black uppercase tracking-widest mt-0.5">
                    {portfolioConfig.personal.subRole} & Dev
                  </p>
                  <p className="text-[8px] text-foreground/45 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                    <Globe size={10} /> Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Floating Badges Overlay (Matching Picture 2 - Vertical Stack on the Right) */}
              <div className="absolute top-8 -right-12 sm:-right-16 flex flex-col gap-3 z-30 pointer-events-auto">
                {/* Badge 1: Hours Coded */}
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="bg-background/90 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3 cursor-pointer min-w-[170px]"
                >
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                    <Terminal size={14} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-white leading-none">1,200+</span>
                    <span className="text-[8px] text-foreground/40 font-bold uppercase tracking-wider mt-0.5 block">Hours Coded</span>
                  </div>
                </motion.div>

                {/* Badge 2: Projects Shipped */}
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="bg-background/90 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3 cursor-pointer min-w-[170px]"
                >
                  <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 shrink-0">
                    <Rocket size={14} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-white leading-none">3+</span>
                    <span className="text-[8px] text-foreground/40 font-bold uppercase tracking-wider mt-0.5 block">Projects Shipped</span>
                  </div>
                </motion.div>

                {/* Badge 3: DSA Problems */}
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="bg-background/90 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3 cursor-pointer min-w-[170px]"
                >
                  <div className="p-2 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                    <CheckCircle size={14} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-white leading-none">150+</span>
                    <span className="text-[8px] text-foreground/40 font-bold uppercase tracking-wider mt-0.5 block">DSA Problems</span>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Descriptions & Tech Grid (Matching Picture 2) */}
          <div className="w-full lg:w-[55%] text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <h2 className="text-3xl sm:text-5xl font-black mb-6 uppercase tracking-tight text-white leading-[1.05]">
                Turning Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">Reality</span>
              </h2>

              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                I'm an <strong className="text-[var(--color-accent)] font-black">AI/ML Undergraduate</strong> & Full Stack Developer passionate about building digital products that make a difference. From building roadside assistance apps to deploying scaling APIs, I enjoy turning complex algorithms into elegant solutions. My focus is on creating scalable, user-centric applications using modern technologies.
              </p>

              {/* Technology Badges Grid */}
              <div className="mb-10 w-full">
                <h3 className="text-[10px] font-black tracking-widest text-foreground/45 uppercase mb-4 border-b border-border/30 pb-2">
                  TECHNOLOGIES I WORK WITH
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[var(--color-accent)]/30 rounded-xl text-xs font-bold text-foreground/75 hover:text-white uppercase tracking-wider transition-colors duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-6">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-black tracking-widest text-xs uppercase shadow-[0_4px_25px_rgba(168,85,247,0.15)] hover:bg-[var(--color-accent)]/90 hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  Let's Connect <ArrowUpRight size={14} className="ml-2" />
                </Link>

                {/* Social links row */}
                <div className="flex items-center space-x-3">
                  <a
                    href={portfolioConfig.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/45 hover:text-white p-2 border border-border/80 rounded-full hover:border-[var(--color-accent)]/30 transition-all duration-300"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={portfolioConfig.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/45 hover:text-white p-2 border border-border/80 rounded-full hover:border-[var(--color-accent)]/30 transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Arrow helper for buttons
const ArrowUpRight = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
