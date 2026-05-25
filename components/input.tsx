import { useState, useRef } from "react";
import Caret from "./caret";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, value, onChange }: InputProps) {
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateCursor = () => {
        if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart || 0);
        }
    };

    // Mask value if it's a password
    const displayValue = type === "password" ? "*".repeat(value.length) : value;

    // Slice into chunks based on cursor
    const leftPart = displayValue.slice(0, cursorPosition);
    const rightPart = displayValue.slice(cursorPosition);
    const activeChar = rightPart.slice(0, 1) || " ";
    const restPart = rightPart.slice(1);

    return (
        <div
            className="border border-white h-10 w-64 
            flex items-center relative px-2 cursor-text 
            font-fira-code text-white overflow-hidden"
            onClick={() => inputRef.current?.focus()}
        >
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={(e) => {
                    onChange(e);
                    setTimeout(updateCursor, 0);
                }}
                onKeyDown={() => setTimeout(updateCursor, 0)}
                onKeyUp={() => setTimeout(updateCursor, 0)}
                onMouseUp={() => setTimeout(updateCursor, 0)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-text"
            />

            <div className="relative w-full h-full 
            pointer-events-none whitespace-pre flex 
            items-center overflow-hidden">
                {isFocused && (
                    <span
                        className="absolute flex items-center 
                        justify-center z-0"
                        style={{ left: `calc(${cursorPosition}ch)` }}
                    >
                        <Caret color="#fff" />
                    </span>
                )}
                <span className="relative z-10 
                mix-blend-difference text-white 
                [font-variant-ligatures:none]">
                    {displayValue}
                </span>
            </div>
        </div>
    );
}