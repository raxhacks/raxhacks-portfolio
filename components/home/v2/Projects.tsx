"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with payment processing and inventory management.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A productivity application for managing tasks with team collaboration features.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather visualization with historical data analysis and forecasting.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["Vue.js", "D3.js", "Express", "Weather API"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
    },
    {
        id: 4,
        title: "Social Media Analytics",
        description: "Analytics dashboard for tracking social media performance across multiple platforms.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["React", "Redux", "Firebase", "Chart.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
    },
]

const Projects: React.FC = () => {
    const [api, setApi] = useState<any>();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setActiveIndex(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <Carousel
            className="w-full max-w-5xl mx-auto"
            setApi={setApi}
        >
            <CarouselContent>
                {projects.map((project, index) => (
                    <CarouselItem key={project.id}>
                        <div className="p-1">
                            <Card className="overflow-hidden border-2 transition-all duration-200 h-full">
                                <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl md:text-2xl">{project.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 md:line-clamp-3 mt-2">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="font-medium">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1"
                                        >
                                            <Github className="h-4 w-4" />
                                            <span>Code</span>
                                        </a>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1"
                                        >
                                            <span>Live Demo</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="flex items-center justify-center mt-8 gap-2">
                <CarouselPrevious className="relative transform-none text-white" />
                <div className="flex gap-2">
                    {projects.map((_, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className={cn("w-3 h-3 rounded-full p-0", activeIndex === index ? "bg-primary" : "bg-muted")}
                            onClick={() => api?.scrollTo(index)}
                        >
                            <span className="sr-only">Go to slide {index + 1}</span>
                        </Button>
                    ))}
                </div>
                <CarouselNext className="relative transform-none text-white" />
            </div>
        </Carousel>
    )
}

export default Projects;
