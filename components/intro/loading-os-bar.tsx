import { useState, useEffect } from "react";

interface LoadingBarProps {
    setOSStarted: () => void;
}
export default function LoadingBar({ setOSStarted }: LoadingBarProps) {
    const [showBar, setShowBar] = useState(false);
    const [showText, setShowText] = useState(false);
    const [dots, setDots] = useState("");
    const [progress, setProgress] = useState(0); // Tracks current step index (0 to 3)
    const [startProgress, setStartProgress] = useState(false);

    const steps: number[] = [
        0, 10, 40, 85, 100
    ];

    useEffect(() => {
        const barTimer = setTimeout(() => {
            setShowBar(true);
        }, 700);

        const textTimer = setTimeout(() => {
            setShowText(true);
            setStartProgress(true);
        }, 1200); // text and progress start 500ms after bar appears

        return () => {
            clearTimeout(barTimer);
            clearTimeout(textTimer);
        };
    }, []);

    useEffect(() => {
        if (!showText) return;
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === "...") return "";
                return prev + ".";
            });
        }, 300); // transition speed per dot
        return () => clearInterval(interval);
    }, [showText]);

    useEffect(() => {
        if (!startProgress || progress >= steps.length - 1) return;

        const stepDelays = [400, 700, 700, 300];
        const currentDelay = stepDelays[progress] || 500;

        const timer = setTimeout(() => {
            setProgress(prev => prev + 1);
        }, currentDelay);

        return () => clearTimeout(timer);
    }, [startProgress, progress, steps.length]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (progress >= steps.length - 1) {
            timer = setTimeout(() => {
                setOSStarted();
            }, 800);
        }
        return () => clearTimeout(timer);
    }, [progress]);


    return (
        <div className="w-full max-w-[300px] md:max-w-[400px] mx-auto flex flex-col items-center">
            {showBar && (
                <div className="w-full h-1.5 relative">
                    <div className="absolute w-full h-1.5 border-b border-white" />
                    <div
                        className={`absolute left-0 top-0 bg-white h-1.5 transition-all duration-150 ease-out`}
                        style={{
                            width: `${steps[progress]}%`
                        }}
                    />
                </div>
            )}
            <div className="text-white py-4 font-fira-code text-[12px] md:text-sm 
            whitespace-nowrap relative">
                <span className={`relative inline-block ${!showText && "text-transparent"}`}>
                    connecting to our AI native b2b SaaS
                </span>
                <span className="relative inline-block">
                    <span className="text-transparent">
                        {"..."}
                    </span>
                    <span className={`absolute left-0 top-0 w-full h-full text-left`}>
                        {dots}
                    </span>
                </span>
            </div>
        </div>
    );
}