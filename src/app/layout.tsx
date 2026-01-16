import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const sourceSans = Source_Sans_3({
    weight: '400',
    variable: '--font-source-sans-3',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Raxhacks',
    description: "Raxhacks' portfolio website",
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sourceSans.variable} h-full`}>
            <head>
                {/* prefer SVG favicon when available, with a PNG/ICO fallback for legacy browsers */}
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.ico" />
                {/* apple-touch-icon prefers PNG; if you add one later, replace this with /apple-touch-icon.png */}
                <link rel="apple-touch-icon" href="/favicon.svg" />
            </head>
            <body className="bg-black antialiased min-h-screen flex flex-col h-full">
                <Toaster theme="dark" position="top-right" richColors />
                <main className="flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
