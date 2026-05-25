import { useEffect, useState } from "react";

import { Command } from "@/types/raxOS/command";
import { commands } from "@/lib/raxOS/command-executor";

interface TerminalMenuProps {
    filter: string;
    isOpened: boolean;
    handleMenuSelection: (cmd: string) => void;
    close: () => void;
}
export default function TerminalMenu({
    filter,
    isOpened,
    handleMenuSelection,
    close
}: TerminalMenuProps) {
    const menuOptions: Command[] = commands.filter(
        (cmd) => cmd.tags.includes("terminal-menu") && (filter ? cmd.name.includes(filter) : true)
    );
    const [currentOption, setCurrentOption] = useState<number>(0); // idx based

    useEffect(() => {
        if (!isOpened) return;
        function handleKeyDown(e: KeyboardEvent) {
            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentOption((prev) => {
                        if (prev === 0) return menuOptions.length - 1;
                        return prev - 1;
                    });
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentOption((prev) => {
                        if (prev === menuOptions.length - 1) return 0;
                        return prev + 1;
                    });
                    break;
                case "Enter":
                    e.preventDefault();
                    e.stopPropagation();
                    if (!menuOptions[currentOption]) {
                        close();
                        break;
                    };
                    handleMenuSelection(menuOptions[currentOption].name);
                    close();
                    break;
                case "Escape":
                    close();
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown, true); // prevent bubble up to terminal body
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [isOpened, menuOptions.length, currentOption]);

    useEffect(() => {
        setCurrentOption(0);
    }, [filter, isOpened]);

    if (!isOpened) return null;
    return (
        <div className="border min-w-32 bg-black">
            <ul className="flex flex-col justify-between h-fit">
                {
                    menuOptions.length === 0 ? (
                        <li className="px-1">
                            No commands found
                        </li>
                    ) : (
                        menuOptions.map((opt, idx) => (
                            <li
                                key={idx}
                                className={`px-1
                                    ${idx === currentOption && "bg-white text-black"}    
                                    `}
                            >
                                {opt.name}
                            </li>
                        ))
                    )}
            </ul>
        </div>
    );
}   