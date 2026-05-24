import React from "react";

/**
 * Interface for command objects that can be
 * executed in the terminal.
 *  - name: command name
 *  - description: command description
 *  - args: command arguments
 *  - tags: command tags (for filtering)
 *  - execute: function to execute the command
 */
export interface Command {
    name: string;
    description: string;
    args: string[];
    tags: string[];
    execute: (
        args: string[],
        setCommandsHistoryView: React.Dispatch<React.SetStateAction<string[]>>,
        cmdline: string
    ) => void;
}