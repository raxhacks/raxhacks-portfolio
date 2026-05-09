"use client";

import Age from "./age";
import Experience from "./experience";
import Projects from "./projects/projects";
import ProjectsIntro from "./projects-intro";
import { useHeroStore } from "@/contexts/zustand";
import { useEffect, useRef } from "react";

export default function HeroContainer() {
    const blurHeroBgRef = useRef<HTMLDivElement>(null);
    const setBlurHeroBg = useHeroStore((state) => state.setBlurHeroBg);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setBlurHeroBg(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        if (blurHeroBgRef.current) {
            observer.observe(blurHeroBgRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [setBlurHeroBg]);

    return (
        <div className="relative w-full">

            <div className="h-screen" />

            <Age />
            <div
                ref={blurHeroBgRef}
                className="relative z-10 "
            >
                <Experience />
                <ProjectsIntro />
                <Projects />
            </div>
        </div>
    );
}
