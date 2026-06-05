import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Terminal, FileCode2, Server, Layers, Flame, 
  Database, Table2, GitBranch, Binary, Search, X, ArrowUpRight, 
  CheckCircle2, Compass, Wrench, Shield, Code
} from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { Link } from 'react-router-dom';

interface SkillDetail {
  name: string;
  level: number;
  icon: any;
  category: string;
  glowColor: string;
  accentClass: string;
  progressColor: string;
  levelLabel: string;
  description: string;
  projects: { name: string; link: string }[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  const skillMetadata: Record<string, Omit<SkillDetail, 'name' | 'level' | 'category'>> = {
    "Dart (Primary)": {
      icon: FileCode2,
      glowColor: "from-blue-500/20 to-blue-500/0 hover:border-blue-500/30 shadow-blue-500/5",
      accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      progressColor: "stroke-blue-500",
      levelLabel: "Advanced",
      description: "My primary programming language. Deep understanding of asynchronous programming (Futures/Streams), DartVM, sound type-safety, and performance profiling.",
      projects: [
        { name: "CogniVision", link: "/work" },
        { name: "WorkNow", link: "/work" },
        { name: "Mecha-Connect", link: "/work" }
      ]
    },
    "Python": {
      icon: Terminal,
      glowColor: "from-yellow-500/20 to-yellow-500/0 hover:border-yellow-500/30 shadow-yellow-500/5",
      accentClass: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      progressColor: "stroke-yellow-500",
      levelLabel: "Advanced",
      description: "Extensively leveraged for machine learning tasks, data structures scripting, writing custom scripts, and integrating AI API pipelines.",
      projects: [
        { name: "CogniVision", link: "/work" }
      ]
    },
    "C": {
      icon: Code,
      glowColor: "from-slate-500/20 to-slate-500/0 hover:border-slate-500/30 shadow-slate-500/5",
      accentClass: "text-slate-400 bg-slate-500/10 border-slate-500/20",
      progressColor: "stroke-slate-500",
      levelLabel: "Advanced",
      description: "Provides a robust grounding in low-level memory allocation, structures, bit manipulation, and fundamental data structures implementation.",
      projects: []
    },
    "JavaScript": {
      icon: FileCode2,
      glowColor: "from-amber-500/20 to-amber-500/0 hover:border-amber-500/30 shadow-amber-500/5",
      accentClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      progressColor: "stroke-amber-500",
      levelLabel: "Intermediate",
      description: "Used primarily for writing server-side handlers, configuring Express middlewares, and managing asynchronous API requests.",
      projects: []
    },
    "Flutter (Mobile/Web)": {
      icon: Smartphone,
      glowColor: "from-cyan-500/20 to-cyan-500/0 hover:border-cyan-500/30 shadow-cyan-500/5",
      accentClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      progressColor: "stroke-cyan-500",
      levelLabel: "Expert",
      description: "Expert level in mobile architecture (MVVM, Clean Architecture), state management (Bloc, Provider), custom UI rendering, offline sync, and native iOS/Android device integrations.",
      projects: [
        { name: "CogniVision", link: "/work" },
        { name: "WorkNow", link: "/work" },
        { name: "Mecha-Connect", link: "/work" }
      ]
    },
    "Node.js / Express.js": {
      icon: Server,
      glowColor: "from-green-500/20 to-green-500/0 hover:border-green-500/30 shadow-green-500/5",
      accentClass: "text-green-400 bg-green-500/10 border-green-500/20",
      progressColor: "stroke-green-500",
      levelLabel: "Advanced",
      description: "Capable of designing structured REST APIs, implementing rate limiting, query sanitization, and helmet configurations for secured production routes.",
      projects: []
    },
    "REST APIs": {
      icon: Layers,
      glowColor: "from-purple-500/20 to-purple-500/0 hover:border-purple-500/30 shadow-purple-500/5",
      accentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      progressColor: "stroke-purple-500",
      levelLabel: "Advanced",
      description: "Deep expertise in constructing stateless, secure RESTful API layers, processing JSON payloads safely, and utilizing clean controllers and routers.",
      projects: []
    },
    "Firebase": {
      icon: Flame,
      glowColor: "from-orange-500/20 to-orange-500/0 hover:border-orange-500/30 shadow-orange-500/5",
      accentClass: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      progressColor: "stroke-orange-500",
      levelLabel: "Advanced",
      description: "Proficient with cloud operations including Cloud Firestore, Realtime Database, Cloud Storage, Firebase Auth, Push Notifications, and hosting.",
      projects: [
        { name: "Mecha-Connect", link: "/work" }
      ]
    },
    "MongoDB / Mongoose": {
      icon: Database,
      glowColor: "from-emerald-500/20 to-emerald-500/0 hover:border-emerald-500/30 shadow-emerald-500/5",
      accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      progressColor: "stroke-emerald-500",
      levelLabel: "Advanced",
      description: "Skilled in schema modeling, validators, pre/post hooks, upsert transactions, complex pipelines, and aggregation matching.",
      projects: []
    },
    "MySQL / Oracle SQL": {
      icon: Table2,
      glowColor: "from-teal-500/20 to-teal-500/0 hover:border-teal-500/30 shadow-teal-500/5",
      accentClass: "text-teal-400 bg-teal-500/10 border-teal-500/20",
      progressColor: "stroke-teal-500",
      levelLabel: "Advanced",
      description: "Solid relational database knowledge, structural schema optimization, writing robust subqueries, normalizations, and transaction locks.",
      projects: []
    },
    "Git / Postman": {
      icon: GitBranch,
      glowColor: "from-rose-500/20 to-rose-500/0 hover:border-rose-500/30 shadow-rose-500/5",
      accentClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      progressColor: "stroke-rose-500",
      levelLabel: "Advanced",
      description: "Advanced branching workflows, merge conflict resolution, pull request management, coupled with professional automated endpoint test suites in Postman.",
      projects: []
    },
    "Data Structures & Algorithms": {
      icon: Binary,
      glowColor: "from-indigo-500/20 to-indigo-500/0 hover:border-indigo-500/30 shadow-indigo-500/5",
      accentClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      progressColor: "stroke-indigo-500",
      levelLabel: "Advanced",
      description: "Exceptional analytical skills. Mastery in trees, graphs, dynamic programming, searches, and array optimization. Solved 700+ coding challenges.",
      projects: []
    }
  };

  // Compile full skills list by merging config data and our visual metadata
  const allSkills: SkillDetail[] = portfolioConfig.skills.flatMap(cat => 
    cat.skills.map(skill => {
      const meta = skillMetadata[skill.name] || {
        icon: Wrench,
        glowColor: "from-[var(--color-accent)]/20 to-[var(--color-accent)]/0 hover:border-[var(--color-accent)]/30",
        accentClass: "text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20",
        progressColor: "stroke-[var(--color-accent)]",
        levelLabel: "Intermediate",
        description: "Competent engineer skilled in leveraging this tool inside production environments.",
        projects: []
      };
      return {
        name: skill.name,
        level: skill.level,
        category: cat.title,
        ...meta
      };
    })
  );

  const categories = ['All', 'Languages', 'Frameworks & BaaS', 'Databases & DevOps'];

  // Filter skills based on Category Tab and Search Input
  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic glow orb shadows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-1.5 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Shield size={12} className="text-[var(--color-accent)]" />
            <span className="text-[10px] font-black tracking-widest uppercase text-[var(--color-accent)]">Expertise Dashboard</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tight text-foreground leading-[1.05]">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">Arsenal</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            A comprehensive blueprint of my engineering capabilities, structured by proficiency and linked directly to active projects.
          </p>
        </motion.div>

        {/* Dashboard Control Bar (Filter tabs + Search Box) */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-border/40 pb-8">
          
          {/* Custom Category Tabs */}
          <div className="flex space-x-2 bg-card/30 border border-border/85 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto shrink-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-grow md:flex-initial px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 relative ${
                    isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{cat === 'All' ? 'All Arsenal' : cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillCategory"
                      className="absolute inset-0 bg-[var(--color-accent)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/45 w-4 h-4" />
            <input
              type="text"
              placeholder="Search weapons of choice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/45 border border-border/80 rounded-2xl pl-11 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35 font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/45 hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              const radius = 22;
              const circumference = 2 * Math.PI * radius; // ~138.23

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-card/45 border border-border/80 p-6 rounded-3xl group cursor-pointer transition-all duration-300 hover:bg-card-hover hover:border-transparent hover:-translate-y-1.5 shadow-xl relative overflow-hidden flex flex-col justify-between h-48"
                >
                  {/* Glowing background gradient shader on hover */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${skill.glowColor} blur-[45px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/3 -translate-y-1/3`}></div>
                  
                  {/* Header Row: Icon and category tag */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-border/40 border border-border/30 flex items-center justify-center text-foreground group-hover:scale-105 group-hover:text-foreground group-hover:border-border transition-all shadow-inner">
                      <Icon size={18} />
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border shrink-0 ${skill.accentClass}`}>
                      {skill.levelLabel}
                    </span>
                  </div>

                  {/* Body Row: Skill Name & Interactive Radial Progress */}
                  <div className="flex items-end justify-between relative z-10 mt-auto">
                    <div className="text-left max-w-[65%]">
                      <h3 className="text-lg font-black text-foreground group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{skill.name}</h3>
                      <p className="text-[9px] text-foreground/35 font-bold uppercase tracking-widest mt-0.5">{skill.category.split(' ')[0]}</p>
                    </div>

                    {/* Highly stylized Radial SVG Progress Ring */}
                    <div className="relative flex items-center justify-center shrink-0 w-14 h-14">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r={radius}
                          className="stroke-border/40"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r={radius}
                          className={skill.progressColor}
                          strokeWidth="3.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset: circumference - (circumference * skill.level) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </svg>
                      {/* Percent overlay number */}
                      <span className="absolute text-[10px] font-black font-mono text-foreground/80 group-hover:text-foreground leading-none">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when query matches nothing */}
        {filteredSkills.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/50 rounded-3xl"
          >
            <Compass className="w-12 h-12 text-foreground/25 animate-spin-slow mb-4" />
            <h4 className="text-sm font-black uppercase text-foreground/60 tracking-wider">No matching skill found</h4>
            <p className="text-xs text-foreground/35 mt-1 font-medium">Try searching for other keywords like 'Flutter', 'Python', or 'Git'</p>
          </motion.div>
        )}

      </div>

      {/* Dynamic Skill Detail Modal Drawer Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card border border-border p-6 sm:p-8 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-w-lg w-full relative overflow-hidden backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Radial gradient background light */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-accent)]/10 blur-[80px] rounded-full"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-5 right-5 text-foreground/50 hover:text-foreground p-1.5 hover:bg-card-hover rounded-xl transition-all"
              >
                <X size={18} />
              </button>

              {/* Title & Icon Header */}
              <div className="flex items-center gap-4 mb-6 text-left">
                <div className="w-14 h-14 rounded-2xl bg-border/50 flex items-center justify-center text-[var(--color-accent)] shrink-0 shadow-inner">
                  <selectedSkill.icon size={26} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground">{selectedSkill.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="px-2.5 py-0.5 bg-foreground/5 border border-border rounded-md text-[8px] font-black tracking-widest uppercase text-foreground/50">
                      {selectedSkill.category}
                    </span>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${selectedSkill.accentClass}`}>
                      {selectedSkill.levelLabel} ({selectedSkill.level}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 text-left">
                <h4 className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mb-2 border-b border-border/30 pb-1.5">Skill Evaluation</h4>
                <p className="text-foreground/60 text-sm leading-relaxed font-medium">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Related Projects Links */}
              {selectedSkill.projects.length > 0 && (
                <div className="mb-8 text-left">
                  <h4 className="text-[9px] font-black text-foreground/45 uppercase tracking-widest mb-3">Linked Portfolio Projects</h4>
                  <div className="flex flex-col gap-2">
                    {selectedSkill.projects.map((proj, pIdx) => (
                      <Link
                        key={pIdx}
                        to={proj.link}
                        onClick={() => setSelectedSkill(null)}
                        className="flex items-center justify-between p-3.5 bg-background/50 border border-border/60 hover:border-[var(--color-accent)]/30 rounded-2xl group/link transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={14} className="text-green-500" />
                          <span className="text-xs font-black text-foreground/80 group-hover/link:text-foreground transition-colors">{proj.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-[var(--color-accent)] opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all flex items-center gap-0.5">
                          Inspect Project <ArrowUpRight size={10} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Button */}
              <div className="w-full">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-full bg-[var(--color-accent)] text-white text-xs font-black tracking-widest uppercase py-3.5 rounded-2xl hover:bg-[var(--color-accent)]/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_var(--color-accent)]"
                >
                  Close Evaluation
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
