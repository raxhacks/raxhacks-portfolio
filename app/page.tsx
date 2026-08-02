import Prompt from "@/components/portfolio/prompt";
import BackgroundReveal from "@/components/portfolio/background-reveal";
import { profile, now, cv, contact } from "@/constants/content";

export default function Page() {
    return (
        <>
            <BackgroundReveal />
            <div className="photo-scrim" aria-hidden />

            <main className="readable relative z-10 grid min-h-dvh place-items-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="enter">
                        <Prompt cmd="whoami" />
                    </div>

                    <h1
                        aria-label={profile.name}
                        className="fill-text mt-5 font-space-mono text-[clamp(2.75rem,12vw,5rem)] font-bold leading-none tracking-tighter"
                    >
                        <span aria-hidden="true">{profile.name.toUpperCase()}</span>
                    </h1>

                    <p
                        className="enter mt-4 font-fira-code text-sm text-term-dim"
                        style={{ animationDelay: "0.5s" }}
                    >
                        {profile.tagline}
                    </p>

                    <div
                        className="enter mt-8 space-y-1 font-fira-code text-sm leading-relaxed text-term-fg"
                        style={{ animationDelay: "0.65s" }}
                    >
                        {profile.bio.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>

                    <div className="enter mt-8" style={{ animationDelay: "0.8s" }}>
                        <div className="font-fira-code text-xs text-term-dim">
                            // current
                        </div>
                        <div className="mt-2 flex items-center gap-2.5 font-fira-code text-sm">
                            <span className="now-dot" aria-hidden />
                            <span className="font-space-mono font-bold text-term-fg">
                                {now.company}
                            </span>
                            <span className="text-term-dim">· {now.role}</span>
                        </div>
                    </div>

                    <div
                        className="enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
                        style={{ animationDelay: "0.95s" }}
                    >
                        <a href={cv} download className="cv-btn font-fira-code text-sm">
                            <span aria-hidden="true">↓</span> download cv
                        </a>
                        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-fira-code text-sm">
                            {contact.map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    target={c.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="text-term-dim transition-colors hover:text-term-accent"
                                >
                                    {c.label}
                                    <span aria-hidden="true"> ↗</span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="enter mt-10" style={{ animationDelay: "1.1s" }}>
                        <Prompt caret />
                    </div>
                </div>
            </main>
        </>
    );
}
