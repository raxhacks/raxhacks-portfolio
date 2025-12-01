'use client';

import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
    // timings
    const MYSTICAL_MS = 1500;
    const VISIBLE_MS = 1000;
    const FADE_OUT_MS = 800;
    const EXTRA_DELAY_MS = 500; // extra delay before showing Experiences

    const [showExperiences, setShowExperiences] = useState(false);
    const [textFadingOut, setTextFadingOut] = useState(false);

    useEffect(() => {
        // after mystical appear + visible -> fade out text, then show experiences
        const t1 = setTimeout(() => setTextFadingOut(true), MYSTICAL_MS + VISIBLE_MS);
        const t2 = setTimeout(
            () => setShowExperiences(true),
            MYSTICAL_MS + VISIBLE_MS + FADE_OUT_MS + EXTRA_DELAY_MS
        );
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-noise overflow-x-hidden relative no-scrollbar
    bg-background text-foreground container mx-auto flex flex-col"
        >
            {/* Subtle noise overlay */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-noise animate-noise-float"></div>
            </div>
            
            {/* Hero Section */}
            <section
                className={`min-h-screen flex py-4 ${!showExperiences ? 'justify-center' : 'justify-start'} 
          relative flex-col items-center`}
            >
                {!showExperiences && (
                    <div className="text-center z-10">
                        <div className="space-y-12">
                            <h1
                                className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground 
            leading-none tracking-tight "
                            >
                                <div
                                    className={`opacity-0 ${textFadingOut ? 'animate-fade-out' : 'animate-hero-text'}`}
                                >
                                    RAXHACKS
                                </div>
                            </h1>
                        </div>
                    </div>
                )}
            </section>
            
        </div>
    );
};

export default Home;
