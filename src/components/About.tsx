import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, ArrowUpRight, Compass } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

const TABS = ['Experience', 'Education', 'Certifications'] as const;
type TabType = typeof TABS[number];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('Experience');

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Visual background splash */}
      <div className="absolute top-[30%] right-[-10%] w-80 h-80 bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Brand/Narrative Left Column */}
          <div className="lg:w-[40%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-5xl font-black mb-6 uppercase tracking-tight leading-none">
                Behind The <span className="text-[var(--color-accent)]">Code</span>
              </h2>
              
              {/* Premium Card Display */}
              <div className="aspect-square w-full max-w-[360px] rounded-3xl overflow-hidden bg-card border border-border p-8 mb-8 shadow-2xl relative group flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="Sumanth's Setup"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                
                <div className="text-center relative z-20">
                  <div className="w-16 h-16 rounded-2xl bg-background/80 border border-border/80 text-[var(--color-accent)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Compass size={28} className="animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-black tracking-widest text-white uppercase font-mono mb-1">
                    &lt;{portfolioConfig.personal.name}&gt;
                  </h3>
                  <p className="text-[10px] text-[var(--color-accent)] font-black tracking-widest uppercase">
                    {portfolioConfig.personal.subRole}
                  </p>
                </div>
              </div>

              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                I am a dedicated Artificial Intelligence and Machine Learning undergraduate. I have strong core foundations in AI architectures, Machine Learning, and algorithms, while enjoying fullstack app development using Flutter and server frameworks.
              </p>
            </motion.div>
          </div>

          {/* Dynamic Interactive Drawer Right Column */}
          <div className="lg:w-[60%] flex flex-col">
            
            {/* Elegant Tab Headers */}
            <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 border-b border-border/60">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3.5 rounded-2xl font-black tracking-wider text-xs uppercase whitespace-nowrap transition-all duration-300 relative ${
                      isActive ? 'text-white' : 'text-foreground/45 hover:text-foreground hover:bg-card/40'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {tab === 'Experience' && <Briefcase size={14} />}
                      {tab === 'Education' && <GraduationCap size={14} />}
                      {tab === 'Certifications' && <Award size={14} />}
                      {tab}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeAboutTabIndicator"
                        className="absolute inset-0 bg-[var(--color-accent)] rounded-2xl shadow-[0_4px_20px_rgba(168,85,247,0.25)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Display Card */}
            <div className="flex-1 bg-card/45 border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm min-h-[420px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex-grow flex flex-col justify-center"
                >
                  
                  {/* Experience Timeline Tab */}
                  {activeTab === 'Experience' && (
                    <div className="space-y-8">
                      {portfolioConfig.experiences.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 border-l-2 border-[var(--color-accent)]/20">
                          <div className="absolute w-4 h-4 bg-background border-[3px] border-[var(--color-accent)] rounded-full -left-[9px] top-1.5 shadow-[0_0_10px_var(--color-accent)]"></div>
                          
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h4 className="text-xl sm:text-2xl font-black text-white">
                              {exp.role}
                            </h4>
                            <span className="px-3 py-1 bg-white/5 border border-border/60 rounded-full text-[10px] font-black tracking-wider uppercase text-foreground/50">
                              {exp.duration}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-[var(--color-accent)] font-black tracking-widest uppercase mb-4">
                            {exp.company}
                          </p>
                          
                          <ul className="text-foreground/60 text-sm leading-relaxed space-y-3.5 font-medium">
                            {exp.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start">
                                <span className="text-[var(--color-accent)] mr-3 font-black text-xs select-none">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === 'Education' && (
                    <div className="space-y-8">
                      {portfolioConfig.education.map((edu, idx) => (
                        <div key={idx} className="relative pl-8 border-l-2 border-[var(--color-accent)]/20">
                          <div className="absolute w-4 h-4 bg-background border-[3px] border-[var(--color-accent)] rounded-full -left-[9px] top-1.5 shadow-[0_0_10px_var(--color-accent)]"></div>
                          
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h4 className="text-xl sm:text-2xl font-black text-white">
                              {edu.degree}
                            </h4>
                            <span className="px-3 py-1 bg-white/5 border border-border/60 rounded-full text-[10px] font-black tracking-wider uppercase text-foreground/50">
                              {edu.duration}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-[var(--color-accent)] font-black tracking-widest uppercase mb-4">
                            {edu.school} — {edu.location}
                          </p>
                          
                          <div className="bg-background/55 border border-border/60 rounded-2xl p-6 flex items-center justify-between shadow-inner max-w-sm mt-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-0.5">Academic Standing</span>
                              <span className="text-xs font-black text-foreground/65">Current Cumulative GPA</span>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-black text-white font-mono tracking-tighter">
                                {edu.gpa.split(' ')[0]}
                              </span>
                              <span className="text-[10px] text-foreground/40 font-bold ml-1">/ 10</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certifications Tab */}
                  {activeTab === 'Certifications' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolioConfig.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="bg-background/45 border border-border/60 hover:border-[var(--color-accent)]/30 p-5 rounded-2xl flex items-center justify-between group/cert transition-all duration-300 shadow-lg relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--color-accent)]/5 blur-xl rounded-full opacity-0 group-hover/cert:opacity-100 transition-opacity"></div>
                          
                          <div className="flex items-center gap-4 relative z-10">
                            <span className="text-2xl select-none filter drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">🏆</span>
                            <h5 className="font-bold text-xs sm:text-sm text-foreground/80 leading-snug group-hover/cert:text-white transition-colors">
                              {cert}
                            </h5>
                          </div>
                          
                          <ArrowUpRight size={14} className="text-foreground/35 group-hover/cert:text-[var(--color-accent)] group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 transition-all shrink-0 ml-3" />
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
