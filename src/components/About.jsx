import { Section } from './Section'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'

const About = () => {
  return (
    <Section id="about" className="relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              I am an Artificial Intelligence and Machine Learning undergraduate with a passion for building 
              intelligent systems and high-performance applications. My journey in tech is driven by 
              curiosity and a commitment to solving real-world problems.
            </p>
            <p>
              Experienced in building AI-powered, real-time, and full-stack applications using Flutter, 
              cloud services, and APIs. I thrive at the intersection of AI and mobile development.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <MapPin size={20} />
              </div>
              <span className="text-sm font-medium">Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <GraduationCap size={20} />
              </div>
              <span className="text-sm font-medium">B.Tech in AI & ML</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                <Briefcase size={20} />
              </div>
              <span className="text-sm font-medium">Full Stack Intern</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl rotate-6 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative h-full w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center">
            {/* Visual Representation of Developer */}
            <div className="text-8xl">👨‍💻</div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default About
