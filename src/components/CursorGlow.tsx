import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    const touchCheck = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    touchCheck();
    window.addEventListener('resize', touchCheck);
    return () => window.removeEventListener('resize', touchCheck);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid lag tracking (Apple/Stripe style)
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 24px (half of 48px width) to center the dot
      mouseX.set(e.clientX - 24);
      mouseY.set(e.clientY - 24);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 pointer-events-none z-50 mix-blend-screen shadow-[0_0_20px_var(--color-accent)] shadow-[rgba(168,85,247,0.25)] flex items-center justify-center"
    >
      <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"></div>
    </motion.div>
  );
}
