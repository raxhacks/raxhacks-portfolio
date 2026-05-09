import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { RevealText } from "./reveal-text";
import { processText } from "@/lib/utils";

const text3 = "Passionate about building projects like:";
const { processedLines: processedText3, totalChars: totalChars3 } = processText(text3);

interface ProjectData {
  title: string;
  role: string;
  description: string;
  titleClassName: string;
  roleClassName: string;
}

const projectsData: ProjectData[] = [
  {
    title: "Scholarvy",
    role: "Co-Founder & CTO",
    description: "The ultimate academic hub empowering researchers, authors, and scholars globally to discover, share, and collaborate on cutting-edge publications and research.",
    titleClassName: "font-space-grotesk font-bold text-4xl md:text-5xl tracking-tighter leading-none text-[#EE5D28] mb-3",
    roleClassName: "text-lg text-white/80 font-mono font-semibold mb-3"
  },
  {
    title: "Off the Record",
    role: "Co-Founder",
    description: "A beautifully encrypted, completely anonymous platform for authentic social storytelling, honest confessions, and unrestricted, candid conversations.",
    titleClassName: "font-family-special-elite tracking-tighter text-3xl md:text-4xl leading-none text-white mb-4",
    roleClassName: "text-lg text-[#ffb703] font-mono font-semibold mb-3"
  }
];

interface ProjectsSectionProps {
  scrollYProgress: MotionValue<number>;
}

export function ProjectsSection({ scrollYProgress }: ProjectsSectionProps) {
  const fadeOutStart = 0.98;
  const fadeOutEnd = 0.99;

  const opacity = useTransform(scrollYProgress, [0, 0.76, 0.79, fadeOutStart, fadeOutEnd, 1], [0, 0, 1, 1, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.76, 0.79, fadeOutStart, fadeOutEnd, 1], ["40px", "40px", "0px", "0px", "-40px", "-40px"]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.76 && v < fadeOutEnd) ? "auto" as const : "none" as const);

  /**
   * Calculate simultaneous scroll animations for each card
   * to ensure perfect symmetry when scrolling up or down
   */
  const projectsTransforms = projectsData.map(() => {
    const cardStart = 0.82;
    const cardEnd = 0.87;

    const cardOpacity = useTransform(scrollYProgress, [0, cardStart, cardEnd, 1], [0, 0, 1, 1]);
    const cardFilter = useTransform(
      scrollYProgress,
      [0, cardStart, cardEnd, 1],
      ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]
    );
    const cardScale = useTransform(scrollYProgress, [0, cardStart, cardEnd, 1], [0.85, 0.85, 1, 1]);

    return { opacity: cardOpacity, filter: cardFilter, scale: cardScale };
  });

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <div className="text-center w-full max-w-5xl">
        <RevealText
          processedLines={processedText3}
          totalChars={totalChars3}
          startProgress={0.79}
          revealSpan={0.03}
          revealBuffer={0.01}
          maxProgress={0.83}
          scrollYProgress={scrollYProgress}
          className="text-2xl md:text-3xl font-antonio text-[#ededed]/80 mb-10 font-bold uppercase tracking-wider text-center"
        />

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full px-4">
          {projectsData.map((project, idx) => {
            const transform = projectsTransforms[idx];

            return (
              <motion.div
                key={project.title}
                style={transform}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full md:w-[50%] max-w-[500px] text-left shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={project.titleClassName}>
                  {project.title}
                </div>
                <div className={project.roleClassName}>
                  {project.role}
                </div>
                <p className="text-sm text-white/60 font-sans leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
