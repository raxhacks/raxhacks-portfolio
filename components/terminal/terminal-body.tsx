import { useState, useEffect } from "react";

import TerminalInputLine from "./terminal-input-line";

import { commandExecutor } from "@/lib/raxOS/command-executor";

export default function TerminalBody() {
    const [commandsHistory, setCommandsHistory] = useState<string[]>([]);
    const [commandsHistoryView, setCommandsHistoryView] = useState<string[]>([""]); // we need it started to show the line
    const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(0);
    const [historyVersion, setHistoryVersion] = useState<number>(0);

    const handleCommand = (cmdline: string) => {
        setCommandsHistory(prev => {
            if (cmdline.trim() === "") return prev;
            const parsedCmd = cmdline.split("\n")[0];
            return [...prev, parsedCmd];
        });
        commandExecutor({ cmdline, currentPath: "/", setCommandsHistoryView });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (commandsHistory.length === 0) return;

        switch (e.key) {
            case "ArrowUp": {
                setHistoryVersion(v => v + 1);
                setCommandHistoryIndex(prev => {
                    const newIndex = prev > 0 ? prev - 1 : 0;
                    setCommandsHistoryView(viewPrev => [...viewPrev.slice(0, -1), commandsHistory[newIndex]]);
                    return newIndex;
                });
                break;
            }
            case "ArrowDown": {
                setHistoryVersion(v => v + 1);
                setCommandHistoryIndex(prev => {
                    const newIndex = prev < commandsHistory.length ? prev + 1 : commandsHistory.length;
                    const val = newIndex === commandsHistory.length ? "" : commandsHistory[newIndex];
                    setCommandsHistoryView(viewPrev => [...viewPrev.slice(0, -1), val]);
                    return newIndex;
                });
                break;
            }
        }
    };

    useEffect(() => {
        setCommandHistoryIndex(commandsHistory.length);
    }, [commandsHistory.length]);

    return (
        <div
            onKeyDown={handleKeyDown}
            className="p-2 w-full flex-1 overflow-y-auto">
            {
                commandsHistoryView.map((cmd, index) => (
                    <TerminalInputLine
                        key={index}
                        isActive={index === commandsHistoryView.length - 1}
                        cmdContentFromHistory={cmd}
                        handleCommand={handleCommand}
                        historyVersion={historyVersion}
                        onTypingBreakHistory={() => {
                            if (index === commandsHistoryView.length - 1) {
                                setCommandHistoryIndex(commandsHistory.length);
                            }
                        }}
                    />
                ))
            }
        </div>
    );
}