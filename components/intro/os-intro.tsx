import { useEffect, useState } from "react";
import LoadingBar from "./loading-os-bar";
import { useRaxOSHeader } from "@/contexts/zustand";

interface OSIntroProps {
    setOSStarted: () => void;
}
export default function OSIntro({ setOSStarted }: OSIntroProps) {
    const [showOSName, setShowOSName] = useState(false);
    const { setDisableHeader } = useRaxOSHeader();

    useEffect(() => {
        setDisableHeader(true);
        const timer = setTimeout(() => {
            setShowOSName(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black w-full h-screen px-4">
            <div className="w-full max-w-4xl flex flex-col items-center gap-6">
                {showOSName &&
                    <>
                        <div className="text-white text-5xl 
                        sm:text-7xl md:text-8xl tracking-wider select-none text-center">
                            Raxhacks, Inc.
                        </div>
                        <LoadingBar
                            setOSStarted={() => setOSStarted()}
                        />
                    </>
                }
            </div>
        </div>
    );
}