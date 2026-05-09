import { Antonio, Space_Grotesk, Special_Elite } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

export const antonio = Antonio({
    variable: "--font-antonio",
    subsets: ["latin"],
});

export const specialElite = Special_Elite({
    weight: "400",
    variable: "--font-special-elite",
    subsets: ["latin"],
});
