// Single source of truth for the one-screen portfolio. Edit here.

export const profile = {
    user: "rax",
    host: "portfolio",
    name: "Raxhacks",
    tagline: "software engineer · founder",
    bio: [
        "I'm a software engineer. Before this I was a founder,",
        "building in ed-tech and audio. Off the clock, I'm training or eating lots of food.",
    ],
};

// Current work — the one status that matters.
export const now = {
    company: "Bloomberg",
    role: "Software Engineer",
};

// Drop your real photo at public/me.jpg to replace the placeholder.
export const avatar = {
    src: "/me.jpeg",
    alt: "Portrait of Raxhacks",
};

// Drop your real CV at public/cv.pdf to replace the placeholder.
export const cv = "/cv.pdf";

export type Contact = {
    label: string;
    href: string;
};

export const contact: Contact[] = [
    { label: "github", href: "https://github.com/raxhacks" },
    { label: "email", href: "mailto:raxhacksofficial@gmail.com" },
    { label: "linkedin", href: "https://linkedin.com/in/rgzmn" },
];
