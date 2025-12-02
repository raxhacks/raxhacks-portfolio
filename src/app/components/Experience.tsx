"use client";

import Image from "next/image";
import Contact from "./Contact";

const experiences = [
  { src: "/oracle.svg", alt: "Oracle", label: null },
  { src: "/microsoft.svg", alt: "Microsoft", label: null },
  { src: "/bloomberg.svg", alt: "Bloomberg", label: "INCOMING" },
];

export default function Experience() {
  return (
    <div className="relative w-full bg-linear-to-b border-transparent
    from-slate-950 via-indigo-950 to-slate-900 text-white border">
      {/* Content container */}
      <div className="w-full px-4 font-extrabold text-center text-[calc(1rem+10vmin)]">
        {/* Intro */}
        <div className="experience-box pt-[50vh]">
          <p className="experience-text mx-auto text-balance bg-gradient-experience bg-size-[400%] bg-clip-text text-transparent text-[250px]">
            EXPERIENCE
          </p>
        </div>

        {/* Experience boxes */}
        {experiences.map((exp) => (
          <div key={exp.src} className="experience-box my-[50vh]">
            {exp.label && (
              <p className="experience-text mx-auto py-[0.2em] max-w-[15ch] text-balance bg-gradient-experience bg-size-[400%] bg-clip-text text-transparent mb-4 text-[0.5em]">
                {exp.label}
              </p>
            )}
            <div className="experience-text experience-image mx-auto flex justify-center relative">
              {/* Base white image (visible before animation) */}
              <Image
                src={exp.src}
                alt={exp.alt}
                width={200}
                height={200}
                className="brightness-0 invert"
              />
              {/* Gradient image overlay (uses the SVG as mask) */}
              <div
                className="absolute inset-0 bg-gradient-experience bg-size-[400%] experience-image-overlay"
                style={{
                  WebkitMaskImage: `url('${exp.src}')`,
                  maskImage: `url('${exp.src}')`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          </div>
        ))}
        <Contact />
      </div>
    </div>
  );
}