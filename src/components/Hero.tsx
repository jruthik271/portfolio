import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative overflow-hidden bg-background">
      {/* Background Glow Shaders */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-10">
          
          {/* Left Column: Descriptive Profile & CTAs */}
          <div className="w-full lg:w-[60%] text-left flex flex-col items-start order-2 lg:order-1">
            
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-3 bg-card/65 border border-border/80 px-5 py-2.5 rounded-full mb-6 shadow-xl backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]"></span>
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-[var(--color-accent)]">
                {portfolioConfig.personal.availability}
              </span>
            </motion.div>

            {/* Name Bold Header */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{portfolioConfig.personal.fullName}</span>
            </motion.h1>

            {/* Sub-header Roles */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-mono text-[var(--color-accent)] mb-6 font-bold tracking-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              &lt;{portfolioConfig.personal.role}&gt;
            </motion.h2>

            {/* Bio Details */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-2xl mb-8 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              {portfolioConfig.personal.bio}
            </motion.p>

            {/* DIRECT EMAIL ID DISPLAY (Replaces standard icon actions) */}
            <motion.div
              className="flex items-center gap-3.5 bg-card/45 border border-border/80 px-5 py-3 rounded-2xl mb-8 hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-300 backdrop-blur-sm group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="text-[var(--color-accent)] w-4 h-4" />
              <a
                href={`mailto:${portfolioConfig.socials.email}`}
                className="text-xs sm:text-sm font-mono font-black text-white hover:text-[var(--color-accent)] hover:underline transition-colors tracking-wide"
              >
                {portfolioConfig.socials.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-foreground/45 hover:text-white p-1 hover:bg-background rounded-lg transition-colors border border-transparent hover:border-border ml-2"
                title="Copy Email Address"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </motion.div>

            {/* Social Icons row */}
            <motion.div 
              className="flex items-center space-x-4 mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
            >
              <a
                href={portfolioConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all p-2.5 bg-card/40 border border-border/40 hover:border-[var(--color-accent)]/40 rounded-full"
              >
                <Github size={18} />
              </a>
              <a
                href={portfolioConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-[var(--color-accent)] hover:scale-110 transition-all p-2.5 bg-card/40 border border-border/40 hover:border-[var(--color-accent)]/40 rounded-full"
              >
                <Linkedin size={18} />
              </a>
            </motion.div>

            {/* CTA action triggers */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#about"
                  className="group relative overflow-hidden rounded-full bg-[var(--color-accent)] text-white px-8 py-4 font-black tracking-widest text-xs uppercase shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_var(--color-accent)] transition-all flex items-center justify-center w-full"
                >
                  EXPLORE PROFILE
                  <ArrowRight className="ml-2.5 w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </MagneticButton>

              {/* DOWNLOAD CV: Pointing directly to static asset base URL path */}
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Jallipalli_Sumanth_Resume.pdf"
                  className="group rounded-full bg-card/85 border border-border/80 hover:border-[var(--color-accent)]/30 text-foreground px-8 py-4 font-black tracking-widest text-xs uppercase transition-all hover:bg-card-hover flex items-center justify-center backdrop-blur-sm w-full"
                >
                  DOWNLOAD CV
                  <Download className="ml-2.5 w-3.5 h-3.5 group-hover:translate-y-[1px] transition-transform duration-300" />
                </a>
              </MagneticButton>
            </motion.div>

          </div>

          {/* Right Column: Premium Glowing Avatar Image Holder */}
          <div className="w-full lg:w-[40%] flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="relative group cursor-pointer"
            >
              {/* Outer floating ambient accent glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-blue-500 rounded-[40px] opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-700 pointer-events-none animate-pulse"></div>

              {/* Glassmorphic border frame layout */}
              <div className="relative aspect-[4/5] w-72 sm:w-80 rounded-[40px] border border-border/80 p-5 bg-card/45 backdrop-blur-md shadow-2xl hover:border-[var(--color-accent)]/30 hover:bg-card-hover transition-all duration-500 overflow-hidden flex items-center justify-center">
                
                {/* Visual grid lines shader */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-background border border-border/60 flex items-center justify-center">
                  
                  {/* Real Image loading option (if public/avatar.png exists, otherwise beautiful graphic fallback) */}
                  <img
                    src={`${import.meta.env.BASE_URL}avatar.png`}
                    onError={(e) => {
                      // Fallback graphic if user avatar.png is not loaded yet
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.avatar-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                    alt="Sumanth Avatar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Elegant developer SVG illustration fallback if image isn't loaded */}
                  <div className="avatar-fallback hidden flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-tr from-[var(--color-accent)]/10 to-blue-500/10 text-[var(--color-accent)] group-hover:scale-105 transition-transform duration-700">
                    <svg className="w-16 h-16 opacity-60 mb-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 14a5 5 0 100-10 5 5 0 000 10zM12 17c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] font-black tracking-widest uppercase text-white/50">J. Sumanth</span>
                    <span className="text-[8px] text-[var(--color-accent)] font-bold mt-1 uppercase tracking-widest font-mono">&lt;AI/ML & FLUTTER&gt;</span>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
