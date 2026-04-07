import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Globe, Database } from 'lucide-react';

const platforms = [
  { id: 'leetcode', name: 'LeetCode', icon: Code2, stats: { solved: 'Active', rank: 'Profile', rankLabel: 'jruthik271' } },
  { id: 'github', name: 'GitHub', icon: Globe, stats: { solved: 'Active', rank: 'Repositories', rankLabel: 'jruthik271' } },
  { id: 'codechef', name: 'CodeChef', icon: Terminal, stats: { solved: 'N/A', rank: 'N/A', rankLabel: 'Competitive Profile' } },
  { id: 'hackerrank', name: 'HackerRank', icon: Database, stats: { solved: 'Certs', rank: 'SQL/Python', rankLabel: 'Basic Certifications' } },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState(platforms[0].id);

  const currentPlatform = platforms.find(p => p.id === activeTab);

  return (
    <section id="journey" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Coding <span className="text-[var(--color-accent)]">Journey</span></h2>
          <p className="text-foreground/60 max-w-2xl text-lg">My competitive programming and open-source footprints.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 bg-card border border-border p-4 md:p-6 rounded-3xl shadow-xl">
          {/* Sidebar */}
          <div className="md:w-64 flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 shrink-0 border-b md:border-b-0 md:border-r border-border md:pr-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isActive = activeTab === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`flex items-center p-3 rounded-xl transition-all duration-300 w-full whitespace-nowrap ${
                    isActive ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-foreground/60 hover:bg-card-hover hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 shrink-0" />
                  <span className="font-bold text-sm tracking-wide">{platform.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col justify-center"
              >
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mr-6 shadow-inner text-[var(--color-accent)]">
                    <currentPlatform.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">{currentPlatform.name}</h3>
                    <p className="text-[var(--color-accent)] font-bold text-sm uppercase tracking-widest">{currentPlatform.stats.rankLabel}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-border rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group">
                    <span className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-5 transition-opacity"></span>
                    <p className="text-foreground/50 text-sm font-bold uppercase tracking-wider mb-2">Metrics / Score</p>
                    <p className="text-4xl font-black text-foreground">{currentPlatform.stats.solved}</p>
                  </div>
                  <div className="bg-background border border-border rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group">
                    <span className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-5 transition-opacity"></span>
                    <p className="text-foreground/50 text-sm font-bold uppercase tracking-wider mb-2">Current Standing</p>
                    <p className="text-4xl font-black text-foreground">{currentPlatform.stats.rank}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
