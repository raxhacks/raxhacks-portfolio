import { create } from "zustand";

interface TerminalStore {
    terminalClientRect: DOMRect | null;
    setTerminalClientRect: (terminalClientRect: DOMRect | null) => void;
}
export const useTerminalStore = create<TerminalStore>((set) => ({
    terminalClientRect: null,
    setTerminalClientRect: (terminalClientRect: DOMRect | null) => set({ terminalClientRect })
}));