import { useEffect, useRef } from "react";

import TerminalBody from "./terminal-body";
import TerminalFooter from "./terminal-footer";

import { useRaxOSHeader } from "@/contexts/zustand";
import { useTerminalStore } from "@/contexts/zustand";

export default function Terminal() {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const { setTerminalClientRect } = useTerminalStore();
    const { setDisableHeader } = useRaxOSHeader();

    useEffect(() => {
        if (!terminalRef) return;
        const terminalClientRect = terminalRef.current?.getBoundingClientRect();
        setDisableHeader(false);
        setTerminalClientRect(terminalClientRect ? terminalClientRect : null);
    }, [terminalRef]);

    return (
        <div
            ref={terminalRef}
            className="terminal-container w-3xl h-150 border 
            font-fira-code flex flex-col"
        >
            <div className="border-b text-center py-1 flex-none">
                ssh raxhacks@127.0.0.1
            </div>
            <TerminalBody />
            <TerminalFooter />
        </div>
    );
}