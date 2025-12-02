import { useScramble } from '@/lib/useScramble';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
    const {text, scrambleTo} = useScramble("Raxhacks");
    const [textOptions, setTextOptions] = useState<number>(0);

    return (
        <motion.header
            initial={{ scale: 0, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                duration: 0.6
            }}
            className=""
        >
            <div className="fixed inset-0 top-0 h-16 flex items-center z-50">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/80 font-black text-2xl min-w-[120px] ml-4"
                        onMouseEnter={() => {
                            setTextOptions(textOptions + 1);
                            if (textOptions % 2 === 1) {
                                scrambleTo("Top 1");
                            } else if (textOptions % 2 === 0) {
                                scrambleTo("Ray G.");
                            }
                        }}
                        onMouseLeave={() => scrambleTo("Raxhacks")}
                    >
                        {text}
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
}