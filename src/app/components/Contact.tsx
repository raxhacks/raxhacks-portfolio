import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useRef } from 'react';

const socials = [
  { 
    icon: Mail, 
    label: 'Email', 
    href: 'mailto:hello@raxhacks.com',
    hoverBg: 'hover:bg-[#dd4b39]',
    hoverBorder: 'hover:border-[#dd4b39]',
  },
  { 
    icon: Github, 
    label: 'GitHub', 
    href: 'https://github.com',
    hoverBg: 'hover:bg-[#6e5494]',
    hoverBorder: 'hover:border-[#6e5494]',
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    href: 'https://linkedin.com',
    hoverBg: 'hover:bg-[#0077b5]',
    hoverBorder: 'hover:border-[#0077b5]',
  },
  { 
    icon: Twitter, 
    label: 'Twitter', 
    href: 'https://twitter.com',
    hoverBg: 'hover:bg-[#1DA1F2]',
    hoverBorder: 'hover:border-[#1DA1F2]',
  },
];

export function Contact() {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen flex items-center px-8 md:px-20 lg:px-32 snap-section"
    >
      <motion.div
        ref={ref}
        className="max-w-3xl"
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <h2 className="text-5xl mb-8">Contact</h2>
        <p className="text-gray-400 mb-12 text-xl">
          Let's work together on your next project. Feel free to reach out through any of the channels below.
        </p>

        <div className="flex flex-wrap gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-4 border border-white/20 rounded-lg transition-colors ${social.hoverBg} ${social.hoverBorder}`}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                bounce: 0.5
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
              <span>{social.label}</span>
            </motion.a>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-gray-500 text-sm">
          © 2024 Raxhacks. All rights reserved.
        </div>
      </motion.div>
    </section>
  );
}