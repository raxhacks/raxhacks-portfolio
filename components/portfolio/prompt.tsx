import { profile } from "@/constants/content";

/**
 * A rendered zsh prompt line — the page's signature device. `cmd` accepts a
 * node so callers can drop a <Typewriter /> in to type the command out.
 */
export default function Prompt({
    cmd,
    caret = false,
    className = "",
}: {
    cmd?: React.ReactNode;
    caret?: boolean;
    className?: string;
}) {
    return (
        <div className={`font-fira-code text-sm text-term-dim sm:text-[0.95rem] ${className}`}>
            <span>{profile.user}</span>
            <span className="text-term-accent/80">@</span>
            <span>{profile.host}</span>
            <span className="text-term-dim/70"> ~ </span>
            <span className="text-term-accent glow">%</span>
            {cmd && <span className="ml-2 text-term-fg">{cmd}</span>}
            {caret && (
                <span className="ml-1 inline-block w-[0.5em] animate-blink text-term-accent">
                    ▮
                </span>
            )}
        </div>
    );
}
