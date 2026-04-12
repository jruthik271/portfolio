import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: '', isError: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', isError: false });
    
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ loading: false, message: 'Message sent successfully! We will get back to you shortly.', isError: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, message: data.error || 'Something went wrong.', isError: true });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Failed to send message. Please try again later.', isError: true });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Get In <span className="text-[var(--color-accent)]">Touch</span></h2>
          <p className="text-foreground/60 max-w-2xl text-lg">Let's build something incredible together.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info Cards */}
          <div className="lg:w-5/12 space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-card border border-border p-6 rounded-3xl flex items-center shadow-lg hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="ml-6">
                <p className="text-sm text-foreground/50 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg font-bold text-foreground">jruthik271@gmail.com</p>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-card border border-border p-6 rounded-3xl flex items-center shadow-lg hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div className="ml-6">
                <p className="text-sm text-foreground/50 font-bold uppercase tracking-widest mb-1">Phone</p>
                <p className="text-lg font-bold text-foreground">+91 9491895027</p>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="bg-card border border-border p-6 rounded-3xl flex items-center shadow-lg hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div className="ml-6">
                <p className="text-sm text-foreground/50 font-bold uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-bold text-foreground">Andhra Pradesh, India</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-7/12">
            <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 blur-3xl rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-background border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Your Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-background border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="mb-6 relative z-10">
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-background border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="How can I help you?" />
              </div>

              <div className="mb-8 relative z-10">
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-background border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none" placeholder="Write your message here..."></textarea>
              </div>

              {status.message && (
                <div className={`mb-6 p-4 rounded-xl font-bold text-sm text-center ${status.isError ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={status.loading} className="relative z-10 w-full bg-[var(--color-accent)] text-white font-bold tracking-widest uppercase py-4 rounded-xl flex items-center justify-center hover:bg-[var(--color-accent)]/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_var(--color-accent)] group disabled:opacity-70 disabled:cursor-not-allowed">
                {status.loading ? 'Sending...' : 'Send Message'} <Send className="ml-3 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
