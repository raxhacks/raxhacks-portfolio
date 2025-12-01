'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

interface TimelineItem {
    id: string;
    title: string;
    company: string;
    description: string;
    date: string;
    logo: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

    return (
        <>
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                {/* Circle marker at the bottom of the line */}
                <div className="absolute left-[calc(1.5rem+1px)] bottom-0 transform -translate-x-1/2 translate-y-1/2 pointer-events-none">
                    <div
                        className="h-4 w-4 rounded-full bg-primary border-2 border-background shadow-sm"
                        aria-hidden="true"
                    />
                </div>

                <div className="space-y-12">
                    {items.map((item) => (
                        <div key={item.id} className="relative flex gap-8 items-start">
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-full bg-background border-4 border-border shadow-md flex items-center justify-center overflow-hidden shrink-0">
                                    <Image
                                        src={item.logo || '/placeholder.svg'}
                                        alt={item.title}
                                        width={
                                            (item.company || '').toLowerCase() === 'bloomberg l.p.'
                                                ? 22
                                                : 32
                                        }
                                        height={
                                            (item.company || '').toLowerCase() === 'bloomberg l.p.'
                                                ? 22
                                                : 32
                                        }
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 pt-1">
                                <h3 className="text-xl font-semibold text-foreground mb-1 text-balance">
                                    <span>{item.title}</span> &nbsp;
                                    <span className="text-primary">@ {item.company}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">{item.date}</p>
                                <p className="text-muted-foreground leading-relaxed text-pretty line-clamp-2 mb-2 hidden md:block">
                                    {item.description}
                                </p>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-primary"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    Show more
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
                                {selectedItem && (
                                    <Image
                                        src={selectedItem.logo || '/placeholder.svg'}
                                        alt={selectedItem.title}
                                        width={
                                            selectedItem?.company?.toLowerCase() === 'bloomberg'
                                                ? 24
                                                : 32
                                        }
                                        height={
                                            selectedItem?.company?.toLowerCase() === 'bloomberg'
                                                ? 24
                                                : 32
                                        }
                                        className="object-contain"
                                    />
                                )}
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">
                                    {selectedItem?.title}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {selectedItem?.date}
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="mt-4">
                        <p className="text-muted-foreground leading-relaxed">
                            {selectedItem?.description}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
