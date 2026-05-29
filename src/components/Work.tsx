import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, Search, ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { portfolioConfig, ProjectItem } from '../config/portfolio';

interface GithubRepoStats {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

export default function Work() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [githubStats, setGithubStats] = useState<Record<string, GithubRepoStats>>({});
  const [liveGithubRepos, setLiveGithubRepos] = useState<any[]>([]);

  // Fetch all cached repos to overlay stats and show under open source
  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/github/repos');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setLiveGithubRepos(data);
            const statsMap: Record<string, GithubRepoStats> = {};
            data.forEach((repo: any) => {
              // Convert keys to match case-insensitive
              statsMap[repo.name.toLowerCase()] = {
                name: repo.name,
                stargazers_count: repo.stargazers_count || 0,
                forks_count: repo.forks_count || 0
              };
            });
            setGithubStats(statsMap);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch github repository stats:', err);
      }
    };
    fetchGithubRepos();
  }, []);

  const categories = ['All', 'Mobile', 'Backend'];

  // Match filters
  const filteredProjects = portfolioConfig.projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

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
            Project <span className="text-[var(--color-accent)]">Hub</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl text-base sm:text-lg font-medium">
            Explore my highlighted production-ready mobile, scaling APIs, and full-stack applications.
          </p>
        </motion.div>

        {/* Dynamic Filters Dock */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-border/60 pb-8">
          {/* Category Tabs */}
          <div className="flex space-x-2 bg-card/30 border border-border/60 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto shrink-0">
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
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
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
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/45 border border-border/80 rounded-2xl pl-11 pr-5 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              const normalizedTitle = project.title.toLowerCase();
              const stats = githubStats[normalizedTitle];
              
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 22 }}
                  onClick={() => setSelectedProject(project)}
                  className="bg-card/45 border border-border/80 p-8 rounded-3xl group cursor-pointer transition-all duration-300 hover:bg-card-hover hover:border-[var(--color-accent)]/30 hover:-translate-y-1.5 shadow-xl relative overflow-hidden flex flex-col min-h-[340px]"
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}></div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-border/50 flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--color-accent)] relative z-10 shadow-inner">
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3 relative z-10 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed mb-6 relative z-10 line-clamp-3 flex-grow font-medium">{project.desc}</p>
                  
                  {/* Floating Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-border/40 rounded-lg text-[9px] font-black tracking-wider uppercase text-foreground/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions overlay footer */}
                  <div className="flex items-center justify-between text-xs font-black relative z-10 w-full uppercase mt-auto pt-4 border-t border-border/30">
                    {stats ? (
                      <span className="flex items-center gap-1.5 text-foreground/45 group-hover:text-white transition-colors">
                        <Star size={14} className="text-yellow-500" /> {stats.stargazers_count} Stars
                      </span>
                    ) : (
                      <span className="text-foreground/45 group-hover:text-white transition-colors">View Details</span>
                    )}
                    <span className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1 shrink-0">
                      Explore <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Real Dynamic GitHub Showcase */}
        {liveGithubRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-border/60 pt-16"
          >
            <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tight flex items-center">
              <Github className="mr-3 text-[var(--color-accent)] animate-pulse" size={28} />
              Open Source <span className="text-[var(--color-accent)] ml-2">Footprint</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGithubRepos.map((repo) => (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo._id}
                  className="bg-card/45 border border-border/80 p-6 rounded-2xl group hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--color-accent)]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <h4 className="font-black text-lg mb-2 text-[var(--color-accent)] group-hover:text-white transition-colors">{repo.name}</h4>
                    <p className="text-foreground/50 text-xs sm:text-sm mb-6 line-clamp-3 min-h-[50px] font-medium leading-relaxed">{repo.description || "No description provided."}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-foreground/45 text-[10px] font-black w-full uppercase pt-4 border-t border-border/30">
                    <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                    <span>{repo.language || 'Code'}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Projects Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (() => {
          const stats = githubStats[selectedProject.title.toLowerCase()];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-w-xl w-full relative overflow-hidden backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background radial soft light */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-accent)]/10 blur-[80px] rounded-full"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 text-foreground/50 hover:text-foreground p-1.5 hover:bg-card-hover rounded-xl transition-all"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-border/50 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <selectedProject.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{selectedProject.title}</h3>
                    <span className="px-2.5 py-1 bg-white/5 border border-border rounded-lg text-[9px] font-black tracking-wider uppercase text-[var(--color-accent)] bg-[var(--color-accent)]/10">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                <p className="text-foreground/60 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  {selectedProject.desc}
                </p>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-3">Key Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1.5 bg-background border border-border/80 rounded-xl text-[10px] font-bold text-foreground/75 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub stats if present */}
                {stats && (
                  <div className="bg-background/45 border border-border/60 p-4 rounded-2xl flex items-center justify-between mb-8 shadow-inner">
                    <div className="flex items-center gap-2">
                      <Github size={16} className="text-foreground/45" />
                      <span className="text-xs font-bold text-foreground/65">GitHub Statistics</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-black">
                      <span className="flex items-center gap-1.5 text-yellow-500"><Star size={14} /> {stats.stargazers_count}</span>
                      <span className="flex items-center gap-1.5 text-blue-500"><GitFork size={14} /> {stats.forks_count}</span>
                    </div>
                  </div>
                )}

                {/* Actions Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-background border border-border/80 hover:border-[var(--color-accent)]/30 text-xs font-black tracking-widest uppercase py-3.5 rounded-2xl hover:bg-card-hover transition-all"
                  >
                    <Github size={16} /> Repository
                  </a>
                  <a
                    href={selectedProject.demoUrl}
                    className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white text-xs font-black tracking-widest uppercase py-3.5 rounded-2xl hover:bg-[var(--color-accent)]/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_var(--color-accent)]"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
