"use client";

import { useState } from "react";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { useBreakpoint } from "@/hooks/use-breakpoint";

import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
    index: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

const Project: React.FC<ProjectProps> = ({
    index,
    title,
    description,
    image,
    tags,
    link,
}) => {
    return (
        <Card key={index} className="bg-zinc-900 border-zinc-800">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="object-cover transition-transform hover:scale-105"
                />
            </div>
            <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                        <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-300"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-3">
                    <Link href={link} className="text-xs text-zinc-400 hover:text-white">
                        View Demo →
                    </Link>
                    <Link href={link} className="text-xs text-zinc-400 hover:text-white">
                        Source Code →
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

const Projects: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const allProjects = [
        {
            index: 1,
            title: "Project Title 1",
            description: "A brief description of project 1...",
            image: "/placeholder.svg?height=200&width=400&text=Project 1",
            tags: ["React", "Next.js", "Tailwind"],
            link: "#",
        },
        {
            index: 2,
            title: "Project Title 2",
            description: "A brief description of project 2...",
            image: "/placeholder.svg?height=200&width=400&text=Project 2",
            tags: ["React", "Next.js", "Tailwind"],
            link: "#",
        },
        {
            index: 3,
            title: "Project Title 3",
            description: "A brief description of project 3...",
            image: "/placeholder.svg?height=200&width=400&text=Project 3",
            tags: ["React", "Next.js", "Tailwind"],
            link: "#",
        },
        {
            index: 4,
            title: "Project Title 4",
            description: "A brief description of project 4...",
            image: "/placeholder.svg?height=200&width=400&text=Project 4",
            tags: ["React", "Next.js", "Tailwind"],
            link: "#",
        },
        {
            index: 5,
            title: "Project Title 5",
            description: "A brief description of project 5...",
            image: "/placeholder.svg?height=200&width=400&text=Project 5",
            tags: ["React", "Next.js", "Tailwind"],
            link: "#",
        },
    ];

    const breakpoint = useBreakpoint();

    const projectsToShow = {
        base: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
    };

    const numberToShow = projectsToShow[breakpoint];
    const visibleProjects = showAll ? allProjects : allProjects.slice(0, numberToShow);

    return (
        <section id="projects" className="border-t border-zinc-800 py-20">
            <div className="container">
                <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
                    Featured Projects & Start-ups
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleProjects.map((project) => (
                        <Project key={project.index} {...project} />
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {!showAll ? "View All Projects" : "Collapse Projects"}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
