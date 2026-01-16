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
        // Next.js will generate the correct tags for these
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' },
        ],
        shortcut: '/favicon.svg?v=1',
        apple: '/favicon.svg?v=1',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sourceSans.variable} h-full`}>
            {/* Remove the manual <head> block entirely */}
            <body className="bg-black antialiased min-h-screen flex flex-col h-full">
                <Toaster theme="dark" position="top-right" richColors />
                <main className="flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
