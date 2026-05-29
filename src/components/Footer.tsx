import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-border/40">
      {/* Background Soft Glow Shaders */}
      <div className="absolute top-0 left-[10%] w-[350px] h-[350px] bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Call-to-Action Panel (Picture 1 "Let's Build Something Amazing") */}
        <div className="text-center pb-16 border-b border-border/30 mb-16 flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-white leading-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">Amazing</span>
          </h2>
          <p className="text-foreground/50 text-sm sm:text-base md:text-lg max-w-xl mb-8 font-medium">
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-black tracking-widest text-xs uppercase shadow-[0_4px_25px_rgba(168,85,247,0.15)] hover:bg-[var(--color-accent)]/90 hover:scale-[1.02] transition-all flex items-center justify-center border border-white/10"
          >
            Start a Conversation <ArrowUpRight size={14} className="ml-2 animate-pulse" />
          </Link>
        </div>

        {/* Four-Column Layout (Picture 1 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
          
          {/* Column 1: Identity & Bio */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-accent)] to-blue-500 flex items-center justify-center text-white font-black text-sm shadow-[0_4px_20px_rgba(6,182,212,0.25)] shrink-0">
                JS
              </div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">
                {portfolioConfig.personal.name}
              </h3>
            </div>
            <p className="text-foreground/50 text-xs sm:text-sm font-medium leading-relaxed">
              AI/ML undergraduate student and Flutter Full-Stack developer passionate about building amazing digital experiences and solving complex problems.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href={portfolioConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/80 flex items-center justify-center text-foreground/45 hover:text-white hover:border-[var(--color-accent)]/30 hover:bg-card transition-all duration-300"
              >
                <Github size={14} />
              </a>
              <a
                href={portfolioConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/80 flex items-center justify-center text-foreground/45 hover:text-white hover:border-[var(--color-accent)]/30 hover:bg-card transition-all duration-300"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={`mailto:${portfolioConfig.socials.email}`}
                className="w-9 h-9 rounded-full border border-border/80 flex items-center justify-center text-foreground/45 hover:text-white hover:border-[var(--color-accent)]/30 hover:bg-card transition-all duration-300"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-widest uppercase text-foreground/45 mb-6 border-b border-border/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  My Skills
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Blog Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Work & Projects */}
          <div>
            <h4 className="text-[10px] font-black tracking-widest uppercase text-foreground/45 mb-6 border-b border-border/30 pb-2">
              Work & Projects
            </h4>
            <ul className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/journey" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/journey" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/journey" className="text-foreground/50 hover:text-[var(--color-accent)] transition-colors">
                  Coding Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch & Direct Mail Display (Picture 1 spec) */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-foreground/45 mb-6 border-b border-border/30 pb-2">
              Get In Touch
            </h4>
            <p className="text-foreground/50 text-xs sm:text-sm font-medium leading-relaxed">
              Ready to collaborate? Reach out and let's create something amazing together.
            </p>
            
            <Link
              to="/contact"
              className="w-full px-6 py-3.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/95 text-white font-black tracking-widest text-xs uppercase shadow-[0_4px_20px_rgba(168,85,247,0.15)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <Mail size={14} /> Contact Me
            </Link>

            {/* Glass Card showing email directly */}
            <div className="glass-card bg-card p-4 rounded-2xl border border-border/60 shadow-lg text-left relative overflow-hidden backdrop-blur-md">
              <span className="block text-[8px] text-foreground/35 font-black uppercase tracking-widest mb-1">
                Email me at
              </span>
              <a
                href={`mailto:${portfolioConfig.socials.email}`}
                className="text-xs sm:text-sm font-bold text-white hover:text-[var(--color-accent)] transition-colors tracking-wide break-all"
              >
                {portfolioConfig.socials.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer Row */}
        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-foreground/35 text-[9px] font-black uppercase tracking-widest">
            © {currentYear} {portfolioConfig.personal.fullName}. Crafted with ❤️ using React & Vite.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/45">
            <Link to="/blogs" className="hover:text-white transition-colors duration-300">Blog</Link>
            <Link to="/skills" className="hover:text-white transition-colors duration-300">Skills</Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
