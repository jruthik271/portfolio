import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

export interface ThemeOption {
  id: string;
  label: string;
  color: string;
}

export const themes: ThemeOption[] = [
  { id: 'violet', label: 'Midnight Violet', color: '#a855f7' },
  { id: 'crimson', label: 'Crimson Night', color: '#ef4444' },
  { id: 'sunset', label: 'Ocean Sunset', color: '#f97316' },
  { id: 'aurora', label: 'Teal Aurora', color: '#14b8a6' },
  { id: 'gold', label: 'Luxury Gold', color: '#eab308' },
  { id: 'obsidian-rose', label: 'Obsidian Rose', color: '#f43f5e' },
  { id: 'slate-citrus', label: 'Slate Citrus', color: '#f59e0b' },
  { id: 'neon-electric', label: 'Neon Electric', color: '#84cc16' },
  { id: 'vivid-cyan', label: 'Vivid Cyan', color: '#06b6d4' },
  { id: 'forest-green', label: 'Forest Green', color: '#22c55e' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('violet');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'violet';
    setTheme(savedTheme);
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('portfolio-theme', themeId);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 bg-background/85 backdrop-blur-xl border border-border p-5 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.4)] w-72 max-h-[60vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h3 className="text-sm font-black tracking-widest uppercase text-foreground">Theme Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/50 hover:text-foreground p-1 hover:bg-card rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`w-full flex items-center p-3 rounded-2xl transition-all duration-300 border ${
                    currentTheme === theme.id
                      ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-white'
                      : 'hover:bg-card border-transparent text-foreground/75 hover:text-foreground'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full mr-4 shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/20 shrink-0"
                    style={{ backgroundColor: theme.color }}
                  ></span>
                  <span className="text-xs font-bold tracking-wider">{theme.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-card/85 border border-border backdrop-blur-xl rounded-full flex items-center justify-center text-foreground hover:bg-card-hover transition-all shadow-[0_4px_30px_rgba(0,0,0,0.2)] group relative overflow-hidden"
        style={{ boxShadow: `0px 0px 20px rgba(var(--color-accent), 0.1)` }}
      >
        <span className="absolute inset-0 w-full h-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity"></span>
        <Palette size={20} className="relative z-10 text-[var(--color-accent)] animate-pulse" />
      </motion.button>
    </div>
  );
}
