import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, Wrench, Github, Star, GitFork } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Mecha-Connect',
    desc: 'On-demand roadside assistance mobile app enabling real-time GPS tracking with Google Maps API. Built during an internship at Technical Hub.',
    icon: Wrench,
    color: 'from-blue-500/20 to-blue-500/0',
    borderColor: 'group-hover:border-blue-500/50',
    link: '#'
  },
  {
    title: 'WorkNow',
    desc: 'Production-ready job search platform processing diverse listings. Features multi-step forms and animated bottom navigation flow with 99% responsiveness.',
    icon: Smartphone,
    color: 'from-green-500/20 to-green-500/0',
    borderColor: 'group-hover:border-green-500/50',
    link: '#'
  },
  {
    title: 'Backend Systems',
    desc: 'Various Node.js / Express REST APIs with MongoDB and MySQL databases configured for scaling full-stack applications.',
    icon: Layers,
    color: 'from-purple-500/20 to-purple-500/0',
    borderColor: 'group-hover:border-purple-500/50',
    link: '#'
  }
];

export default function Work() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/github/repos');
        if (res.ok) {
          const data = await res.json();
          setGithubRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch Github Repos", error);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Project <span className="text-[var(--color-accent)]">Hub</span></h2>
          <p className="text-foreground/60 max-w-2xl text-lg">Explore my highlighted mobile and full-stack applications.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PROJECTS.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <motion.a
                href={hub.link}
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-card border border-border p-8 rounded-3xl group cursor-pointer transition-all duration-300 hover:bg-card-hover ${hub.borderColor} shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden block`}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${hub.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}></div>
                
                <div className="w-14 h-14 rounded-2xl bg-border/50 flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--color-accent)] relative z-10">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 relative z-10">{hub.title}</h3>
                <p className="text-foreground/60 mb-8 relative z-10 text-sm leading-relaxed">{hub.desc}</p>
                
                <div className="flex flex-grow items-end text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10 text-[var(--color-accent)]">
                  Explore <span className="ml-2">→</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* GitHub Repositories Section */}
        {(!loadingRepos && githubRepos.length > 0) && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight flex items-center">
               <Github className="mr-3 text-[var(--color-accent)]" size={32} />
               Latest Open <span className="text-[var(--color-accent)] ml-2">Source</span>
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {githubRepos.map((repo, idx) => (
                 <a 
                   href={repo.html_url} 
                   target="_blank" 
                   rel="noreferrer"
                   key={repo._id}
                   className="bg-background border border-border p-6 rounded-2xl group hover:border-[var(--color-accent)] transition-all hover:-translate-y-2 relative"
                 >
                   <h4 className="font-bold text-lg mb-2 text-[var(--color-accent)]">{repo.name}</h4>
                   <p className="text-foreground/70 text-sm mb-6 line-clamp-3 min-h-[60px]">{repo.description || "No description provided."}</p>
                   
                   <div className="flex items-center justify-between text-foreground/50 text-xs font-bold w-full uppercase mt-auto">
                     <span className="flex items-center"><Star size={14} className="mr-1" /> {repo.stargazers_count}</span>
                     <span className="flex items-center"><GitFork size={14} className="mr-1" /> {repo.forks_count}</span>
                     <span>{repo.language || 'Code'}</span>
                   </div>
                 </a>
               ))}
             </div>
           </motion.div>
        )}
      </div>
    </section>
  );
}
