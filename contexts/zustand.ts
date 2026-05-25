import { create } from "zustand";

interface TerminalStore {
    terminalClientRect: DOMRect | null;
    setTerminalClientRect: (terminalClientRect: DOMRect | null) => void;
}
export const useTerminalStore = create<TerminalStore>((set) => ({
    terminalClientRect: null,
    setTerminalClientRect: (terminalClientRect: DOMRect | null) => set({ terminalClientRect })
}));

interface RaxOSHeader {
    disableHeader: boolean;
    setDisableHeader: (disable: boolean) => void;
}
export const useRaxOSHeader = create<RaxOSHeader>((set) => ({
    disableHeader: false,
    setDisableHeader: (disable: boolean) => set({ disableHeader: disable })
}));