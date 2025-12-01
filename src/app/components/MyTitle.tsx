"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import LiveIcon from "./LiveIcon";
import useScramble from "@/lib/useScramble";

export default function MyTitle() {
    const [isDark, setIsDark] = useState(false);
    const {text, scrambleTo, stopScramble} = useScramble("Ray G.");

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <div className="w-full animate-hero-text border bg-card flex
        items-center p-4 rounded-lg">
            <div className="flex-1">
                <div className="flex items-center ">
                    <div className="text-4xl font-bold"
                    onMouseEnter={() => scrambleTo("Raxhacks")}
                    onMouseLeave={() => scrambleTo("Ray G.", { cyclesPerLetter: 1, shuffleTime: 30 })}
                    >
                        {text}
                    </div>
                    <div className="w-fit bg-primary text-primary-foreground ml-2
                    border-border rounded-lg px-3 py-1 text-xs">
                        <span className="text-xs font-medium">Incoming @ Bloomberg</span>
                        <span className="ml-1"><LiveIcon /></span>
                    </div>
                </div>
                <h3>Software Engineer. Founder. Top 1.</h3>
            </div>
            <div className="flex h-full items-center">
                <div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-lg bg-secondary hover:bg-accent transition-colors duration-300 group"
                        aria-label="Toggle dark mode"
                        >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-foreground group-hover:rotate-180 transition-transform duration-500" />
                        ) : (
                            <Moon className="w-5 h-5 text-foreground group-hover:-rotate-90 transition-transform duration-500" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}