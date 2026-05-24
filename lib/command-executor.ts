import React from "react";
import { Command } from "@/types/command";

export const commands: Command[] = [
    {
        name: "clear",
        description: "Clear the terminal",
        args: [],
        tags: [],
        execute: (args, setCommandsHistory) => {
            setCommandsHistory([""]);
        }
    },
    {
        name: "/about",
        description: "About me",
        args: [],
        tags: ["terminal-menu"],
        execute: (args, setCommandsHistory, cmdline) => {
            const output = cmdline + "\nI'm a software engineer. I've been a founder and I love exercise.";
            setCommandsHistory(prev => [...prev.slice(0, prev.length - 1), output, ""]);
        }
    },
    {
        name: "/projects",
        description: "My projects",
        args: [],
        tags: ["terminal-menu"],
        execute: (args, setCommandsHistory, cmdline) => {
            const output = cmdline + "\nMy start-ups:\n- Scholarvy: Ed-tech. AI policies for schools. We were in Mexico and Chile. Made it to Shark Tank Mexico.\n- Off the Record: Devs behind immerse.fm and insider.fm";
            setCommandsHistory(prev => [...prev.slice(0, prev.length - 1), output, ""]);
        }
    },
    {
        name: "/experience",
        description: "My professional experience",
        args: [],
        tags: ["terminal-menu"],
        execute: (args, setCommandsHistory, cmdline) => {
            const output = cmdline + "\nMy Jobs:\n- Oracle - SWE Intern (2k24)\n- Microsoft - SWE Intern (2k25)\n- Bloomberg - SWE (2k26)";
            setCommandsHistory(prev => [...prev.slice(0, prev.length - 1), output, ""]);
        }
    },
    {
        name: "/contact",
        description: "Contact information",
        args: [],
        tags: ["terminal-menu"],
        execute: (args, setCommandsHistory, cmdline) => {
            const output = cmdline + "\nContact me at:\n- github.com/raxhacks\n- raxhacksofficial@gmail.com";
            setCommandsHistory(prev => [...prev.slice(0, prev.length - 1), output, ""]);
        }
    },
    {
        name: "/help",
        description: "List all available commands",
        args: [],
        tags: ["terminal-menu"],
        execute: (args, setCommandsHistory, cmdline) => {
            const helpText = commands
                .map(c => `     ${c.name.padEnd(12)} - ${c.description}`)
                .join("\n");
            const output = cmdline + "\nAvailable commands:\n" + helpText;
            setCommandsHistory(prev => [...prev.slice(0, prev.length - 1), output, ""]);
        }
    }
];

function evalcmd(cmdline: string): { execute: boolean; cmd: string; args: string[] } {
    const completeCommand = cmdline.trim().split(" ");
    const commandName = completeCommand[0];
    return {
        execute: commands.some((c) => c.name === commandName),
        cmd: commandName,
        args: completeCommand.slice(1)
    };
}

interface CommandExecutorProps {
    cmdline: string;
    setCommandsHistoryView: React.Dispatch<React.SetStateAction<string[]>>;
}

export function commandExecutor({
    cmdline,
    setCommandsHistoryView
}: CommandExecutorProps) {
    const { execute, cmd, args } = evalcmd(cmdline);

    if (execute) {
        const commandObj = commands.find(c => c.name === cmd);
        if (commandObj) {
            commandObj.execute(args, setCommandsHistoryView, cmdline);
        }
    } else {
        const errorLine = cmdline + "\nraxsh: command not found: " + cmd;
        setCommandsHistoryView(prev => [...prev.slice(0, prev.length - 1), errorLine, ""]);
    }
}