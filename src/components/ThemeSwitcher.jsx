import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const themes = [
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

  const setTheme = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('portfolio-theme', themeId);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 bg-background/95 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-xl w-64 max-h-[60vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-foreground">Theme Settings</h3>
              <button onClick={() => setIsOpen(false)} className="text-foreground/50 hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                    currentTheme === theme.id ? 'bg-card-hover' : 'hover:bg-card hover:border-[rgba(255,255,255,0.05)] border border-transparent'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full mr-3 shadow-sm"
                    style={{ backgroundColor: theme.color }}
                  ></span>
                  <span className="text-sm text-foreground/80">{theme.label}</span>
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
        className="w-12 h-12 bg-card border border-border backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-card-hover transition-colors shadow-lg group relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-20 transition-opacity"></span>
        <Palette size={20} className="relative z-10 text-[var(--color-accent)]" />
      </motion.button>
    </div>
  );
}
