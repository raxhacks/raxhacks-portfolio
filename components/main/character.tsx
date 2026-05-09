import { motion, useTransform, MotionValue } from "framer-motion";

interface CharacterProps {
    char: string;
    start: number;
    end: number;
    scrollYProgress: MotionValue<number>;
}
export function Character({ char, start, end, scrollYProgress }: CharacterProps) {
    const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);
    const filter = useTransform(
        scrollYProgress,
        [0, start, end, 1],
        ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]
    );
    const scale = useTransform(scrollYProgress, [0, start, end, 1], [0.9, 0.9, 1, 1]);

    return (
        <motion.span
            style={{ opacity, filter, scale }}
            className="inline-block text-white font-antonio font-bold uppercase tracking-wider"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}