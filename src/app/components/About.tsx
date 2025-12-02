import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useRef } from 'react';

export function About() {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Bubble effect: scale and opacity
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

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center px-8 md:px-20 lg:px-32 snap-section relative"
    >
      <motion.div
        ref={ref}
        className="max-w-3xl"
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <motion.h2 
          className="text-5xl mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About
        </motion.h2>
        <motion.div 
          className="space-y-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>
            I'm a passionate developer with a keen eye for design and a love for creating
            seamless digital experiences. My work bridges the gap between functionality
            and aesthetics.
          </p>
          <p>
            With expertise in modern web technologies, I specialize in building responsive,
            performant applications that prioritize user experience. Every project is an
            opportunity to push creative boundaries.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new design trends, contributing
            to open source, or experimenting with emerging technologies.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}