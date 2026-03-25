import { useState } from 'react'
import { Section } from './Section'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Send, MessageSquare, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    setStatus('sending')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Get in <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            I'm currently looking for Software Engineering Internship opportunities. 
            If you have a question or just want to say hi, my inbox is always open!
          </p>

          <div className="space-y-6">
            <a href="mailto:jruthik271@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all text-blue-500">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Email Me</p>
                <p className="text-lg font-bold group-hover:text-blue-400">jruthik271@gmail.com</p>
              </div>
            </a>
            
            <a href="tel:+919491895027" className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-all text-purple-500">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Call Me</p>
                <p className="text-lg font-bold group-hover:text-purple-400">+91 9491895027</p>
              </div>
            </a>

            <div className="flex gap-4 pt-6">
              {[
                { icon: <Github size={20} />, href: "https://github.com/jruthik271" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/sumanth-jallipalli-a36174291/" },
                { icon: <Code2 size={20} />, href: "https://leetcode.com/u/jruthik271/" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-10 rounded-3xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">Message</label>
              <textarea 
                rows="5" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-gray-700" 
                placeholder="Hey, I'd like to talk about..."
              ></textarea>
            </div>
            <button 
              disabled={status === 'sending' || status === 'success'}
              className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all ${
                status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'idle' && <>Send Message <Send size={18} /></>}
              {status === 'sending' && <>Sending...</>}
              {status === 'success' && <>Message Sent <CheckCircle size={18} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  )
}

export default Contact

