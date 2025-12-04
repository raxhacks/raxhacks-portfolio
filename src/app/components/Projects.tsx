import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ChevronLeft, ChevronRight, Github, ExternalLink, X } from 'lucide-react';

import { IProjectWithRelations } from '@/types/project';
import Image from 'next/image';

export function Projects() {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<IProjectWithRelations[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
        console.log('Fetched projects:', data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);
  
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
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Auto-cycle images in expanded view
  useEffect(() => {
    if (selectedProject !== null) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % projects[selectedProject].images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject !== null && e.key === 'Escape') {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleImageNavigate = (direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject !== null) {
      if (direction === 'right') {
        setCurrentImageIndex((prev) => (prev + 1) % projects[selectedProject].images.length);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + projects[selectedProject].images.length) % projects[selectedProject].images.length);
      }
    }
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="projects" 
        className="min-h-screen flex items-center px-8 md:px-20 lg:px-32 snap-section"
      >
        <motion.div 
          ref={ref}
          className="w-full max-w-4xl"
          style={{ scale, opacity, y }}
        >
          <motion.h2
            className="text-5xl mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Projects
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setSelectedProject(index);
                  setCurrentImageIndex(0);
                }}
                className="group relative aspect-square border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-white/30 transition-all cursor-pointer flex flex-col items-center justify-center p-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center flex-col">
                    <div className="mb-4 w-16 h-16">
                        {project.project_logo_url ? (
                            <Image
                                src={project.project_logo_url}
                                alt={`${project.name} Logo`}
                                className="w-full h-full object-contain"
                                width={64}
                                height={64}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                  <div className="text-2xl mb-2">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.year}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Tooltip Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
          >
            <motion.div
              className="relative max-w-3xl w-full bg-black/70 border border-white/20 rounded-xl overflow-hidden"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentImageIndex(0);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/10 transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Gallery */}
              <div className="relative aspect-video bg-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={projects[selectedProject].images[currentImageIndex].image_url}
                    alt={`${projects[selectedProject].name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Image navigation */}
                <button
                  onClick={(e) => handleImageNavigate('left', e)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 border border-white/20 hover:bg-black/90 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleImageNavigate('right', e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 border border-white/20 hover:bg-black/90 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Image dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {projects[selectedProject].images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/40'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl mb-1">{projects[selectedProject].name}</h3>
                    <div className="text-xs text-gray-500">{projects[selectedProject].year}</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  {projects[selectedProject].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[selectedProject].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-white/20 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                    {
                        projects[selectedProject].links.map((link, index) => (
                            <motion.a 
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:underline transition-colors ${
                                    link.name === 'GitHub' 
                                        ? 'border border-white/20 hover:bg-white/5' 
                                    : link.name === 'YouTube' 
                                        ? 'bg-[#FF0000] hover:bg-[#FF0000]/5 text-white border border-[#FF0000]' 
                                    : 'bg-white text-black hover:bg-white/90'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.name === 'GitHub' ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                {link.name === 'GitHub' ? 'Code' : link.name === 'YouTube' ? 'YouTube' : 'Demo'}
                            </motion.a>
                        )) 
                    }
                  {/* <motion.button 
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.button> */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}