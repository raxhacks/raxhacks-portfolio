import React from "react";
import { MotionValue } from "framer-motion";
import { Character } from "./character";
import { WordData } from "@/lib/utils";

interface RevealTextProps {
    processedLines: WordData[][];
    totalChars: number;
    startProgress: number;
    revealSpan: number;
    revealBuffer: number;
    maxProgress: number;
    scrollYProgress: MotionValue<number>;
    className?: string;
    lineClassName?: string;
}

export function RevealText({
    processedLines,
    totalChars,
    startProgress,
    revealSpan,
    revealBuffer,
    maxProgress,
    scrollYProgress,
    className = "",
    lineClassName = "block min-h-[1.2em]"
}: RevealTextProps) {
    return (
        <p className={className}>
            {processedLines.map((line, lineIdx) => (
                <span key={lineIdx} className={lineClassName}>
                    {line.map((wordData, wordIdx) => (
                        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.4em]">
                            {wordData.chars.map((charData) => {
                                const charStart = startProgress + (charData.index / totalChars) * revealSpan;
                                const charEnd = Math.min(charStart + revealBuffer, maxProgress);
                                return (
                                    <Character
                                        key={charData.index}
                                        char={charData.char}
                                        start={charStart}
                                        end={charEnd}
                                        scrollYProgress={scrollYProgress}
                                    />
                                );
                            })}
                        </span>
                    ))}
                </span>
            ))}
        </p>
    );
}
