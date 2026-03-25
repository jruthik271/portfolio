import { Section } from './Section'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Globe } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "Mecha-Connect",
      description: "On-demand roadside assistance platform connecting users with nearby mechanics and services using real-time GPS tracking.",
      tech: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      github: "https://github.com/jruthik271",
      demo: "#",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
      stars: 12,
      forks: 4
    },
    {
      title: "WorkNow",
      description: "Job discovery and application management platform with dynamic location filtering and persistent tracking.",
      tech: ["Flutter", "REST APIs", "Node.js", "MongoDB"],
      github: "https://github.com/jruthik271",
      demo: "#",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
      stars: 8,
      forks: 2
    }
  ]

  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-xl">A selection of my recent work in mobile and full-stack development.</p>
        </div>
        <a href="https://github.com/jruthik271" className="text-blue-400 font-bold flex items-center gap-2 hover:underline">
          View all on GitHub <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500"
          >
            {/* Project Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-white/50 text-[10px] font-bold">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">★</span> {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <Github size={10} /> {project.forks}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex gap-4">
                <a 
                  href={project.github}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all"
                >
                  <Github size={20} />
                  Source
                </a>
                <a 
                  href={project.demo}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl font-bold text-blue-400 transition-all"
                >
                  <Globe size={20} />
                  Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Projects
