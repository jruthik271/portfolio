import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { portfolioConfig } from '../config/portfolio';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/work' },
    { name: 'Journey', to: '/journey' },
    { name: 'Blogs', to: '/blogs' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-2xl font-black tracking-tighter"
        >
          <Link to="/" className="text-white hover:text-[var(--color-accent)] transition-colors">
            {portfolioConfig.personal.name.toUpperCase()}
            <span className="text-[var(--color-accent)]">.</span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `text-xs font-bold tracking-widest uppercase relative py-1 transition-colors ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-foreground/50 hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          <MagneticButton>
            <Link
              to="/contact"
              className="relative overflow-hidden bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group hover:text-white block"
            >
              <span className="relative z-10 transition-colors group-hover:text-white">Hire Me</span>
              <span className="absolute inset-0 w-full h-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground hover:text-[var(--color-accent)] p-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/80 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-black tracking-wider uppercase ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-foreground/75'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[var(--color-accent)] text-white font-black tracking-widest uppercase py-3 rounded-full text-xs block"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
