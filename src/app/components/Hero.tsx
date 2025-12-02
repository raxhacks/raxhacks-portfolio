import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Split text animation
  const xRax = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const xHacks = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 snap-section relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="flex items-center"
      >
        <motion.h1
          className="text-8xl tracking-tight"
          style={{ x: xRax, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Rax
        </motion.h1>
        <motion.h1
          className="text-8xl tracking-tight"
          style={{ x: xHacks, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          hacks
        </motion.h1>
      </motion.div>
      <motion.p
        className="absolute bottom-[42%] text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
      >
        Sofware Engineer
      </motion.p>
    </section>
  );
}