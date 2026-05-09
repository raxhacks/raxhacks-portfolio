"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Intro from "@/components/intro/intro";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const MotionImage = motion(Image);

const text1 =
  `I'm 22 years old.
  SWE.
  Founder.
  Athlete.`;

const text2 = "With experience working at";

const text3 = "Passionate about building projects like:";

const text4 = "Get in touch.";

// Helper function to process multiline text into lines, words, and characters with global sequential indices
function processText(text: string) {
  const rawLines = text.split("\n").map((lineRaw) => lineRaw.trim());
  let globalCharIndex = 0;
  const processedLines = rawLines.map((line) => {
    const words = line.split(/\s+/).filter(Boolean);
    return words.map((word) => {
      const chars = word.split("").map((char) => {
        const index = globalCharIndex++;
        return { char, index };
      });
      return { word, chars };
    });
  });
  return { processedLines, totalChars: globalCharIndex };
}

const { processedLines: processedText1, totalChars: totalChars1 } = processText(text1);
const { processedLines: processedText2, totalChars: totalChars2 } = processText(text2);
const { processedLines: processedText3, totalChars: totalChars3 } = processText(text3);
const { processedLines: processedText4, totalChars: totalChars4 } = processText(text4);

interface CharacterProps {
  char: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}

const Character: React.FC<CharacterProps> = ({ char, start, end, scrollYProgress }) => {
  // Smooth unblur, scale, and fade in transition
  const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]
  );
  const scale = useTransform(scrollYProgress, [0, start, end, 1], [0.9, 0.9, 1, 1]);

  return (
    <motion.span
      style={{ opacity, filter, scale }}
      className="inline-block text-white font-antonio font-bold uppercase tracking-wider"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const ScrollTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress across the 1200vh section (luxurious space for smooth storytelling transitions)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (Scroll 0.00 to 0.10): Component 1 scales down and fades out
  const scale1 = useTransform(scrollYProgress, [0, 0.10, 1], [1, 0, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.10, 1], [1, 0, 0]);

  // Background Blur & Brightness matches Phase 2 (Text 1 typing): goes from sharp/bright to blurred/dark
  const blurComponent2Bg = useTransform(scrollYProgress, [0, 0.10, 0.25, 1], [0, 0, 12, 12]);
  const brightnessComponent2Bg = useTransform(scrollYProgress, [0, 0.10, 0.25, 1], [1, 1, 0.5, 0.5]);
  const bgFilter = useTransform(
    [blurComponent2Bg, brightnessComponent2Bg] as const,
    ([blur, brightness]) => `blur(${blur}px) brightness(${brightness})`
  );

  // Phase 3 (Scroll 0.24 to 0.28): Text 1 fades out and translates up
  const text1Opacity = useTransform(scrollYProgress, [0, 0.24, 0.28, 1], [1, 1, 0, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.24, 0.28, 1], ["0px", "0px", "-40px", "-40px"]);

  // Phase 4 (Scroll 0.28 to 0.32): Work Experience Section (Text 2 + Logos) fades in and slides up
  // Phase 4b (Scroll 0.53 to 0.57): Work Experience Section fades out and translates up
  const expOpacity = useTransform(scrollYProgress, [0, 0.28, 0.32, 0.53, 0.57, 1], [0, 0, 1, 1, 0, 0]);
  const expY = useTransform(scrollYProgress, [0, 0.28, 0.32, 0.53, 0.57, 1], ["40px", "40px", "0px", "0px", "-40px", "-40px"]);

  // Phase 5 (Scroll 0.38 to 0.43): Logo 1 unblurs and reveals
  const logo1Opacity = useTransform(scrollYProgress, [0, 0.38, 0.43, 1], [0, 0, 1, 1]);
  const logo1Filter = useTransform(scrollYProgress, [0, 0.38, 0.43, 1], ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]);
  const logo1Scale = useTransform(scrollYProgress, [0, 0.38, 0.43, 1], [0.85, 0.85, 1, 1]);

  // Phase 6 (Scroll 0.43 to 0.48): Logo 2 unblurs and reveals
  const logo2Opacity = useTransform(scrollYProgress, [0, 0.43, 0.48, 1], [0, 0, 1, 1]);
  const logo2Filter = useTransform(scrollYProgress, [0, 0.43, 0.48, 1], ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]);
  const logo2Scale = useTransform(scrollYProgress, [0, 0.43, 0.48, 1], [0.85, 0.85, 1, 1]);

  // Phase 7 (Scroll 0.57 to 0.61): Projects Section fades in and slides up
  // Phase 7b (Scroll 0.82 to 0.86): Projects Section fades out and translates up
  const projOpacity = useTransform(scrollYProgress, [0, 0.57, 0.61, 0.82, 0.86, 1], [0, 0, 1, 1, 0, 0]);
  const projY = useTransform(scrollYProgress, [0, 0.57, 0.61, 0.82, 0.86, 1], ["40px", "40px", "0px", "0px", "-40px", "-40px"]);

  // Phase 8 (Scroll 0.67 to 0.72): Project 1 Card unblurs and reveals
  const proj1Opacity = useTransform(scrollYProgress, [0, 0.67, 0.72, 1], [0, 0, 1, 1]);
  const proj1Filter = useTransform(scrollYProgress, [0, 0.67, 0.72, 1], ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]);
  const proj1Scale = useTransform(scrollYProgress, [0, 0.67, 0.72, 1], [0.85, 0.85, 1, 1]);

  // Phase 9 (Scroll 0.72 to 0.77): Project 2 Card unblurs and reveals
  const proj2Opacity = useTransform(scrollYProgress, [0, 0.72, 0.77, 1], [0, 0, 1, 1]);
  const proj2Filter = useTransform(scrollYProgress, [0, 0.72, 0.77, 1], ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]);
  const proj2Scale = useTransform(scrollYProgress, [0, 0.72, 0.77, 1], [0.85, 0.85, 1, 1]);

  // Phase 10 (Scroll 0.86 to 0.90): Contact Section fades in and slides up
  const contactOpacity = useTransform(scrollYProgress, [0, 0.86, 0.90, 1], [0, 0, 1, 1]);
  const contactY = useTransform(scrollYProgress, [0, 0.86, 0.90, 1], ["40px", "40px", "0px", "0px"]);

  // Phase 11 (Scroll 0.94 to 0.98): Contact Buttons unblur and reveal
  const contactLinksOpacity = useTransform(scrollYProgress, [0, 0.94, 0.98, 1], [0, 0, 1, 1]);
  const contactLinksFilter = useTransform(scrollYProgress, [0, 0.94, 0.98, 1], ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]);
  const contactLinksScale = useTransform(scrollYProgress, [0, 0.94, 0.98, 1], [0.85, 0.85, 1, 1]);

  // Dynamic pointer events to prevent inactive absolute layers from hijacking clicks/hovers
  const text1PointerEvents = useTransform(scrollYProgress, (v) => v < 0.28 ? "auto" as const : "none" as const);
  const expPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.28 && v < 0.57) ? "auto" as const : "none" as const);
  const projPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.57 && v < 0.86) ? "auto" as const : "none" as const);
  const contactPointerEvents = useTransform(scrollYProgress, (v) => v >= 0.86 ? "auto" as const : "none" as const);

  return (
    <div ref={containerRef} className="relative h-[1200vh] bg-[#121212]">
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {/* Subtle decorative grid background for the premium feel */}
        <MotionImage fill src={`/background.png`} alt="" className="object-cover absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" style={{ filter: bgFilter }} />

        {/* Content Viewports */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* Section 1: Intro Statements */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y, pointerEvents: text1PointerEvents }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <p className="max-w-[700px] text-left text-3xl md:text-4xl leading-relaxed text-[#ededed] font-bold">
              {processedText1.map((line, lineIdx) => (
                <span key={lineIdx} className="block min-h-[1.2em] mb-2">
                  {line.map((wordData, wordIdx) => (
                    <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.4em]">
                      {wordData.chars.map((charData) => {
                        // Text 1 reveals from scroll progress 0.10 to 0.20
                        const charStart = 0.10 + (charData.index / totalChars1) * 0.07; // spans over 7% scroll
                        const charEnd = Math.min(charStart + 0.05, 0.21); // unblurs over 5% scroll
                        return (
                          <Character
                            key={charData.index}
                            char={charData.char}
                            start={charStart}
                            end={charEnd}
                            scrollYProgress={scrollYProgress}
                          />
                        );
                      })}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </motion.div>

          {/* Section 2: Work Experience (Text 2 + Logos) */}
          <motion.div
            style={{ opacity: expOpacity, y: expY, pointerEvents: expPointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="text-center">
              {/* "With experience working at" reveal heading */}
              <p className="text-2xl md:text-3xl font-antonio text-[#ededed]/80 mb-10 font-bold uppercase tracking-wider">
                {processedText2.map((line, lineIdx) => (
                  <span key={lineIdx} className="block min-h-[1.2em]">
                    {line.map((wordData, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.4em]">
                        {wordData.chars.map((charData) => {
                          // Text 2 reveals from scroll progress 0.32 to 0.38
                          const charStart = 0.32 + (charData.index / totalChars2) * 0.04; // spans over 4% scroll
                          const charEnd = Math.min(charStart + 0.04, 0.39); // unblurs over 4% scroll
                          return (
                            <Character
                              key={charData.index}
                              char={charData.char}
                              start={charStart}
                              end={charEnd}
                              scrollYProgress={scrollYProgress}
                            />
                          );
                        })}
                      </span>
                    ))}
                  </span>
                ))}
              </p>

              {/* Logos row - reveals per scroll */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-4xl px-4">

                {/* Logo Card 1 (Vercel) */}
                <motion.div
                  style={{ opacity: logo1Opacity, filter: logo1Filter, scale: logo1Scale }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-[280px] shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/25"
                >
                  <div className="p-3 bg-white/10 rounded-xl text-white">
                    {/* Vercel clean SVG */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M24 22.535H0L12 1.465l12 21.07z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white tracking-wide font-antonio">Vercel</h4>
                    <p className="text-sm text-[#ffb703] font-mono font-semibold">SWE Intern</p>
                    <p className="text-xs text-white/50 font-mono mt-0.5">2025 - Present</p>
                  </div>
                </motion.div>

                {/* Logo Card 2 (Stripe) */}
                <motion.div
                  style={{ opacity: logo2Opacity, filter: logo2Filter, scale: logo2Scale }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-[280px] shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/25"
                >
                  <div className="p-3 bg-[#635BFF]/15 rounded-xl text-[#635BFF]">
                    {/* Stripe beautiful S SVG */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M13.962 8.475c0-1.036-.846-1.562-2.237-1.562-1.785 0-3.32.444-4.512 1.05V3.344C8.423 2.923 10.3 2.65 11.954 2.65c3.84 0 6.136 1.93 6.136 5.432 0 4.148-5.27 4.881-5.27 6.425 0 1.104.975 1.63 2.454 1.63 2.054 0 3.84-.582 5.097-1.251v4.71c-1.393.593-3.411.895-5.215.895-3.953 0-6.551-2.023-6.551-5.419 0-4.321 5.375-4.996 5.375-6.6z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white tracking-wide font-antonio">Stripe</h4>
                    <p className="text-sm text-[#f25c54] font-mono font-semibold">Frontend Dev</p>
                    <p className="text-xs text-white/50 font-mono mt-0.5">2024 - 2025</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* Section 3: Passionate Building Projects */}
          <motion.div
            style={{ opacity: projOpacity, y: projY, pointerEvents: projPointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="text-center w-full max-w-4xl">
              {/* "Passionate about building projects like:" reveal heading */}
              <p className="text-2xl md:text-3xl font-antonio text-[#ededed]/80 mb-10 font-bold uppercase tracking-wider">
                {processedText3.map((line, lineIdx) => (
                  <span key={lineIdx} className="block min-h-[1.2em]">
                    {line.map((wordData, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.4em]">
                        {wordData.chars.map((charData) => {
                          // Text 3 reveals from scroll progress 0.61 to 0.67
                          const charStart = 0.61 + (charData.index / totalChars3) * 0.04; // spans over 4% scroll
                          const charEnd = Math.min(charStart + 0.04, 0.68); // unblurs over 4% scroll
                          return (
                            <Character
                              key={charData.index}
                              char={charData.char}
                              start={charStart}
                              end={charEnd}
                              scrollYProgress={scrollYProgress}
                            />
                          );
                        })}
                      </span>
                    ))}
                  </span>
                ))}
              </p>

              {/* Projects row - reveals per scroll */}
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full px-4">

                {/* Project Card 1: Scholarvy */}
                <motion.div
                  style={{ opacity: proj1Opacity, filter: proj1Filter, scale: proj1Scale }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full md:w-[45%] text-left shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="font-space-grotesk font-bold text-4xl md:text-5xl tracking-tighter leading-none text-[#EE5D28] mb-3">
                    Scholarvy
                  </div>
                  <div className="text-lg text-white/80 font-mono font-semibold mb-3">
                    Co-Founder & CTO
                  </div>
                  <p className="text-sm text-white/60 font-sans leading-relaxed">
                    The ultimate academic hub empowering researchers, authors, and scholars globally to discover, share, and collaborate on cutting-edge publications and research.
                  </p>
                </motion.div>

                {/* Project Card 2: Off the Record */}
                <motion.div
                  style={{ opacity: proj2Opacity, filter: proj2Filter, scale: proj2Scale }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full md:w-[45%] text-left shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="font-family-special-elite tracking-tighter text-3xl md:text-4xl leading-none text-white mb-4">
                    Off the Record
                  </div>
                  <div className="text-lg text-[#ffb703] font-mono font-semibold mb-3">
                    Co-Founder
                  </div>
                  <p className="text-sm text-white/60 font-sans leading-relaxed">
                    A beautifully encrypted, completely anonymous platform for authentic social storytelling, honest confessions, and unrestricted, candid conversations.
                  </p>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* Section 4: Contact Me */}
          <motion.div
            style={{ opacity: contactOpacity, y: contactY, pointerEvents: contactPointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="text-center w-full max-w-4xl flex flex-col items-center">
              {/* "Get in touch." reveal heading */}
              <p className="text-3xl md:text-4xl font-antonio text-[#ededed]/85 mb-12 font-bold tracking-wider uppercase">
                {processedText4.map((line, lineIdx) => (
                  <span key={lineIdx} className="block min-h-[1.2em]">
                    {line.map((wordData, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.4em]">
                        {wordData.chars.map((charData) => {
                          // Text 4 reveals from scroll progress 0.90 to 0.94
                          const charStart = 0.90 + (charData.index / totalChars4) * 0.03; // spans over 3% scroll
                          const charEnd = Math.min(charStart + 0.03, 0.94); // unblurs over 3% scroll
                          return (
                            <Character
                              key={charData.index}
                              char={charData.char}
                              start={charStart}
                              end={charEnd}
                              scrollYProgress={scrollYProgress}
                            />
                          );
                        })}
                      </span>
                    ))}
                  </span>
                ))}
              </p>

              {/* Social icons row */}
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

        </div>

        {/* Scroll Indicator Arrow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none">
          <Image src="/arrow.svg" alt="Scroll Down" width={32} height={32} />
        </div>

        {/* Black overlay that reveals Component 2 as it fades out */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* Component 1: shrinks to the center */}
        <motion.div
          style={{
            scale: scale1,
            transformOrigin: "center center",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Intro />
        </motion.div>
      </div>

    </div>
  );
};

export default ScrollTransition;
