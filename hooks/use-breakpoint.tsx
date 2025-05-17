import { useState, useEffect } from "react";

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState<"base" | "sm" | "md" | "lg" | "xl">("base");

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            if (width >= 1280) setBreakpoint("xl");
            else if (width >= 1024) setBreakpoint("lg");
            else if (width >= 768) setBreakpoint("md");
            else if (width >= 640) setBreakpoint("sm");
            else setBreakpoint("base");
        };

        updateBreakpoint();
        window.addEventListener("resize", updateBreakpoint);
        return () => window.removeEventListener("resize", updateBreakpoint);
    }, []);

    return breakpoint;
}
