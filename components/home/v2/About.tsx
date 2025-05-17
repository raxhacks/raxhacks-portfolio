"use client"

import { Code } from "lucide-react";
import { motion } from "framer-motion";

const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-2">
                <Code width={16} height={16} className="inline-block"/> 
                Software Engineer
            </div>
            <div className="flex items-center gap-2">
                🚀 2x Founder
                <u className="text-blue-500">
                    <a href="https://www.scholarvy.com" target="_blank" rel="noopener noreferrer">
                        @Scholarvy
                    </a>
                </u>
                <u className="text-blue-500">
                    <a href="https://superhumansai.com" target="_blank" rel="noopener noreferrer">
                        @SuperhumansAI
                    </a>
                </u> 
            </div>
            <div className="flex items-center gap-2">
                🏃 2x Half Marathon Finisher. Preparing for my first marathon
            </div>
            <div className="flex items-center gap-2">
                🥋 Ex-national taekwondo athlete. Currently training Muay Thai
            </div>
            <div className="flex items-center gap-2">
                🐱 Cat lover (I have 3 cats)
            </div>
        </motion.div>
    );
}

export default About;