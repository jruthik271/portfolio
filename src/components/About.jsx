import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Experience', 'Education', 'Certifications'];

export default function About() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Narrative side */}
          <div className="md:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Behind The <span className="text-[var(--color-accent)]">Code</span></h2>
              <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-border mb-8 shadow-2xl relative group flex items-center justify-center p-8">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" alt="Code setup" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 bg-[var(--color-accent)]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10"></div>
                <div className="text-center relative z-20">
                  <h3 className="text-4xl font-black text-foreground mb-4 font-mono">&lt;AI/ML&gt;</h3>
                  <p className="text-xl text-foreground/80 font-bold tracking-widest uppercase">Undergraduate</p>
                </div>
              </div>
              <p className="text-foreground/70 text-lg leading-relaxed">
                I am an Artificial Intelligence and Machine Learning undergraduate at Aditya Engineering College. I have strong foundations in AI Agents, Machine Learning Algorithms, and data structures. I enjoy building applications using Flutter and exploring cloud integrations.
              </p>
            </motion.div>
          </div>

          {/* Tabbed Content Side */}
          <div className="md:w-7/12 flex flex-col">
            <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 border-b border-border">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 rounded-xl font-bold tracking-wide text-sm whitespace-nowrap transition-all ${
                    activeTab === tab 
                      ? 'bg-[var(--color-accent)] text-white shadow-lg' 
                      : 'text-foreground/50 hover:bg-card hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-card border border-border rounded-3xl p-8 shadow-xl min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'Experience' && (
                    <div className="space-y-8">
                      <div className="relative pl-8 border-l-2 border-[var(--color-accent)]/30">
                        <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full -left-[9px] top-1 ring-4 ring-background"></div>
                        <h4 className="text-xl font-bold text-foreground">Full Stack Developer Intern (Flutter)</h4>
                        <p className="text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-3">Technical Hub • May 2025 - June 2025</p>
                        <ul className="text-foreground/60 list-disc ml-4 space-y-2">
                          <li>Developed <strong>Mecha-Connect</strong>, an on-demand roadside assistance mobile app using <strong>Flutter and Dart</strong>.</li>
                          <li>Implemented real-time GPS tracking using Google Maps API connecting verified mechanics.</li>
                          <li>Collaborated under industry mentorship and presented the project to multiple teams.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Education' && (
                    <div className="space-y-8">
                      <div className="relative pl-8 border-l-2 border-[var(--color-accent)]/30">
                        <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full -left-[9px] top-1 ring-4 ring-background"></div>
                        <h4 className="text-xl font-bold text-foreground">B.Tech - Artificial Intelligence and Machine Learning</h4>
                        <p className="text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-3">Aditya Engineering College • Oct 2023 - Present</p>
                        <p className="text-foreground/60">Surampalem, India. Current GPA: 8.06/10.00.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Certifications' && (
                    <div className="space-y-4">
                      {[
                        "Postman API Fundamentals – Student Expert",
                        "Cisco Networking Academy - Python Essentials",
                        "HackerRank Certifications: Python, C, SQL, Problem Solving",
                        "MongoDB Node.js Developer Certification",
                        "GitHub Foundations Certifications"
                      ].map((cert, idx) => (
                        <div key={idx} className="bg-background border border-border p-4 rounded-xl flex items-center">
                          <span className="text-[var(--color-accent)] mr-4 text-xl">🏆</span>
                          <h5 className="font-bold text-sm text-foreground/90">{cert}</h5>
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
  )
}
