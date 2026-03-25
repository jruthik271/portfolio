import { Section } from './Section'
import { motion } from 'framer-motion'
import { Calendar, Briefcase } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      role: "Full Stack Developer Intern",
      company: "Technical Hub – Surampalem",
      duration: "May 2025 – June 2025",
      points: [
        "Built an on-demand roadside assistance mobile app using Flutter.",
        "Implemented real-time GPS tracking using Google Maps API.",
        "Connected users with nearby mechanics, fuel delivery agents, and spare-part providers.",
        "Presented the project at ISHIP under industry mentorship."
      ]
    }
  ]

  return (
    <Section id="experience">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-4xl md:text-5xl font-black mb-16"
      >
        Work <span className="text-blue-500">Experience</span>
      </motion.h2>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-400">
                  <Calendar size={16} />
                  <span>{exp.duration}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="text-gray-400 flex gap-3 text-lg">
                    <span className="text-blue-500 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Experience
