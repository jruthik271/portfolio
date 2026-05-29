import { portfolioConfig } from '../config/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-6 border-t border-border/60 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left relative z-10">
        <div>
          <h2 className="text-2xl font-black mb-3 tracking-tighter">
            {portfolioConfig.personal.name.toUpperCase()}
            <span className="text-[var(--color-accent)]">.</span>
          </h2>
          <p className="text-foreground/45 text-xs sm:text-sm max-w-sm font-medium leading-relaxed">
            AI/ML Undergraduate Student & Flutter Full Stack Developer building secure, scaling full-stack environments.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex gap-6 text-xs font-black uppercase tracking-widest text-foreground/45">
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#work" className="hover:text-white transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
          <p className="text-foreground/35 text-[9px] font-black uppercase tracking-widest">
            © {currentYear} {portfolioConfig.personal.fullName}. Built with React, TypeScript & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
