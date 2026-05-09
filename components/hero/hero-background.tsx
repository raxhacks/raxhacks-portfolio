"use client";

import { useHeroStore } from "@/contexts/zustand";
import Image from "next/image";

export default function HeroBackground() {
    const blurHeroBg = useHeroStore((state) => state.blurHeroBg);

    return (
        <div className="fixed inset-0 w-full h-screen -z-10">
            <Image
                src="/background.png"
                alt="Background"
                fill
                priority
                className={`object-cover transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${blurHeroBg ? "scale-100 brightness-[0.25] blur-[10px]" : "scale-[1.15] brightness-75 blur-0"
                    }`}
            />
        </div>
    );
}
