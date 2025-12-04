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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sourceSans.variable} h-full`}>
            <body className="bg-black antialiased min-h-screen flex flex-col h-full">
                <Toaster theme="dark" position="top-right" richColors />
                <main className="flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
