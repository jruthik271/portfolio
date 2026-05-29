import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThemeSwitcher from './components/ThemeSwitcher';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';

// Lazy load below the fold components
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Work = React.lazy(() => import('./components/Work'));
const Journey = React.lazy(() => import('./components/Journey'));
const Blogs = React.lazy(() => import('./components/Blogs'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="w-10 h-10 border-3 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin aspect-square"></div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white relative flex flex-col justify-between">
        {/* 1. Custom Interactive Cursors */}
        <CursorGlow />

        {/* 2. Interactive Background canvas */}
        <ParticleBackground />

        {/* 3. Global Navbar */}
        <Navbar />
        
        {/* 4. Isolated Router Views */}
        <main className="relative z-10 flex-grow pt-24 pb-12 w-full">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/work" element={<Work />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* 5. Theme Settings Drawer */}
        <ThemeSwitcher />

        {/* 6. Footer section */}
        <Footer />
      </div>
    </Router>
  );
}
