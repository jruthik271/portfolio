import { Section } from './Section'
import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

const Education = () => {
  return (
    <Section id="education">
      <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">
        Education <span className="text-blue-500">& Certs</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all flex gap-6 items-start"
        >
          <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
            <GraduationCap size={32} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold">B.Tech in AI & ML</h3>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-blue-400">2023 – Present</span>
            </div>
            <p className="text-xl text-gray-300 font-medium mb-4">Aditya Engineering College</p>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-black text-gray-600">GPA</span>
                <span className="text-2xl font-black text-white">8.06 / 10</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications Sidebar/Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-3">
            <Award size={16} /> Certifications
          </h4>
          {[
            "Postman API Student Expert",
            "Cisco - Python Essentials",
            "HackerRank SQL (Basic)",
            "MongoDB Node.js Developer",
            "GitHub Foundations (WIP)"
          ].map((cert, idx) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-white/5 border border-white/5 rounded-xl text-gray-400 text-sm font-medium hover:text-white hover:bg-white/10 transition-colors"
            >
              {cert}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Education
