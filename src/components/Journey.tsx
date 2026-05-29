import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Globe, Database, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

interface LeetcodeStatsAPI {
  solvedTotal: number;
  solvedEasy: number;
  solvedMedium: number;
  solvedHard: number;
  globalRank: number;
  contestRating: number;
  streak: number;
}

export default function Journey() {
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeStatsAPI | null>(null);
  const [activeTab, setActiveTab] = useState('leetcode');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetcodeStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/leetcode/stats');
        if (res.ok) {
          const data = await res.json();
          setLeetcodeData(data);
        }
      } catch (err) {
        console.warn('Failed to fetch leetcode stats from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeetcodeStats();
  }, []);

  const platforms = [
    { id: 'leetcode', name: 'LeetCode', icon: Code2, profile: 'jruthik271', link: portfolioConfig.socials.leetcode },
    { id: 'github', name: 'GitHub', icon: Globe, profile: 'jruthik271', link: portfolioConfig.socials.github },
    { id: 'codechef', name: 'CodeChef', icon: Terminal, profile: 'jruthik271', link: portfolioConfig.socials.codechef },
    { id: 'hackerrank', name: 'HackerRank', icon: Database, profile: 'jruthik271', link: portfolioConfig.socials.hackerrank },
  ];

  const currentPlatform = platforms.find(p => p.id === activeTab) || platforms[0];

  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>

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
            Coding <span className="text-[var(--color-accent)]">Journey</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl text-base sm:text-lg font-medium">
            My active open-source footprints, problem-solving stats, and competitive profiles.
          </p>
        </motion.div>

        {/* Sidebar Dock Container */}
        <div className="flex flex-col lg:flex-row gap-8 bg-card/45 border border-border/80 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          
          {/* Vertical/Horizontal Sidebar */}
          <div className="lg:w-64 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 shrink-0 border-b lg:border-b-0 lg:border-r border-border/60 lg:pr-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isActive = activeTab === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`flex items-center p-4 rounded-2xl transition-all duration-300 w-full whitespace-nowrap border ${
                    isActive
                      ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 text-[var(--color-accent)] font-black'
                      : 'border-transparent text-foreground/50 hover:bg-card hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-4 shrink-0" />
                  <span className="text-xs font-black tracking-widest uppercase">{platform.name}</span>
                </button>
              );
            })}
          </div>

          {/* Details Content Display */}
          <div className="flex-1 min-h-[320px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col justify-between"
              >
                
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-2xl bg-background/80 border border-border flex items-center justify-center mr-6 shadow-inner text-[var(--color-accent)] shrink-0">
                      <currentPlatform.icon size={30} className="animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">{currentPlatform.name}</h3>
                      <p className="text-[10px] text-[var(--color-accent)] font-black uppercase tracking-widest">{currentPlatform.profile}</p>
                    </div>
                  </div>
                  
                  {currentPlatform.link !== '#' && (
                    <a
                      href={currentPlatform.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-border/80 hover:border-[var(--color-accent)]/30 rounded-full text-[10px] font-black tracking-widest uppercase text-foreground/50 hover:text-white transition-all group"
                    >
                      View Profile <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* LeetCode Specific Stats */}
                  {activeTab === 'leetcode' && (
                    <>
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent)]/5 blur-xl rounded-full"></div>
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Total Solved</p>
                        <p className="text-4xl font-black text-white font-mono tracking-tighter">
                          {loading ? '154' : leetcodeData?.solvedTotal || '154'}
                        </p>
                        {leetcodeData && (
                          <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-foreground/40 mt-3 pt-3 border-t border-border/30">
                            <span className="text-green-500 font-bold">E: {leetcodeData.solvedEasy}</span>
                            <span className="text-yellow-500 font-bold">M: {leetcodeData.solvedMedium}</span>
                            <span className="text-red-500 font-bold">H: {leetcodeData.solvedHard}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent)]/5 blur-xl rounded-full"></div>
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Global Ranking</p>
                        <p className="text-4xl font-black text-white font-mono tracking-tighter">
                          {loading ? '185k' : leetcodeData?.globalRank ? `${Math.round(leetcodeData.globalRank / 1000)}k` : '185k'}
                        </p>
                        {leetcodeData && leetcodeData.contestRating > 0 && (
                          <div className="text-[9px] font-bold text-[var(--color-accent)] mt-3 pt-3 border-t border-border/30">
                            CONTEST RATING: {leetcodeData.contestRating}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* GitHub Specific Stats */}
                  {activeTab === 'github' && (
                    <>
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent)]/5 blur-xl rounded-full"></div>
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Primary Focus</p>
                        <p className="text-3xl font-black text-white font-mono uppercase tracking-tighter">Open Source</p>
                      </div>
                      
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent)]/5 blur-xl rounded-full"></div>
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Status Metrics</p>
                        <p className="text-3xl font-black text-white font-mono uppercase tracking-tighter">Active Sync</p>
                      </div>
                    </>
                  )}

                  {/* Fallback Competitive Platforms */}
                  {activeTab !== 'leetcode' && activeTab !== 'github' && (
                    <>
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group">
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Performance / Stats</p>
                        <p className="text-4xl font-black text-white font-mono tracking-tighter">Active</p>
                      </div>
                      
                      <div className="bg-background/45 border border-border/60 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group">
                        <p className="text-foreground/45 text-[10px] font-black uppercase tracking-widest mb-2">Rank Rating</p>
                        <p className="text-4xl font-black text-white font-mono tracking-tighter">Profiled</p>
                      </div>
                    </>
                  )}

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
