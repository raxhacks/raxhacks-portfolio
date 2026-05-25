/**
 * Using custom cursor make the terminal 
 * more authentic.
 */
interface CaretProps {
    color?: string;
}

export default function Caret({ color = "#18B06A" }: CaretProps) {
    return (
        <div
            className={`w-[0.6em] h-[1.1em]  animate-blink self-center`}
            style={{ backgroundColor: color }}
        />
    );
}