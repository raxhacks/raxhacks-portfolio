import { useState, useEffect, useRef, useLayoutEffect } from "react";
import CustomCaret from "../caret";
import TerminalPrompt from "./terminal-prompt";
import TerminalMenu from "./terminal-menu";
import { useTerminalStore } from "@/contexts/zustand";

interface TerminalInputLineProps {
    isActive: boolean;
    cmdContentFromHistory: string | null;
    handleCommand: (cmdline: string) => void;
    onTypingBreakHistory: () => void;
    historyVersion?: number;
}
export default function TerminalInputLine({
    isActive,
    cmdContentFromHistory,
    handleCommand,
    onTypingBreakHistory,
    historyVersion
}: TerminalInputLineProps) {
    const [line, setLine] = useState<string>("");
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [openTerminalMenu, setOpenTerminalMenu] = useState<boolean>(false);
    const [terminalMenuOrientation, setTerminalMenuOrientation] = useState<number>(0); // 0 down 1 up
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalMenuContainerRef = useRef<HTMLSpanElement | null>(null);

    const { terminalClientRect } = useTerminalStore();

    const updateCursor = () => {
        if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart || 0);
        }
    };

    const handleLineClick = () => {
        inputRef.current?.focus();
    };

    const isHistory = !isActive;
    const displayText = isHistory ? (cmdContentFromHistory ?? "") : line;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLLIElement>) => {
        // always prevent native cursor jumping for arrow keys
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }

        // prevent bubble up when terminal menu is opened
        if (openTerminalMenu && (e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown")) {
            e.stopPropagation(); // prevent TerminalBody from firing history
            return;
        }

        if (e.key === "Enter") {
            handleCommand(line);
            setLine("");
            setCursorPosition(0);
        }
    }

    const handleMenuSelection = (cmd: string) => {
        console.log("cmd:", cmd);
        setLine(cmd);
        setCursorPosition(cmd.length);
    }

    // if the user types again -> reset the cmdContent.. to null
    // if the user keeps pressing key up continuously it should traverse upwards the history
    // if the user traverses upsward we should implement some logic similar to last recently used cache (maybe implement double linked list)
    useEffect(() => {
        if (!isActive) return;
        inputRef.current?.focus();
        if (typeof cmdContentFromHistory === "string") { // allow empty string
            setLine(cmdContentFromHistory);
            setCursorPosition(cmdContentFromHistory.length);

            // force invisible input caret to the end of the new string
            // setTimeout is used to ensure it fires after the existing 
            // onKeyDown updateCursor timeout
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(cmdContentFromHistory.length, cmdContentFromHistory.length);
                    setCursorPosition(cmdContentFromHistory.length);
                }
            }, 1);
        }
    }, [isActive, cmdContentFromHistory, historyVersion]);


    useLayoutEffect(() => {
        if (!terminalMenuContainerRef) return;
        const terminalMenuRect = terminalMenuContainerRef.current?.getBoundingClientRect();
        // calcs for menu orientation
        if (terminalMenuRect && terminalClientRect
            && terminalMenuRect?.bottom - 10 > terminalClientRect?.bottom) {
            setTerminalMenuOrientation(1);
        } else {
            setTerminalMenuOrientation(0);
        }
    }, [openTerminalMenu])

    const leftPart = displayText.slice(0, cursorPosition);
    const rightPart = displayText.slice(cursorPosition);

    const activeChar = rightPart.slice(0, 1) || " ";
    const restPart = rightPart.slice(1);

    return (
        <div
            onClick={handleLineClick}
            className="flex-1 relative cursor-text text-base min-h-[1.5em] w-full"
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="type /help"
                value={displayText}
                readOnly={isHistory}
                onChange={(e) => {
                    if (isHistory) return;
                    const val = e.target.value.replace(/\u00A0$/, "");

                    // if the user modifies a populated history command
                    // break the history index
                    if (cmdContentFromHistory && val !== cmdContentFromHistory) {
                        onTypingBreakHistory?.();
                    }
                    setLine(val);
                    setOpenTerminalMenu(val.startsWith("/"));
                    setTimeout(updateCursor, 0);
                }}
                onKeyDown={(e) => {
                    if (isHistory) return;
                    handleKeyDown(e);
                    setTimeout(updateCursor, 0)
                }}
                onMouseDown={(e) => {
                    // this prevents allowing cursor to type
                    // wherever we want. To give a more authentic
                    // feeling of a terminal.
                    // TODO: allow selection of line
                    e.preventDefault();
                    if (isActive) {
                        e.currentTarget.focus();
                    }
                }}
                onFocus={updateCursor}
                onBlur={(e) => {
                    if (isActive) {
                        e.target.focus();
                    }
                    updateCursor();
                }}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text focus:outline-none"
                autoFocus={!isHistory}
            />

            <div className="whitespace-pre-wrap break-all pointer-events-none select-none w-full">
                <TerminalPrompt />
                <span>{" "}</span>
                {isHistory ? (
                    <span>{displayText}</span>
                ) : line === "" ? (
                    <>
                        <span className="relative inline-block align-top">
                            <span className="absolute inset-0 z-0 flex items-center justify-center">
                                <CustomCaret />
                            </span>
                            <span className="relative z-10 mix-blend-difference text-white">
                                {" "}
                            </span>
                        </span>
                        <span className="ml-2 text-[#6b7280]/60 text-base">
                            What do you want to know? type /help
                        </span>
                    </>
                ) : (
                    <>
                        <span className="relative">
                            {leftPart}
                            <span
                                ref={terminalMenuContainerRef}
                                className={`absolute left-0 
                                z-30 w-max
                                ${terminalMenuOrientation ? "bottom-[1.4em]" : "top-[1.4em]"}
                                `}
                            >
                                <TerminalMenu
                                    filter={line.slice(1)}
                                    isOpened={openTerminalMenu}
                                    handleMenuSelection={handleMenuSelection}
                                    close={() => setOpenTerminalMenu(false)}
                                />
                            </span>
                        </span>
                        <span className="relative inline-block align-top">
                            <span className="absolute inset-0 z-0 flex items-center justify-center">
                                <CustomCaret />
                            </span>
                            <span className="relative z-10 mix-blend-difference text-white">
                                {activeChar}
                            </span>
                        </span>
                        <span>
                            {restPart}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}