import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = ['About', 'Experience', 'Projects', 'Contact'];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('About');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="group relative flex items-center justify-end gap-3"
        >
          <span
            className={`text-xs transition-opacity duration-300 ${
              activeSection === section ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {section}
          </span>
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section
                ? 'bg-white w-3 h-3'
                : 'bg-white/30 group-hover:bg-white/50'
            }`}
          />
        </button>
      ))}
    </motion.nav>
  );
}
