import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Visibility Observer to save performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Using computed HSL accent to shade particles slightly
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 22000); // Optimized count
      for (let i = 0; i < density; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const animate = () => {
      if (!ctx || !canvas) return;

      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.update();
          particle.draw();

          // Optimized line connections with viewport bounds
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 90) {
              ctx.beginPath();
              // Fade connection line based on proximity
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 90)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-50 bg-[#02000d]"
    />
  );
}
