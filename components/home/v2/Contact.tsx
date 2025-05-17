"use client"

import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center gap-6 mt-6"
        >
            <div className='w-[100px] h-[100px] bg-primary rounded-full 
            flex items-center justify-center border-2 border-black overflow-hidden'>
                <Image src="/profile.jpeg" alt="logo" width={100} height={100} className="object-cover" />
            </div>
            <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    <a href="mailto:raymundo.guzman@gmail.com">
                        raxhacksofficial@gmail.com
                    </a>
                </li>
                <li className="flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    <a href="tel:+528120233873">
                        +52 (81) 2023-3873
                    </a>
                </li>
                <li className="flex items-center gap-2">
                    <Linkedin className="w-6 h-6" />
                    <a href="https://www.linkedin.com/in/rgzmn/">
                        in/rgzmn
                    </a>
                </li>
            </ul>
        </motion.div>
    );
}

export default Contact;