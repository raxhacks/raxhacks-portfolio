import useScramble from '@/lib/useScramble';
import Slides from './Slides';
import { useState } from 'react';

export function ParallaxScroll() {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll [perspective:1px] [transform-style:preserve-3d] bg-transparent from-[#512d33] via-[#264063] via-[#512d33] to-[#a79519]">
      {/* Hero Section 1 */}
      <section className="relative w-full h-full [transform-style:inherit]">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center [transform:translateZ(-1px)_scale(2)] blur-xs"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515163988842-60ece4c9a5bb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHlvcmslMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D')" }}
        />
        <div 
        className="flex items-center w-full h-full
        justify-center text-5xl md:text-7xl lg:text-8xl text-white/80 font-black">
            <div className="relative inline-block cursor-pointer py-4 px-2
                before:content-[''] before:absolute before:w-full before:h-[2px] 
                before:bg-gradient-to-r before:from-red-500 before:to-cyan-400
                before:top-0 before:left-0 before:scale-x-0 before:origin-left
                before:transition-transform before:duration-400 before:ease-out
                after:content-[''] after:absolute after:w-full after:h-[2px]
                after:bg-gradient-to-r after:from-red-500 after:to-cyan-400
                after:bottom-0 after:left-0 after:scale-x-0 after:origin-right
                after:transition-transform after:duration-400 after:ease-out
                hover:before:scale-x-100 hover:after:scale-x-100
            ">
                Raxhacks
            </div>
        </div>
      </section>

      {/* Content Section 1
      <section className="relative w-full h-full [transform-style:inherit] text-center">
        <div className="text-2xl md:text-3xl lg:text-4xl text-white py-[25vh] opacity-60">
          Projects
        </div>
      </section> */}

      {/* Hero Section 2 */}
      <section className="relative w-full h-full [transform-style:inherit]">
        <div 
          className="absolute inset-0 -z-20 bg-cover bg-center [transform:translateZ(-1px)_scale(2)]"
        />
        <Slides />
      </section>
    </div>
  );
}
