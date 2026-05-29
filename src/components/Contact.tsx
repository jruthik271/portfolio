import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StatusState {
  loading: boolean;
  message: string;
  isError: boolean;
  success: boolean;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<StatusState>({ loading: false, message: '', isError: false, success: false });

  const validateForm = (): string | null => {
    if (formData.name.trim().length < 2) return 'Name must be at least 2 characters.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return 'Please enter a valid email address.';
    if (formData.subject.trim().length < 3) return 'Subject must be at least 3 characters.';
    if (formData.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validations
    const errorMsg = validateForm();
    if (errorMsg) {
      setStatus({ loading: false, message: errorMsg, isError: true, success: false });
      return;
    }

    setStatus({ loading: true, message: '', isError: false, success: false });
    
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({
          loading: false,
          message: 'Thank you! Your message was sent successfully. An auto-reply confirmation has been sent to your email.',
          isError: false,
          success: true
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, message: data.error || 'Something went wrong.', isError: true, success: false });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Failed to establish connection to the server. Please try again later.', isError: true, success: false });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tight">
            Get In <span className="text-[var(--color-accent)]">Touch</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl text-base sm:text-lg font-medium">
            Let's build something extraordinary together. Send a message, and let's align.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Contact details */}
          <div className="lg:w-[40%] space-y-6 flex flex-col justify-center">
            
            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="bg-card/45 border border-border/80 p-6 rounded-3xl flex items-center shadow-xl hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-background/80 border border-border rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner">
                <Mail size={22} className="animate-pulse" />
              </div>
              <div className="ml-6">
                <p className="text-[10px] text-foreground/45 font-black uppercase tracking-widest mb-0.5">Email Connection</p>
                <p className="text-base sm:text-lg font-black text-white leading-none">{portfolioConfig.socials.email}</p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.8 }}
              className="bg-card/45 border border-border/80 p-6 rounded-3xl flex items-center shadow-xl hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-background/80 border border-border rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner">
                <Phone size={22} />
              </div>
              <div className="ml-6">
                <p className="text-[10px] text-foreground/45 font-black uppercase tracking-widest mb-0.5">Phone Line</p>
                <p className="text-base sm:text-lg font-black text-white leading-none">{portfolioConfig.socials.phone}</p>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="bg-card/45 border border-border/80 p-6 rounded-3xl flex items-center shadow-xl hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-background/80 border border-border rounded-2xl flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner">
                <MapPin size={22} />
              </div>
              <div className="ml-6">
                <p className="text-[10px] text-foreground/45 font-black uppercase tracking-widest mb-0.5">Primary Location</p>
                <p className="text-base sm:text-lg font-black text-white leading-none">{portfolioConfig.socials.location}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form submission */}
          <div className="lg:w-[60%]">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card/45 border border-border/80 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              {/* Soft visual background color splash */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 blur-3xl rounded-full"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-2.5">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/70 border border-border/80 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-2.5">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/70 border border-border/80 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              
              <div className="mb-6 relative z-10">
                <label className="block text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-2.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background/70 border border-border/80 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder:text-foreground/35"
                  placeholder="Internship opportunities / Projects inquiry..."
                />
              </div>

              <div className="mb-8 relative z-10">
                <label className="block text-[10px] font-black text-foreground/45 uppercase tracking-widest mb-2.5">Message Content</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-background/70 border border-border/80 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors resize-none placeholder:text-foreground/35 leading-relaxed"
                  placeholder="Describe your goals or project details..."
                ></textarea>
              </div>

              {/* Status notifications container */}
              {status.message && (
                <div
                  className={`mb-8 p-5 rounded-2xl flex items-center gap-4 text-xs font-black uppercase tracking-wider leading-relaxed border ${
                    status.isError
                      ? 'bg-red-500/5 text-red-400 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]'
                      : 'bg-green-500/5 text-green-400 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]'
                  }`}
                >
                  {status.isError ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="relative z-10 w-full bg-[var(--color-accent)] text-white font-black tracking-widest uppercase text-xs py-4.5 rounded-2xl flex items-center justify-center hover:bg-[var(--color-accent)]/95 transition-all shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_var(--color-accent)] group disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {status.loading ? 'Sending Message...' : 'Send Message'}
                <Send className="ml-3 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
