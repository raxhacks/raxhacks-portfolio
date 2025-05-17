const About: React.FC = () => {
    return (
        <section id="about" className="border-t border-zinc-800 bg-zinc-950 py-20">
            <div className="container">
                <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">About Me</h2>
                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    <div>
                        <p className="text-zinc-400">
                            I'm a Computer Science student with experience at Oracle and Microsoft. My main focus is full stack development, especially backend. I have planned and built microservices architectures from scratch for my own startups and as an intern.
                        </p>
                        <p className="mt-4 text-zinc-400">
                            At Oracle, I managed large-scale microservices systems. This gave me hands-on experience with complex, high-traffic platforms and deepened my understanding of scalable backend solutions.
                        </p>
                    </div>
                    <div>
                        <p className="text-zinc-400">
                            I've co-founded two startups. One took my team to Silicon Valley and Shark Tank. I enjoy solving real problems with technology and only code when I feel connected to the challenge.
                        </p>
                        <p className="mt-4 text-zinc-400">
                            Outside of tech, I'm passionate about exercise. I've run two half-marathons, competed nationally in taekwondo, and now I train in the gym, run, and practice Muay Thai. I'm also a cat lover with three cats at home.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;