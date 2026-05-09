"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Intro from "@/components/intro/intro";
import { IntroSection } from "@/components/main/intro-section";
import { ExperienceSection } from "@/components/main/experience-section";
import { ProjectsSection } from "@/components/main/projects-section";
import { ContactSection } from "@/components/main/contact-section";

const MotionImage = motion(Image);

const Main: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // intro component scale down and fade out
  const scale1 = useTransform(scrollYProgress, [0, 0.10, 1], [1, 0, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.10, 1], [1, 0, 0]);

  // backgroud blur to dark
  const blurComponent2Bg = useTransform(scrollYProgress, [0, 0.10, 0.25, 1], [0, 0, 12, 12]);
  const brightnessComponent2Bg = useTransform(scrollYProgress, [0, 0.10, 0.25, 1], [1, 1, 0.5, 0.5]);
  const bgFilter = useTransform(
    [blurComponent2Bg, brightnessComponent2Bg] as const,
    ([blur, brightness]) => `blur(${blur}px) brightness(${brightness})`
  );

  return (
    <div ref={containerRef} className="relative h-[1600vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {/*
          desktop background and mobile background based on the screen size
        */}
        <MotionImage
          fill
          src="/background.png"
          alt=""
          className="hidden sm:block object-cover absolute inset-0"
          style={{ filter: bgFilter }}
          priority
        />
        <MotionImage
          fill
          src="/mobile-background.JPG"
          alt=""
          className="block sm:hidden object-cover absolute inset-0"
          style={{ filter: bgFilter }}
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <IntroSection scrollYProgress={scrollYProgress} />
          <ExperienceSection scrollYProgress={scrollYProgress} />
          <ProjectsSection scrollYProgress={scrollYProgress} />
          <ContactSection scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none">
          <Image src="/arrow.svg" alt="Scroll Down" width={32} height={32} />
        </div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

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

export default Main;
