import Image from 'next/image';
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import HackButton from './HackButton';

function ContactInfo() {
    const socialLinks = [
        {
            name: "Email",
            icon: Mail,
            url: "mailto:raxhacks@gmail.com",
            color: "hover:text-orange-600 dark:hover:text-orange-400",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://www.linkedin.com/in/raxhacks/",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
        },
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/raxhacks",
            color: "hover:text-purple-600 dark:hover:text-purple-400",
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: "https://twitter.com/raxhacks",
            color: "hover:text-sky-500 dark:hover:text-sky-400",
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://www.instagram.com/raxhacks/",
            color: "hover:text-pink-600 dark:hover:text-pink-400",
        },
    ];

    return (
        <div className="w-fit">
            <ul className="flex gap-2 justify-between items-center">
                {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <li key={link.name}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className={`transition-all duration-300 transform hover:scale-110 ${link.color}`}
                            >
                                <Icon size={15} strokeWidth={1.5} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function AboutMe({ className }: { className?: string }) {
    const companyLogos = [
        {
            name: 'Bloomberg',
            logo: 'https://storage.googleapis.com/raxhacks-bucket/portfolio/bloomberg.svg',
        },
        {
            name: 'Microsoft',
            logo: 'https://storage.googleapis.com/raxhacks-bucket/portfolio/microsoft.svg',
        },
        {
            name: 'Oracle',
            logo: 'https://storage.googleapis.com/raxhacks-bucket/portfolio/oracle.svg',
        },
    ];

    return (
        <div className={`${className} p-4 animate-fade-in border h-full bg-card rounded-lg`}>
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">About Me</div>
                <ContactInfo />
            </div>
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/me.png"
                    alt="Raxhacks"
                    width={200}
                    height={200}
                    className="rounded-full"
                />
            </div>
            <div className="mt-2 flex items-center justify-center gap-4">
                <div className="text-lg font-bold">
                    <span>Prev @</span>
                    <span>
                        <Image
                            src={"/microsoft.svg"}
                            alt={"microsoft"}
                            width={80}
                            height={20}
                            className="inline-block mx-2"
                        />
                        <Image
                            src={"/oracle.svg"}
                            alt={"oracle"}
                            width={80}
                            height={20}
                            className="inline-block mx-2"
                        />
                    </span>
                </div>
            </div>
            <div className="mt-4 flex justify-center"> 
                <p>
                    Ex-taekwondo athlete. 2x-Half Marathonist. 3x founder. I will have a 🦄 one day.
                </p>
            </div>
            <div className="flex justify-center mt-4">
                <HackButton 
                    label="Resume"
                />
            </div>
        </div>
    );
}