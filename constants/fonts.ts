import { Space_Mono, Fira_Code } from "next/font/google";

// Display face — quirky, characteristic mono used with restraint for the
// name and section headers.
export const spaceMono = Space_Mono({
    weight: ["400", "700"],
    variable: "--font-space-mono",
    subsets: ["latin"],
});

// Body face — variable Fira Code (ligatures) carries all the "output" text.
export const firaCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
});
