import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { RevealText } from "./reveal-text";
import { processText } from "@/lib/utils";

const text1 =
  `I'm 22 years old.
  SWE.
  Founder.
  Athlete.`;

const { processedLines: processedText1, totalChars: totalChars1 } = processText(text1);

interface IntroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export function IntroSection({ scrollYProgress }: IntroSectionProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.24, 0.28, 1], [1, 1, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.24, 0.28, 1], ["0px", "0px", "-40px", "-40px"]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v < 0.28 ? "auto" as const : "none" as const);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <RevealText
        processedLines={processedText1}
        totalChars={totalChars1}
        startProgress={0.10}
        revealSpan={0.07}
        revealBuffer={0.05}
        maxProgress={0.21}
        scrollYProgress={scrollYProgress}
        className="max-w-[700px] text-left text-3xl md:text-4xl leading-relaxed text-[#ededed] font-bold"
        lineClassName="block min-h-[1.2em] mb-2"
      />
    </motion.div>
  );
}
