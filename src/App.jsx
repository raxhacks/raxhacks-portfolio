import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';

export default function App() {
  const [isHovering, setIsHovering] = useState(false);

  // E2B Sandbox detection
  const isE2bSandbox = window.location.hostname.includes('e2b.app') ||
                       window.location.hostname.includes('e2b.dev') ||
                       window.self !== window.top;

  const handleDownloadCV = () => {
    if (isE2bSandbox) {
      alert('You are in a development environment. This functionality requires you to publish the application to production to work correctly.');
      return;
    }
    // In production, this would trigger the actual download
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Path to your CV
    link.download = 'Raxhacks_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const companies = [
    {
      name: 'Oracle',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    },
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
    {
      name: 'Bloomberg',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/New_Bloomberg_Logo.svg',
    },
  ];

  const socials = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative font-['Space_Grotesk']">
      {/* Pure dark background with subtle noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1),rgba(10,10,10,1))] opacity-50" />

      {/* Minimal grain texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main name with RGB illumination effect */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 group"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* RGB glow effect */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute inset-0 blur-2xl"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{
                  x: '200%',
                  opacity: [0, 0.7, 0.7, 0]
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
                transition={{
                  x: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1], // Smooth easing curve
                    repeatDelay: 0,
                  },
                  opacity: {
                    duration: 2.5,
                    repeat: Infinity,
                    times: [0, 0.2, 0.8, 1],
                    ease: "easeInOut",
                  }
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #ff0080 25%, #00ff88 50%, #0080ff 75%, transparent 100%)',
                }}
              />
            )}
          </AnimatePresence>

          <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-extralight tracking-[-0.02em] text-white/90">
            Raxhacks
          </h1>
        </motion.div>

        {/* Role subtitle - ultra minimal */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/40 mb-10 font-light tracking-wide"
        >
          Software Engineer
        </motion.p>

        {/* Social links - minimal and spaced */}
        <motion.div
          variants={itemVariants}
          className="flex gap-10 mb-10"
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/90 transition-colors duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* CV Download Button - ultra minimal */}
        <motion.button
          variants={itemVariants}
          onClick={handleDownloadCV}
          className="mb-12 px-8 py-2.5 text-sm font-light tracking-wider text-white/40 hover:text-white/90 border border-white/10 hover:border-white/30 transition-all duration-300 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <FaDownload className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            Download CV
          </span>
        </motion.button>

        {/* Companies section - much smaller and cleaner */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-4 md:h-5 w-auto object-contain opacity-40 group-hover:opacity-80 transition-opacity duration-300 brightness-0 invert"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
