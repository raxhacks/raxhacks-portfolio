"use client"

import { motion, useScroll, useTransform, AnimatePresence, useInView as useFramerInView } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { IExperience } from '@/types/experience';
import Image from 'next/image';

function ExperienceCard({ exp, index, onSelect }: { exp: IExperience, index: number, onSelect: () => void }) {
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useFramerInView(cardRef, { 
    once: false,
    amount: 0.3,
  });
  const isFromLeft = index % 2 === 0;

  // Delay initial animation check until after mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const shouldAnimate = mounted && isInView;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full flex items-center"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={shouldAnimate ? { 
        opacity: 1, 
        scale: 1,
        y: 0
      } : {
        opacity: 0,
        scale: 0.5,
        y: 50
      }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        bounce: 0.5
      }}
    >
      {/* Left half */}
      <div className={`flex-1 flex items-center ${isFromLeft ? 'justify-start' : 'justify-end'}`}>
        {isFromLeft ? (
          <>
            <motion.button
              onClick={onSelect}
              className="group relative w-32 h-32 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-white/30 transition-all cursor-pointer flex flex-col items-center justify-center p-6 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-3 text-gray-400 group-hover:text-white transition-colors">
                <Image
                  src={exp.company_logo_url || ''}
                  alt={`${exp.company_name} logo`}
                  width={48}
                  height={48}
                />
              </div>
              <div className="text-xs text-center text-gray-400 group-hover:text-gray-300 transition-colors">
                {exp.role}
              </div>
            </motion.button>
            <motion.div
              className="flex-1 h-px bg-white/20"
              initial={{ scaleX: 0 }}
              animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </>
        ) : null}
      </div>

      {/* Center dot */}
      <motion.div
        className="w-3 h-3 rounded-full bg-white shrink-0 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          duration: 0.3,
          delay: 0.4,
          type: "spring",
          bounce: 0.6
        }}
      />

      {/* Right half */}
      <div className={`flex-1 flex items-center ${!isFromLeft ? 'justify-end' : 'justify-start'}`}>
        {!isFromLeft ? (
          <>
            <motion.div
              className="flex-1 h-px bg-white/20"
              initial={{ scaleX: 0 }}
              animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ transformOrigin: 'right' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.button
              onClick={onSelect}
              className="group relative w-32 h-32 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-white/30 transition-all cursor-pointer flex flex-col items-center justify-center p-6 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-3 text-gray-400 group-hover:text-white transition-colors">
                <Image
                  src={exp.company_logo_url || ''}
                  alt={`${exp.company_name} logo`}
                  width={48}
                  height={48}
                />
              </div>
              <div className="text-xs text-center text-gray-400 group-hover:text-gray-300 transition-colors">
                {exp.role}
              </div>
            </motion.button>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}

// ExperienceForm and admin modal moved to admin ExperienceTable to avoid duplication

export function Experience() {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Bubble effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.85, 1, 1, 0.85]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  // Parallax
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch('/api/experiences');
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        id="experience" 
        className="min-h-screen flex items-center px-8 md:px-20 lg:px-32 snap-section py-20"
      >
        <motion.div 
          ref={ref}
          className="w-full max-w-6xl mx-auto"
          style={{ scale, opacity, y }}
        >
          <motion.h2
            className="text-5xl mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Experience
          </motion.h2>

          {/* admin modal moved to admin ExperienceTable; public portfolio doesn't expose creation UI */}

          <div className="relative flex flex-col gap-12 md:gap-16">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                onSelect={() => setSelectedExp(index)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Tooltip Modal */}
      <AnimatePresence>
        {selectedExp !== null && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              className="relative max-w-md w-full bg-black/70 border border-white/20 rounded-xl p-8"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-4xl text-gray-400 mb-4">
                <Image
                  src={experiences[selectedExp].company_logo_url || ''}
                  alt={`${experiences[selectedExp].company_name} logo`}
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-2xl mb-2">{experiences[selectedExp].role}</h3>
              <div className="text-sm text-gray-400 mb-2">{experiences[selectedExp].company_name}</div>
              <div className="text-xs text-gray-500 mb-4">
                {`${new Date(experiences[selectedExp].start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - ${experiences[selectedExp].end_date ? new Date(experiences[selectedExp].end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}`}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {experiences[selectedExp].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}