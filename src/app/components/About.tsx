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
            I'm a software engineer that loves start-ups. Ex-big tech intern. 2x founder and even got to Shark Tank Mexico once! All this while in college.
          </p>
          <p>
            I have worked mostly with web technologies like React, Next.js, Node.js, and more. Even though, the projects/start-ups and big tech expericne, have allowed me to
            help build systems in high scales, so i have experiece in microservices (even building the whole arch from scratch!), cloud computing, and (of course) AI.
          </p>
          <p>
            When I'm not coding, you'll find me running 10ks, at the gym, at MMA class, or exploring new tech trends. I don't believe in work-life balance; I believe in work-life integration.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}