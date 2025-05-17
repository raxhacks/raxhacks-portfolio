import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero: React.FC = () => {
    return (
        <section className="container py-24 md:py-32">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                    <div>
                        <Badge variant="outline" className="mb-2 border-zinc-700 text-zinc-400 p-2 px-4">
                            @Microsoft SWE Intern <Image src="/microsoft_logo.svg" alt="Microsoft" width={16} height={16} className="inline-block ml-2" />
                        </Badge>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Hi, I'm <span className="text-zinc-100">Ray</span>
                        </h1>
                        <p className="mt-4 max-w-[600px] text-zinc-400 md:text-lg">
                            Software Engineer. 2x Founder.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="group bg-zinc-100 text-black hover:bg-white">
                            Contact me <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            View Projects
                        </Button>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Link href="https://github.com/raxhacks" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                        <Link href="https://linkedin.com/in/rgzmn" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </Link>
                        <Link href="mailto:hello@example.com">
                            <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-zinc-800 md:h-80 md:w-80">
                        <Image
                            src="/profile.jpeg?height=320&width=320"
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;