import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Contact() {
    return (
        <div className="relative z-10 bg-black text-white min-h-screen flex flex-col gap-8 justify-center items-center">
            <h2 className="text-5xl font-bold">Contact Me</h2>
            <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/rgzmn" target="_blank"
                    className="transition-all duration-300 hover:scale-125 hover:text-[#0A66C2] hover:drop-shadow-[0_0_12px_rgba(10,102,194,0.5)]">
                    <FaLinkedin size={48} />
                </a>
                <a href="https://x.com/raxhacks_" target="_blank"
                    className="transition-all duration-300 hover:scale-125 hover:text-neutral-400 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                    <FaXTwitter size={48} />
                </a>
                <a href="https://github.com/raxhacks" target="_blank"
                    className="transition-all duration-300 hover:scale-125 hover:text-[#a78bfa] hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]">
                    <FaGithub size={48} />
                </a>
                <a href="raxhacksofficial@gmail.com" target="_blank"
                    className="transition-all duration-300 hover:scale-125 hover:text-[#EA4335] hover:drop-shadow-[0_0_12px_rgba(234,67,53,0.5)]">
                    <IoMdMail size={48} />
                </a>
            </div>
        </div>
    );
}