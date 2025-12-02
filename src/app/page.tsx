"use client";

import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden snap-container">
      <AnimatedBackground />
      
      {/* Grid overlay that gets highlighted by flashlight */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-highlight"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="60"
                height="60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="spotlight">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="40%" stopColor="white" stopOpacity="0.6" />
              <stop offset="70%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="spotlight-mask">
              <circle
                cx={mousePosition.x}
                cy={mousePosition.y}
                r="300"
                fill="url(#spotlight)"
              />
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#grid-highlight)"
            mask="url(#spotlight-mask)"
          />
        </svg>
      </div>

      {/* Subtle glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
        }}
      />

      <Sidebar />

      <main className="relative z-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}