interface LinkProps {
    text: string;
    href: string;
}
export default function Link({ text, href }: LinkProps) {
    return (
        <a
            className="underline cursor-pointer 
            text-terminal-blue
            hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </a>
    );
}