"use client";

import { useEffect } from "react";

import { avatar } from "@/constants/content";

/**
 * The portrait as the whole page: blurred and dark at rest, with a light that
 * tracks the cursor (or touch) and reveals the sharp photo beneath it.
 */
export default function BackgroundReveal() {
    useEffect(() => {
        const root = document.documentElement;

        const move = (x: number, y: number) => {
            root.style.setProperty("--mx", `${(x / window.innerWidth) * 100}%`);
            root.style.setProperty("--my", `${(y / window.innerHeight) * 100}%`);
            root.style.setProperty("--on", "1");
        };

        const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
        const onTouch = (e: TouchEvent) => {
            const t = e.touches[0];
            if (t) move(t.clientX, t.clientY);
        };
        const off = () => root.style.setProperty("--on", "0");

        window.addEventListener("mousemove", onMouse, { passive: true });
        window.addEventListener("touchmove", onTouch, { passive: true });
        document.addEventListener("mouseleave", off);

        return () => {
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("touchmove", onTouch);
            document.removeEventListener("mouseleave", off);
        };
    }, []);

    return (
        <div className="photo-bg" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar.src} alt="" className="photo-img photo-base" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar.src} alt="" className="photo-img photo-cover" />
        </div>
    );
}
