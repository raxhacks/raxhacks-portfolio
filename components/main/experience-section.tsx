import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { RevealText } from "./reveal-text";
import { processText } from "@/lib/utils";
import Image from "next/image";

const text2 = "With experience working at";
const { processedLines: processedText2, totalChars: totalChars2 } = processText(text2);

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  logoColorClass: string;
  roleColorClass: string;
  svgPath: string;
}

const experiencesData: ExperienceData[] = [
  {
    company: "Oracle",
    role: "SWE Intern",
    period: "Jul 2024 - Jan 2025",
    logoColorClass: "bg-white/10 text-white",
    roleColorClass: "text-[#ffb703]",
    svgPath: "/oracle.svg",
  },
  {
    company: "Microsoft",
    role: "SWE Intern",
    period: "Feb 2025 - Aug 2025",
    logoColorClass: "bg-white/10 text-white",
    roleColorClass: "text-[#ffb703]",
    svgPath: "/microsoft.svg",
  },
  {
    company: "Bloomberg",
    role: "SWE",
    period: "Feb 2026 - Present",
    logoColorClass: "bg-white/10 text-white",
    roleColorClass: "text-[#ffb703]",
    svgPath: "/bloomberg.svg",
  },
];

interface ExperienceSectionProps {
  scrollYProgress: MotionValue<number>;
}

export function ExperienceSection({ scrollYProgress }: ExperienceSectionProps) {
  const fadeOutStart = 0.72; // Extremely long, comfortable waiting plateau
  const fadeOutEnd = 0.76;

  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.32, fadeOutStart, fadeOutEnd, 1], [0, 0, 1, 1, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.28, 0.32, fadeOutStart, fadeOutEnd, 1], ["40px", "40px", "0px", "0px", "-40px", "-40px"]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.28 && v < fadeOutEnd) ? "auto" as const : "none" as const);

  /**
   * Calculate simultaneous scroll animations for each card
   * to ensure perfect symmetry when scrolling up or down
   */
  const experiencesTransforms = experiencesData.map(() => {
    const cardStart = 0.38;
    const cardEnd = 0.44;

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
      <div className="text-center">
        <RevealText
          processedLines={processedText2}
          totalChars={totalChars2}
          startProgress={0.32}
          revealSpan={0.04}
          revealBuffer={0.04}
          maxProgress={0.39}
          scrollYProgress={scrollYProgress}
          className="text-2xl md:text-3xl font-antonio text-[#ededed]/80 mb-10 font-bold uppercase tracking-wider text-center"
        />

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-5xl px-4">
          {experiencesData.map((exp, idx) => {
            const transform = experiencesTransforms[idx];

            return (
              <motion.div
                key={exp.company}
                style={transform}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-[500px] shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/25"
              >
                <div className={`p-3 rounded-xl ${exp.logoColorClass}`}>
                  <Image
                    src={exp.svgPath}
                    alt={exp.company}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white tracking-wide font-antonio">{exp.company}</h4>
                  <p className={`text-sm font-mono font-semibold ${exp.roleColorClass}`}>{exp.role}</p>
                  <p className="text-xs text-white/50 font-mono mt-0.5 whitespace-nowrap">{exp.period}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
