import React, { useEffect, useRef, useState } from 'react';

interface SidebarProps {
    open?: boolean;
}

const ITEMS = ['About Me', 'Experiences', 'Projects'];

export default function Sidebar({ open = true }: SidebarProps) {
    const COPIES = 100;
    const rendered = Array.from({ length: COPIES }).flatMap(() => ITEMS);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

    const startIndex = Math.floor(rendered.length / 2);
    const total = rendered.length;
    const clamp = (n: number) => Math.max(0, Math.min(total - 1, n));

    const [curIndex, setCurIndex] = useState<number>(startIndex);
    const [itemHeight, setItemHeight] = useState<number>(50);

    const scrollAccum = useRef(0);

    // measure first item height
    useEffect(() => {
        const measure = () => {
            const first = itemRefs.current[0];
            if (first) {
                const h = Math.round(first.getBoundingClientRect().height);
                setItemHeight(h || 50);
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // apply transform when curIndex or itemHeight changes
    useEffect(() => {
        if (!listRef.current) return;
        const y = curIndex * itemHeight;
        listRef.current.style.transform = `translate(-50%, -${y}px)`;
    }, [curIndex, itemHeight]);

    // wheel handling, scoped to container, accumulate & RAF
    useEffect(() => {
        let rafId: number | null = null;
        let ticking = false;
        const threshold = Math.max(1, itemHeight * 0.6);

        const process = () => {
            ticking = false;
            rafId = null;
            if (Math.abs(scrollAccum.current) >= threshold) {
                const steps = Math.trunc(scrollAccum.current / threshold);
                const step = steps > 0 ? 1 : -1;
                setCurIndex((prev) => clamp(prev + step));
                scrollAccum.current -= step * threshold;
            }
        };

        const onWheel = (e: WheelEvent) => {
            const container = containerRef.current;
            if (container) {
                const rect = container.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                    return;
                }
            }
            e.preventDefault();
            const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
            scrollAccum.current += delta;
            if (!ticking) {
                ticking = true;
                rafId = window.requestAnimationFrame(process);
            }
        };

        const el = containerRef.current ?? window;
        el.addEventListener('wheel', onWheel as EventListener, { passive: false });
        return () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            el.removeEventListener('wheel', onWheel as EventListener);
        };
    }, [itemHeight]);

    const goPrev = () => setCurIndex((p) => clamp(p - 1));
    const goNext = () => setCurIndex((p) => clamp(p + 1));

    return (
        <div
            ref={containerRef}
            aria-hidden={!open}
            className={`w-[250px] h-full bg-card flex justify-center overflow-hidden ${open ? 'block' : 'hidden'}`}
        >
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-background via-transparent to-background/90" />

            <div className="absolute top-1/2 z-20 flex justify-between px-2 transform -translate-y-1/2 w-full">
                <button onClick={goPrev} aria-label="Previous" className="bg-background/0 text-muted-foreground hover:text-foreground p-1 rounded pointer-events-auto">
                    &lt;
                </button>
                <button onClick={goNext} aria-label="Next" className="bg-background/0 text-muted-foreground hover:text-foreground p-1 rounded pointer-events-auto">
                    &gt;
                </button>
            </div>

            <nav aria-label="Sidebar menu" className="w-full flex justify-center">
                <div ref={listRef} className="absolute left-1/2 top-1/2 transition-transform duration-200 ease-out z-0" style={{ transform: `translate(-50%, -${curIndex * itemHeight}px)` }}>
                    {rendered.map((text, idx) => (
                        <a
                            key={`${text}-${idx}`}
                            href={`#${text.replace(/\s+/g, '-').toLowerCase()}`}
                              ref={(el) => { itemRefs.current[idx] = el; }}
                            className={`h-[50px] px-3 flex items-center justify-center transition-all duration-200 ease-out select-none whitespace-nowrap ${
                                idx === curIndex ? 'text-foreground text-[1.3rem] font-medium' : 'text-muted-foreground text-base'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurIndex(idx);
                            }}
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
}
