"use client";

import { useRaxOSHeader } from "@/contexts/zustand";

/**
 * The desktop header contains the current time, date,
 *  network status, and battery percentage.
 */
export default function RaxOSHeader() {
    const { disableHeader } = useRaxOSHeader();
    if (disableHeader) return;
    return (
        <div className="fixed top-4 left-4 z-50 flex 
        items-center text-white text-2xl">
            <span className="border px-1 leading-none mr-[0.025em]">
                R
            </span>
            <span className="tracking-wide">
                axOS
            </span>
            &nbsp;
            <span className="text-sm">
                v1.0.0
            </span>
        </div>
    );
}