import { useEffect } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useScramble } from "../../lib/useScramble";

const TARGET_TEXT = "Download";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function HackButton({ label }: { label: string }) {
    // Use shared hook for scramble behavior
    const { text, scrambleTo, stopScramble } = useScramble(label);

    return (
        <motion.button
            whileHover={{
                scale: 1.025,
            }}
            whileTap={{
                scale: 0.975,
            }}
            onMouseEnter={() => scrambleTo(TARGET_TEXT)}
            onMouseLeave={() => scrambleTo(label, { cyclesPerLetter: 1, shuffleTime: 30 })}
            className="group relative overflow-hidden rounded-lg border 
            border-neutral-500 bg-neutral-700 px-4 py-2 
            font-mono font-medium uppercase text-neutral-300 
            transition-colors hover:text-indigo-300"
        >
            <div className="relative z-10 flex items-center gap-2">
                {text.toLocaleLowerCase() !== "download" ? <FiLock /> : <FiUnlock />}
                <span>{text}</span>
            </div>
            <motion.span
                initial={{
                    y: "100%",
                }}
                animate={{
                    y: "-100%",
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1,
                    ease: "linear",
                }}
                className="duration-300 absolute inset-0 z-0 scale-125 
                bg-linear-to-t from-indigo-400/0 from-40% via-indigo-400 
                to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
        </motion.button>
    );
};