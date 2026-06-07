import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, Search, ArrowUpRight, X, Briefcase, Calendar, MapPin, CheckCircle2, Building2, Rocket, Clock, Laptop } from 'lucide-react';
import { portfolioConfig, WorkExperienceItem } from '../config/portfolio';
import { githubService } from '../services/githubService';

export default function Work() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState<WorkExperienceItem | null>(null);
  const [liveGithubRepos, setLiveGithubRepos] = useState<any[]>([]);

  // Fetch all cached repos to show under open source footprint
  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const data = await githubService.getRepos();
        setLiveGithubRepos(data);
      } catch (err) {
        console.warn('Failed to fetch github repository stats:', err);
      }
    };
    fetchGithubRepos();
  }, []);

  const categories = ['All', 'Work Experience', 'Freelance Projects'];

  // Match filters for Work Experience cards
  const filteredExperiences = portfolioConfig.workExperienceHub.filter(exp => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Work Experience';
    const matchesSearch = exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.projects.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filter freelance projects directly from projects config
  const freelanceProjects = portfolioConfig.projects.filter(p => p.category === 'Freelance Projects');
  const filteredFreelance = freelanceProjects.filter(proj => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Freelance Projects';
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background soft glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header with Stats Panel */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 text-left">
          <div>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tight">
              Work <span className="text-[var(--color-accent)]">Experience</span>
            </h2>
            <p className="text-foreground/50 max-w-xl text-sm sm:text-base font-medium">
              Professional journey building impactful solutions across diverse technologies.
            </p>
          </div>

          {/* Visual Stats Dashboard Panel */}
          <div className="flex gap-6 sm:gap-10 text-left bg-card/25 border border-border/60 p-5 rounded-3xl backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-xl flex items-center justify-center shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <span className="block text-lg font-black text-foreground leading-none">1</span>
                <span className="text-[8px] text-foreground/45 font-black uppercase tracking-wider mt-0.5 block">Company</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-xl flex items-center justify-center shrink-0">
                <Rocket size={18} />
              </div>
              <div>
                <span className="block text-lg font-black text-foreground leading-none">4</span>
                <span className="text-[8px] text-foreground/45 font-black uppercase tracking-wider mt-0.5 block">Projects</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-xl flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <span className="block text-lg font-black text-foreground leading-none">12</span>
                <span className="text-[8px] text-foreground/45 font-black uppercase tracking-wider mt-0.5 block">Months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Filters Dock */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-border/40 pb-8">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/45 w-4 h-4" />
            <input
              type="text"
              placeholder="Search company, role, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/45 border border-border/80 rounded-2xl pl-11 pr-5 py-3.5 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex space-x-2 bg-card/30 border border-border/60 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto shrink-0">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-grow md:flex-initial px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 relative ${
                    isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeExperienceCategory"
                      className="absolute inset-0 bg-[var(--color-accent)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Work Experience Section */}
        {((activeCategory === 'All' || activeCategory === 'Work Experience') && filteredExperiences.length > 0) && (
          <div className="mb-16 text-left">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight flex items-center">
              <Briefcase className="mr-3 text-[var(--color-accent)] shrink-0" size={26} />
              Work <span className="text-[var(--color-accent)] ml-2">Experience</span>
            </h3>
            <p className="text-foreground/50 max-w-xl text-xs sm:text-sm font-medium mb-8">
              Professional industry experiences and structured software engineering internships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredExperiences.map((exp) => {
                const ExpIcon = exp.icon;
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-card/45 border border-border/80 p-8 rounded-3xl group transition-all duration-300 hover:bg-card-hover hover:border-[var(--color-accent)]/30 hover:-translate-y-1 shadow-xl relative overflow-hidden flex flex-col justify-between text-left min-h-[360px]"
                  >
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${exp.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}></div>

                    <div>
                      {/* Suitcase/Laptop icon */}
                      <div className="w-12 h-12 rounded-2xl bg-border/50 flex items-center justify-center mb-6 text-[var(--color-accent)] shadow-inner">
                        <ExpIcon size={20} />
                      </div>

                      {/* Company & Role */}
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">{exp.company}</h3>
                      <h4 className="text-sm font-bold text-[var(--color-accent)] mb-6 uppercase tracking-wider">{exp.role}</h4>

                      {/* Metadata tags */}
                      <div className="flex flex-wrap gap-5 text-xs text-foreground/50 font-bold mb-8">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-foreground/45" /> {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-foreground/45" /> {exp.location}
                        </span>
                      </div>

                      {/* Skills lists */}
                      <div className="mb-8">
                        <p className="text-[10px] text-foreground/35 font-black uppercase tracking-widest mb-3">Skills & Technologies</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.slice(0, 4).map((skill, sIdx) => (
                            <span key={sIdx} className="px-2.5 py-1 bg-foreground/5 border border-border/40 rounded-lg text-[10px] font-black text-foreground/60 tracking-wider">
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 4 && (
                            <span className="px-2.5 py-1 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-lg text-[10px] font-black text-[var(--color-accent)] tracking-wider">
                              +{exp.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="w-full border border-border/80 hover:border-[var(--color-accent)]/50 bg-background/50 hover:bg-card-hover text-xs font-black tracking-widest uppercase py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 group/btn relative z-10 hover:shadow-glow text-foreground"
                    >
                      View Details <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Freelance Projects Section */}
        {((activeCategory === 'All' || activeCategory === 'Freelance Projects') && filteredFreelance.length > 0) && (
          <div className="mb-24 text-left">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight flex items-center">
              <Laptop className="mr-3 text-[var(--color-accent)] shrink-0" size={26} />
              Freelance <span className="text-[var(--color-accent)] ml-2">Projects</span>
            </h3>
            <p className="text-foreground/50 max-w-xl text-xs sm:text-sm font-medium mb-8">
              Independent applications and AI tools built to solve specific operational challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFreelance.map((project) => {
                const ProjectIcon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-card/45 border border-border/80 p-8 rounded-3xl group transition-all duration-300 hover:bg-card-hover hover:border-[var(--color-accent)]/30 hover:-translate-y-1 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[280px]"
                  >
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}></div>

                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-border/50 flex items-center justify-center text-foreground group-hover:text-[var(--color-accent)] group-hover:scale-110 transition-all shadow-inner">
                          <ProjectIcon size={20} />
                        </div>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-9 h-9 border border-border/80 hover:border-[var(--color-accent)]/30 bg-background/50 hover:bg-card rounded-xl flex items-center justify-center text-foreground/60 hover:text-[var(--color-accent)] transition-all"
                            >
                              <Github size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-foreground tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors">{project.title}</h3>
                      <p className="text-foreground/50 text-sm leading-relaxed mb-6 font-medium line-clamp-3">{project.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 bg-foreground/5 border border-border/40 rounded-lg text-[9px] font-black tracking-wider uppercase text-foreground/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Real Dynamic GitHub Showcase */}
        {liveGithubRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-border/60 pt-16 text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tight flex items-center">
              <Github className="mr-3 text-[var(--color-accent)] animate-pulse" size={28} />
              Open Source <span className="text-[var(--color-accent)] ml-2">Footprint</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGithubRepos.slice(0, 6).map((repo) => (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo._id || repo.id}
                  className="bg-card/45 border border-border/80 p-6 rounded-2xl group hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--color-accent)]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <h4 className="font-black text-lg mb-2 text-[var(--color-accent)] group-hover:text-white transition-colors">{repo.name}</h4>
                    <p className="text-foreground/50 text-xs sm:text-sm mb-6 line-clamp-3 min-h-[50px] font-medium leading-relaxed">{repo.description || "No description provided."}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-foreground/45 text-[10px] font-black w-full uppercase pt-4 border-t border-border/30">
                    <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count || 0}</span>
                    <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count || 0}</span>
                    <span>{repo.language || 'Code'}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Expandable Details Modal Drawer Overlay */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card border border-border p-6 sm:p-8 rounded-[32px] shadow-2xl max-w-3xl w-full relative my-8 backdrop-blur-xl overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Radial gradient background light */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-accent)]/10 blur-[80px] rounded-full pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-5 right-5 text-foreground/50 hover:text-foreground p-1.5 hover:bg-card-hover rounded-xl transition-all z-20"
              >
                <X size={18} />
              </button>

              {/* Header details */}
              <div className="text-left mb-6 pr-8">
                <h3 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">{selectedExperience.company}</h3>
                <h4 className="text-sm sm:text-base font-bold text-[var(--color-accent)] mt-1 uppercase tracking-wider">{selectedExperience.role}</h4>
                
                {/* Meta details pills */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[9px] font-black uppercase tracking-wider text-[var(--color-accent)] rounded-lg">
                    <Briefcase size={10} /> {selectedExperience.type}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-foreground/5 border border-border/80 text-[9px] font-black uppercase tracking-wider text-foreground/60 rounded-lg">
                    <Calendar size={10} /> {selectedExperience.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-foreground/5 border border-border/80 text-[9px] font-black uppercase tracking-wider text-foreground/60 rounded-lg">
                    <MapPin size={10} /> {selectedExperience.location}
                  </span>
                </div>
              </div>

              {/* Description overview */}
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-6 font-medium text-left">
                {selectedExperience.description}
              </p>

              {/* Full Skills lists */}
              <div className="mb-6 text-left">
                <h4 className="text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-3">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-foreground/5 border border-border/60 rounded-xl text-[10px] font-bold text-foreground/75 uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Projects list (vertical lines highlights) */}
              <div className="mb-8 text-left">
                <h4 className="text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Rocket size={14} className="text-[var(--color-accent)] animate-pulse" /> Key Projects ({selectedExperience.projects.length})
                </h4>
                <div className="flex flex-col gap-4">
                  {selectedExperience.projects.map((project, pIdx) => (
                    <div key={pIdx} className="p-6 bg-background/40 border border-border/60 rounded-3xl relative overflow-hidden group/project hover:border-[var(--color-accent)]/30 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base sm:text-lg font-black text-foreground">{project.title}</h5>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-foreground/45 hover:text-[var(--color-accent)] transition-colors p-1"
                            title="View Repository"
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-foreground/60 text-xs leading-relaxed mb-4 font-medium">{project.desc}</p>
                      
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-0.5 bg-foreground/5 border border-border/30 rounded-md text-[8px] font-black uppercase tracking-wider text-foreground/50">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Project bullet points highlights */}
                      <div className="space-y-1.5 border-l border-border/60 pl-3.5 mt-2">
                        {project.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="text-[11px] text-foreground/65 font-medium flex items-start gap-2">
                            <span className="text-[var(--color-accent)] font-black leading-none">•</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements list */}
              <div className="text-left border-t border-border/40 pt-6">
                <h4 className="text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" /> Key Achievements
                </h4>
                <div className="flex flex-col gap-2.5">
                  {selectedExperience.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 p-3.5 bg-background/30 border border-border/50 rounded-2xl">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground/75 font-medium leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
