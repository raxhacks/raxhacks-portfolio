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
                className="hidden sm:block absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://cdn.raxhacks.com/videos/intro-bg.mp4" type="video/mp4" />
            </video>
            <video
                autoPlay
                muted
                playsInline
                preload="auto"
                className="sm:hidden block absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://cdn.raxhacks.com/videos/intro-mobile-bg.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Moving Grain Overlay (sm:hidden to target only mobile video) */}
            <div className="sm:hidden absolute inset-0 pointer-events-none overflow-hidden z-10 border-none outline-none select-none">
                <div 
                    className="absolute inset-[-100px] opacity-[0.09] mix-blend-overlay animate-mobile-grain border-none outline-none select-none pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        backgroundRepeat: 'repeat',
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes mobile-grain-animation {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5px, -5px); }
                    20% { transform: translate(-10px, 5px); }
                    30% { transform: translate(5px, -10px); }
                    40% { transform: translate(-5px, 10px); }
                    50% { transform: translate(-10px, 5px); }
                    60% { transform: translate(10px, -5px); }
                    70% { transform: translate(5px, 5px); }
                    80% { transform: translate(5px, -10px); }
                    90% { transform: translate(-5px, 5px); }
                }
                .animate-mobile-grain {
                    animation: mobile-grain-animation 0.3s steps(6) infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
            `}} />

            <div className="absolute inset-0 bg-black/50" />
            <RaxhacksTitle />
        </div>
    );
}