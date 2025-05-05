import Link from "next/link"
import Image from "next/image"
import { Github, Mail, Linkedin, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-zinc-100">Portfolio</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="#about" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white"
          >
            Resume
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <Badge variant="outline" className="mb-2 border-zinc-700 text-zinc-400">
                  Available for work
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Hi, I'm <span className="text-zinc-100">Alex</span>
                </h1>
                <p className="mt-4 max-w-[600px] text-zinc-400 md:text-lg">
                  A passionate developer focused on creating intuitive and efficient digital experiences.
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
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
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
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-zinc-800 bg-zinc-950 py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">About Me</h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-zinc-400">
                  I'm a full-stack developer with over 5 years of experience building web applications. I specialize in
                  React, Next.js, and Node.js, with a strong focus on creating performant and accessible user
                  interfaces.
                </p>
                <p className="mt-4 text-zinc-400">
                  My approach to development combines technical expertise with a deep understanding of user needs. I
                  believe in writing clean, maintainable code that solves real problems.
                </p>
              </div>
              <div>
                <p className="text-zinc-400">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
                  or enjoying outdoor activities. I'm passionate about continuous learning and staying at the forefront
                  of web development trends.
                </p>
                <p className="mt-4 text-zinc-400">
                  I'm currently looking for new opportunities where I can apply my skills and continue to grow as a
                  developer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="border-t border-zinc-800 py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">Featured Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((project) => (
                <Card key={project} className="bg-zinc-900 border-zinc-800">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Project ${project}`}
                      alt={`Project ${project}`}
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">Project Title {project}</h3>
                    <p className="mb-4 text-sm text-zinc-400">
                      A brief description of the project, highlighting key features and technologies used.
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        React
                      </Badge>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        Next.js
                      </Badge>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        Tailwind
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <Link href="#" className="text-xs text-zinc-400 hover:text-white">
                        View Demo →
                      </Link>
                      <Link href="#" className="text-xs text-zinc-400 hover:text-white">
                        Source Code →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                View All Projects
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="border-t border-zinc-800 bg-zinc-950 py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">Skills & Technologies</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "Tailwind CSS",
                "HTML/CSS",
                "Git",
                "GraphQL",
                "MongoDB",
                "PostgreSQL",
              ].map((skill) => (
                <div key={skill} className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                    <span className="text-lg font-bold">{skill.charAt(0)}</span>
                  </div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-zinc-800 py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Get In Touch</h2>
              <p className="mb-8 text-zinc-400">
                I'm currently available for freelance work and full-time positions. If you're interested in working
                together, please reach out.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-zinc-100 text-black hover:bg-white">Send Message</Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                  hello@example.com
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-800 py-8">
        <div className="container text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
