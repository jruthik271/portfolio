import { Section } from './Section'
import { motion } from 'framer-motion'
import { Code2, Monitor, Database, Server, Settings, Cpu } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code2 className="text-blue-500" />,
      skills: ["C", "Python", "Dart", "JavaScript"]
    },
    {
      title: "Frameworks",
      icon: <Monitor className="text-purple-500" />,
      skills: ["Flutter (Mobile & Web)", "Firebase"]
    },
    {
      title: "Backend",
      icon: <Server className="text-green-500" />,
      skills: ["Node.js", "Express.js", "REST APIs", "Mongoose"]
    },
    {
      title: "Databases",
      icon: <Database className="text-orange-500" />,
      skills: ["MongoDB", "MySQL", "Oracle SQL"]
    },
    {
      title: "Tools",
      icon: <Settings className="text-cyan-500" />,
      skills: ["Git", "Postman", "VS Code", "Android Studio"]
    },
    {
      title: "Fundamentals",
      icon: <Cpu className="text-pink-500" />,
      skills: ["DSA", "Complexity Analysis", "Recursion", "Hashing"]
    }
  ]

  return (
    <Section id="skills">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-4"
        >
          Technical <span className="text-blue-500">Stacks</span>
        </motion.h2>
        <p className="text-gray-400">Technologies I use to bring ideas to life</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="mb-6 w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-semibold text-gray-400 group-hover:text-blue-300 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
