import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight, BookOpen, Cpu, Award, Milestone } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import MagneticButton from './MagneticButton';

interface APIStats {
  githubRepos: number;
  leetcodeSolved: number;
  leetcodeRank: string;
  downloadsCount: number;
}

export default function Hero() {
  const [stats, setStats] = useState<APIStats>({
    githubRepos: 6,
    leetcodeSolved: 154,
    leetcodeRank: '185k',
    downloadsCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [githubRes, leetcodeRes, resumeRes] = await Promise.all([
          fetch('http://localhost:5000/api/github/repos'),
          fetch('http://localhost:5000/api/leetcode/stats'),
          fetch('http://localhost:5000/api/resume/stats')
        ]);

        let repoCount = 6;
        let solved = 154;
        let rank = '185k';
        let downloads = 0;

        if (githubRes.ok) {
          const repos = await githubRes.json();
          if (Array.isArray(repos)) repoCount = repos.length;
        }

        if (leetcodeRes.ok) {
          const leetcode = await leetcodeRes.json();
          if (leetcode.solvedTotal) solved = leetcode.solvedTotal;
          if (leetcode.globalRank) {
            rank = leetcode.globalRank > 1000 ? `${Math.round(leetcode.globalRank / 1000)}k` : leetcode.globalRank.toString();
          }
        }

        if (resumeRes.ok) {
          const resume = await resumeRes.json();
          if (resume.count !== undefined) downloads = resume.count;
        }

        setStats({
          githubRepos: repoCount,
          leetcodeSolved: solved,
          leetcodeRank: rank,
          downloadsCount: downloads
        });
      } catch (err) {
        console.warn('Failed to fetch real-time dashboard counters, using local cache presets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsItems = [
    { label: 'GPA Metric', value: portfolioConfig.education[0].gpa.split(' ')[0], icon: Award },
    { label: 'GitHub Repos', value: loading ? '6+' : `${stats.githubRepos} Active`, icon: Cpu },
    { label: 'LeetCode Solved', value: loading ? '150+' : stats.leetcodeSolved.toString(), icon: BookOpen },
    { label: 'Internship', value: '1 Month', icon: Milestone }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-[var(--color-accent)]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-3 bg-card/65 border border-border/80 px-5 py-2.5 rounded-full mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]"></span>
          </span>
          <span className="text-xs font-black tracking-widest uppercase text-[var(--color-accent)]">
            {portfolioConfig.personal.availability}
          </span>
        </motion.div>

        {/* Name Title with Shimmer / Accent */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{portfolioConfig.personal.name}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 font-mono tracking-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            &lt;{portfolioConfig.personal.role}&gt;
          </span>
        </motion.h1>

        {/* Bio Copy */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          {portfolioConfig.personal.bio}
        </motion.p>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-8 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={portfolioConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all p-2 bg-card/40 border border-border/40 hover:border-[var(--color-accent)]/40 rounded-full"
          >
            <Github size={20} />
          </a>
          <a
            href={portfolioConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all p-2 bg-card/40 border border-border/40 hover:border-[var(--color-accent)]/40 rounded-full"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${portfolioConfig.socials.email}`}
            className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all p-2 bg-card/40 border border-border/40 hover:border-[var(--color-accent)]/40 rounded-full"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        {/* Action CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <MagneticButton>
            <a
              href="#about"
              className="group relative overflow-hidden rounded-full bg-[var(--color-accent)] text-white px-8 py-4 font-black tracking-widest text-xs uppercase shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_var(--color-accent)] transition-all flex items-center justify-center"
            >
              EXPLORE PROFILE
              <ArrowRight className="ml-2.5 w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="http://localhost:5000/api/resume/download"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-card/80 border border-border/80 hover:border-[var(--color-accent)]/30 text-foreground px-8 py-4 font-black tracking-widest text-xs uppercase transition-all hover:bg-card-hover flex items-center justify-center backdrop-blur-sm"
            >
              DOWNLOAD CV
              <Download className="ml-2.5 w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </MagneticButton>
        </motion.div>

        {/* Statistics Widgets Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto border-t border-border/60 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {statsItems.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-card/35 border border-border/50 rounded-2xl p-5 text-center group hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent)]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-center mb-2 text-foreground/45 group-hover:text-[var(--color-accent)] transition-colors">
                  <Icon size={18} />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-0.5 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </h4>
                <p className="text-[10px] text-foreground/50 font-black tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
