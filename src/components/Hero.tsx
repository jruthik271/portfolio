import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

interface APIStats {
  githubRepos: number;
  leetcodeSolved: number;
}

export default function Hero() {
  const [stats, setStats] = useState<APIStats>({
    githubRepos: 3,
    leetcodeSolved: 154
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [githubRes, leetcodeRes] = await Promise.all([
          fetch('http://localhost:5000/api/github/repos'),
          fetch('http://localhost:5000/api/leetcode/stats')
        ]);

        let repoCount = 3;
        let solved = 154;

        if (githubRes.ok) {
          const repos = await githubRes.json();
          if (Array.isArray(repos)) repoCount = repos.length;
        }

        if (leetcodeRes.ok) {
          const leetcode = await leetcodeRes.json();
          if (leetcode.solvedTotal) solved = leetcode.solvedTotal;
        }

        setStats({
          githubRepos: repoCount,
          leetcodeSolved: solved
        });
      } catch (err) {
        console.warn('Failed to fetch metrics for Hero dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 relative overflow-hidden bg-background">
      {/* Background Soft Glow Shaders */}
      <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative w-full mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Visual Typography & Actions */}
          <div className="w-full lg:w-[60%] text-left flex flex-col items-start order-2 lg:order-1">
            
            {/* Red Availability Badge (Matching Picture 3) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 border border-red-500/40 bg-red-500/5 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-red-400">
                Available for opportunities
              </span>
            </motion.div>

            {/* Title Header (Matching Picture 3 layout) */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 leading-[1.1] text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">{portfolioConfig.personal.name}</span>
              <br />
              <span className="text-white">Software Developer</span>
            </motion.h1>

            {/* Description Subtext */}
            <motion.p
              className="text-foreground/60 text-sm sm:text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              Crafting elegant, scalable digital experiences through modern web technologies. I specialize in full-stack development, building production-ready applications that solve real-world problems.
            </motion.p>

            {/* Metrics Counters Row (Matching Picture 3 stats layout) */}
            <motion.div
              className="flex flex-wrap items-center gap-8 md:gap-12 mb-10 pb-8 border-b border-border/30 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tighter">
                  {loading ? '150+' : `${stats.leetcodeSolved}+`}
                </span>
                <span className="text-[10px] font-black text-foreground/45 uppercase tracking-wider mt-1">
                  LeetCode Problems
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tighter">
                  1+
                </span>
                <span className="text-[10px] font-black text-foreground/45 uppercase tracking-wider mt-1">
                  Month Internship
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tighter">
                  {loading ? '3+' : `${stats.githubRepos}+`}
                </span>
                <span className="text-[10px] font-black text-foreground/45 uppercase tracking-wider mt-1">
                  Projects Delivered
                </span>
              </div>
            </motion.div>

            {/* Actions CTAs Row (Matching Picture 3) */}
            <motion.div
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {/* VIEW RESUME: White Button opening PDF */}
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-black font-black tracking-widest text-xs uppercase shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/90 hover:scale-[1.02] transition-all flex items-center justify-center w-full sm:w-auto text-center"
              >
                <FileText size={14} className="mr-2" /> View Resume
              </a>

              {/* DOWNLOAD RESUME: Red/Accent Button downloading PDF */}
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Jallipalli_Sumanth_Resume.pdf"
                className="px-8 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-black tracking-widest text-xs uppercase shadow-[0_4px_25px_rgba(168,85,247,0.15)] hover:bg-[var(--color-accent)]/90 hover:scale-[1.02] transition-all flex items-center justify-center w-full sm:w-auto text-center border border-transparent hover:border-white/10"
              >
                <Download size={14} className="mr-2" /> Download Resume
              </a>
            </motion.div>

          </div>

          {/* Right Column: Direct Portrait Overlay (Matching Picture 3) */}
          <div className="w-full lg:w-[35%] flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
              className="relative select-none pointer-events-none max-w-[280px] sm:max-w-[320px] w-full"
            >
              {/* Outer soft ambient profile backlighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-blue-500/10 rounded-full blur-[80px] scale-90 pointer-events-none"></div>

              {/* Portrait Holder with Glassmorphic Shimmer Rim */}
              <div className="relative aspect-[3/4] w-full rounded-[32px] border border-white/10 p-2.5 bg-white/[0.03] backdrop-blur-md shadow-2xl overflow-hidden flex items-center justify-center group">
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
                  alt="Sumanth Portrait"
                  className="w-full h-full object-cover rounded-[24px]"
                />

                {/* Vector developer fallback inside glass rim */}
                <div className="avatar-fallback hidden flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-tr from-[var(--color-accent)]/10 to-blue-500/10 text-[var(--color-accent)]">
                  <svg className="w-14 h-14 opacity-50 mb-3 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 14a5 5 0 100-10 5 5 0 000 10zM12 17c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/50">J. Sumanth</span>
                  <span className="text-[8px] text-[var(--color-accent)] font-bold mt-1 uppercase tracking-widest font-mono">&lt;AI/ML & DEV&gt;</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
