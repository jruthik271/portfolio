import { motion } from 'framer-motion'
import { Rocket, Mail, FileText } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 rounded-full backdrop-blur-sm"
        >
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Available for Internships</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-6"
        >
          Jallipalli <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Sumanth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          AI & ML Student | Flutter Full Stack Developer
          <br />
          <span className="text-gray-500 text-lg md:text-xl">Building scalable mobile and full-stack applications powered by AI and modern technologies.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold transition-all hover:pr-10"
          >
            View Projects
            <Rocket className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 px-8 py-4 border border-blue-500/30 rounded-xl font-bold hover:bg-blue-500/10 transition-all"
          >
            <FileText className="w-5 h-5 text-blue-400" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Abstract Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-24 h-24 border border-white/5 rounded-3xl rotate-12 hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-32 h-32 border border-white/5 rounded-full hidden lg:block"
      />
    </section>
  )
}

export default Hero
