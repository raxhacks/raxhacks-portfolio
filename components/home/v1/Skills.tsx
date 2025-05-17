

const Skills: React.FC = () => {
    return (
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
                        "Kubernetes",
                        "Docker",
                        "AWS",
                        "Azure",
                        "Firebase",
                        "GCP",
                        "CI/CD",
                        "Langchain",
                        "LLMs",
                        "ML"
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
    );
}

export default Skills;