import type { Metadata } from "next";
import "./globals.css";
import { amiri, antonio, firaCode, spaceGrotesk, specialElite } from "@/constants/fonts";
import RaxOSHeader from "@/components/header";

export const metadata: Metadata = {
  title: "Raxhacks",
  description: "raxOS v1.0.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${firaCode.variable}
      antialiased`}
    >
      <body className="min-h-screen flex flex-col 
      font-amiri bg-black text-white">
        <RaxOSHeader />
        {children}
      </body>
    </html>
  );
}
