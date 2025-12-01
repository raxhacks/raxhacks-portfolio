import { useRef, useState, useEffect } from "react";

export type ScrambleOpts = {
    cyclesPerLetter?: number;
    shuffleTime?: number;
};

const DEFAULT_CYCLES = 2;
const DEFAULT_SHUFFLE = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export function useScramble(initialText: string) {
    const intervalRef = useRef<number | null>(null);
    const [text, setText] = useState<string>(initialText);

    const clearIntervalRef = () => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const stopScramble = (finalText: string) => {
        clearIntervalRef();
        setText(finalText);
    };

    const scrambleTo = (target: string, opts?: ScrambleOpts) => {
        const cycles = opts?.cyclesPerLetter ?? DEFAULT_CYCLES;
        const shuffle = opts?.shuffleTime ?? DEFAULT_SHUFFLE;

        clearIntervalRef();

        let pos = 0;

        intervalRef.current = window.setInterval(() => {
            const scrambled = target
                .split("")
                .map((char, index) => {
                    if (pos / cycles > index) return char;

                    const randomCharIndex = Math.floor(Math.random() * CHARS.length);
                    return CHARS[randomCharIndex];
                })
                .join("");

            setText(scrambled);
            pos++;

            if (pos >= target.length * cycles) {
                stopScramble(target);
            }
        }, shuffle) as unknown as number;
    };

    useEffect(() => {
        return () => {
            clearIntervalRef();
        };
    }, []);

    return { text, scrambleTo, stopScramble } as const;
}

export default useScramble;
