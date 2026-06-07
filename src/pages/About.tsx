import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Compass, BookOpen, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { leetcodeService } from '../services/leetcodeService';
import { geeksforgeeksService } from '../services/geeksforgeeksService';

type TabType = 'achievements' | 'experience' | 'credentials' | 'education';

const certUrls: Record<string, string> = {
  "Postman API Fundamentals – Student Expert": "https://badges.parchment.com/public/assertions/yrqxl5_vTeKQHw6EUuhW7g?identity__email=jsumanth271@gmail.com",
  "Cisco Networking Academy - Python Essentials (1 & 2)": "https://www.credly.com/badges/f2ecdac3-ed01-49de-88d2-5671f8de68e0",
  "HackerRank Certifications: Python (Basic), C (Basic), SQL (Basic), Problem Solving (Basic)": "https://www.hackerrank.com/profile/jruthik271",
  "MongoDB Node.js Developer Certification": "https://www.credly.com/badges/e90b26c1-89ac-4459-9b2d-7fef0d14cdb5/public_url",
  "GitHub Foundations Certification": "https://learn.microsoft.com/api/credentials/share/en-gb/SumanthJallipalli-5267/A37CFE252167ACAA?sharingId=8CA79E5DCCAC7BFD"
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('achievements');
  const [solvedCount, setSolvedCount] = useState(816);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leetcodeStats, gfgStats] = await Promise.all([
          leetcodeService.getStats().catch(() => null),
          geeksforgeeksService.getStats().catch(() => null)
        ]);

        let leetcode = 164;
        let gfg = 2;

        if (leetcodeStats && leetcodeStats.solvedTotal) leetcode = leetcodeStats.solvedTotal;
        if (gfgStats && gfgStats.solvedTotal) gfg = gfgStats.solvedTotal;

        setSolvedCount(leetcode + gfg + 650);
      } catch (err) {
        console.warn('Failed to fetch live stats for About:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'credentials', label: 'Credentials', icon: Compass },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <section id="about-timeline" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic backdrop shaders */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          
          {/* Left Column: Typographic Details & Stat Blocks */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-grow flex flex-col justify-center"
            >
              {/* Top Section Tag */}
              <div className="inline-flex items-center space-x-1.5 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-1.5 rounded-full mb-6 w-fit shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <BookOpen size={12} className="text-[var(--color-accent)]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[var(--color-accent)]">About Me</span>
              </div>

              {/* Spectacular Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight text-foreground leading-[1.05]">
                Building solutions <br />
                that <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">matter</span> and <br />
                impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">lives</span>
              </h2>

              <p className="text-foreground/60 text-sm sm:text-base leading-relaxed mb-10 font-medium max-w-xl">
                I'm a Full-Stack Mobile App Developer and AI/ML undergraduate passionate about building high-performance, user-centric mobile applications using Flutter & Dart. With hands-on experience developing voice-navigable assistive apps integrated with Gemini 2.0 Live and YOLOv8 models at Technical Hub, I focus on turning complex algorithms and clean architectures into intuitive, real-world mobile solutions.
              </p>

              {/* Grid layout of 4 core metrics counters */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/30 pt-8">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-mono tracking-tighter">
                    {loading ? '807+' : `${solvedCount}+`}
                  </span>
                  <span className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mt-1.5">Coding Problems</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-mono tracking-tighter">30+</span>
                  <span className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mt-1.5">Skills Mastered</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-mono tracking-tighter">9,999+</span>
                  <span className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mt-1.5">People Impacted</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-mono tracking-tighter">120+</span>
                  <span className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mt-1.5">Contests Battled</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Tab Bar & Interactive Scrollable Timeline */}
          <div className="w-full lg:w-[55%] flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col h-full"
            >
              {/* Sleek Horizontal Tab Bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-border/30 pb-4 mb-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                        isActive ? 'text-foreground' : 'text-foreground/45 hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTabUnderline"
                          className="absolute inset-0 bg-card border border-border rounded-xl shadow-lg z-0"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon size={12} className={isActive ? 'text-orange-400' : ''} />
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Scrollable Content Timeline Container */}
              <div className="relative max-h-[380px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="relative pl-6 border-l border-border/30 ml-3 py-2 space-y-8"
                  >
                    
                    {/* Active Timeline Dot/Line Accent */}
                    <div className="absolute top-0 left-[-1.5px] w-[3px] bg-gradient-to-b from-orange-500 to-amber-300 h-full rounded-full pointer-events-none"></div>

                    {/* Achievements Tab */}
                    {activeTab === 'achievements' && (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-foreground/30 font-bold uppercase tracking-widest text-xs w-full">
                        <Award size={32} className="opacity-30 mb-2 animate-pulse text-orange-500" />
                        Achievements will be updated later
                      </div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 'experience' &&
                      portfolioConfig.experiences.map((item, idx) => (
                        <div key={idx} className="relative group">
                          {/* Circle Marker */}
                          <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-orange-500 group-hover:bg-orange-500 transition-all shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                          
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-black text-foreground uppercase tracking-wider group-hover:text-orange-400 transition-colors">
                                {item.role}
                              </h4>
                              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-md border border-[var(--color-accent)]/20 w-fit">
                                {item.duration}
                              </span>
                            </div>
                            <span className="block text-xs font-bold text-foreground/60 tracking-wider">
                              {item.company}
                            </span>
                            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/55 font-medium leading-relaxed">
                              {item.points.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}

                    {/* Credentials Tab */}
                    {activeTab === 'credentials' &&
                      portfolioConfig.certifications.map((item, idx) => {
                        const url = certUrls[item] || "https://www.linkedin.com/in/sumanth-jallipalli-a36174291/";
                        return (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group block cursor-pointer"
                          >
                            {/* Circle Marker */}
                            <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-orange-500 group-hover:bg-orange-500 transition-all shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                            
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-black text-foreground uppercase tracking-wider group-hover:text-orange-400 transition-colors leading-snug">
                                  {item}
                                </h4>
                                <p className="text-[9px] text-foreground/35 font-bold uppercase tracking-wider">Click to Verify Badge</p>
                              </div>
                              <div className="text-foreground/45 group-hover:text-foreground p-1.5 rounded-lg border border-border bg-card group-hover:border-orange-500/30 transition-all shrink-0">
                                <ExternalLink size={12} />
                              </div>
                            </div>
                          </a>
                        );
                      })}

                    {/* Education Tab */}
                    {activeTab === 'education' &&
                      portfolioConfig.education.map((item, idx) => (
                        <div key={idx} className="relative group">
                          {/* Circle Marker */}
                          <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-orange-500 group-hover:bg-orange-500 transition-all shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                          
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-black text-foreground uppercase tracking-wider group-hover:text-orange-400 transition-colors">
                                {item.degree}
                              </h4>
                              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-md border border-[var(--color-accent)]/20 w-fit">
                                {item.duration}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-foreground/50 font-bold tracking-wider">
                              <span>{item.school}</span>
                              <span className="text-orange-400">
                                {item.gpa.includes('%') ? 'Percentage' : 'CGPA'}: {item.gpa}
                              </span>
                            </div>
                            <span className="block text-[9px] text-foreground/35 font-black uppercase tracking-widest">
                              Location: {item.location}
                            </span>
                          </div>
                        </div>
                      ))}

                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
