import { create } from "zustand";

interface HeroStore {
    blurHeroBg: boolean;
    setBlurHeroBg: (blurHeroBg: boolean) => void;
}

export const useHeroStore = create<HeroStore>((set) => ({
    blurHeroBg: false,
    setBlurHeroBg: (blurHeroBg: boolean) => set({ blurHeroBg }),
}));