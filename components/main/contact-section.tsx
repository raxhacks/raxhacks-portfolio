import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { RevealText } from "./reveal-text";
import { processText } from "@/lib/utils";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const text4 = "Get in touch.";
const { processedLines: processedText4, totalChars: totalChars4 } = processText(text4);

interface ContactSectionProps {
  scrollYProgress: MotionValue<number>;
}

export function ContactSection({ scrollYProgress }: ContactSectionProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.98, 0.99, 1], [0, 0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.98, 0.99, 1], ["40px", "40px", "0px", "0px"]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v >= 0.98 ? "auto" as const : "none" as const);

  const contactLinksOpacity = useTransform(scrollYProgress, [0, 0.99, 1.00], [0, 0, 1]);
  const contactLinksFilter = useTransform(scrollYProgress, [0, 0.99, 1.00], ["blur(12px)", "blur(12px)", "blur(0px)"]);
  const contactLinksScale = useTransform(scrollYProgress, [0, 0.99, 1.00], [0.85, 0.85, 1]);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <div className="text-center w-full max-w-4xl flex flex-col items-center">
        <RevealText
          processedLines={processedText4}
          totalChars={totalChars4}
          startProgress={0.98}
          revealSpan={0.01}
          revealBuffer={0.005}
          maxProgress={0.99}
          scrollYProgress={scrollYProgress}
          className="text-3xl md:text-4xl font-antonio text-[#ededed]/85 mb-12 font-bold tracking-wider uppercase text-center"
        />

        <motion.div
          style={{ opacity: contactLinksOpacity, filter: contactLinksFilter, scale: contactLinksScale }}
          className="flex gap-8 justify-center items-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl"
        >
          <a href="https://www.linkedin.com/in/rgzmn" target="_blank" rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 text-white/70 hover:text-[#0A66C2] hover:drop-shadow-[0_0_12px_rgba(10,102,194,0.5)]">
            <FaLinkedin size={48} />
          </a>
          <a href="https://x.com/raxhacks_" target="_blank" rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 text-white/70 hover:text-neutral-400 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
            <FaXTwitter size={48} />
          </a>
          <a href="https://github.com/raxhacks" target="_blank" rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 text-white/70 hover:text-[#a78bfa] hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]">
            <FaGithub size={48} />
          </a>
          <a href="mailto:raxhacksofficial@gmail.com" target="_blank" rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 text-white/70 hover:text-[#EA4335] hover:drop-shadow-[0_0_12px_rgba(234,67,53,0.5)]">
            <IoMdMail size={48} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
