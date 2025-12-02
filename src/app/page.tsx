'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScramble from '@/lib/useScramble';
import { ParallaxScroll } from './components/ParallaxScroll';

const Home = () => {
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [showText, setShowText] = useState<boolean>(false);
    const {text, scrambleTo} = useScramble("Top 1");

    useEffect(() => {
        const introTimer = setTimeout(() => {
            setShowIntro(false);
            setShowContent(true); // Show content immediately when intro ends
        }, 4000);
        
        // Show text after 0.5s (which triggers blur)
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 500);
        
        const firstScramble = setTimeout(() => {
            scrambleTo("Ray G.");
        }, 1000);
        const secondScramble = setTimeout(() => {
            scrambleTo("Raxhacks");
        }, 2500);
        return () => {
            clearTimeout(introTimer);
            clearTimeout(textTimer);
            clearTimeout(firstScramble);
            clearTimeout(secondScramble);
        };
    }, []);

    return (
        <div>
            {/* {showContent && <Header/>} */}
            
            {/* ParallaxScroll is always rendered but hidden behind intro */}
            <div className={`flex h-screen ${showContent ? 'visible' : 'invisible'}`}>
                {/* <section className='w-1/2'>
                    <MeTab />
                </section> */}
                <section className='w-full'>
                    <ParallaxScroll />
                </section>
            </div>
            
            {/* Intro overlay - no exit animation, just disappears */}
            {showIntro && (
                <div className="fixed inset-0 z-10">
                    {/* Background image */}
                    <div 
                        className={`absolute inset-0 bg-cover bg-center transition-[filter] duration-700 ease-out ${showText ? 'blur-xs' : 'blur-0'}`}
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515163988842-60ece4c9a5bb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHlvcmslMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D')" }}
                    />
                    
                    {/* Text overlay */}
                    <AnimatePresence>
                        {showText && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    scale: { type: 'spring', stiffness: 200, damping: 15 },
                                    opacity: { duration: 0.3 }
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl text-white/80 font-black">
                                    {text}
                                </h1>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Home;
