"use client";

import { useRef, useCallback } from "react";
import { Typewriter } from 'nextjs-simple-typewriter';

function RaxhacksTitle() {
    return (
        <div className="bg-none
        text-white text-[100px] md:text-[150px] lg:text-[200px] absolute left-1/2 -translate-x-1/2 top-[10%] lg:top-20 md:left-30 md:translate-x-0">
            <Typewriter
                words={['RAXHACKS', "SWE", "FOUNDER", "ATHLETE", "TOP 1"]}
                loop={0}
                cursor
                cursorStyle=""
                typeSpeed={150}
                deleteSpeed={130}
                delaySpeed={1000}
            />
        </div>
    );
}

export default function Intro() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (video && video.duration - video.currentTime < 0.3) {
            video.currentTime = 0;
            video.play();
        }
    }, []);

    return (
        <div className="w-full h-screen bg-black text-white relative overflow-hidden select-none">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://cdn.raxhacks.com/videos/intro-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            <RaxhacksTitle />
        </div>
    );
}