import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
}

export function ScrollSection({ children, id }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scale effect: starts small, grows to full size when in view, shrinks when leaving
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  // Opacity effect: fade in and out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center snap-section relative"
      style={{
        scale,
        opacity,
      }}
    >
      {children}
    </motion.section>
  );
}
