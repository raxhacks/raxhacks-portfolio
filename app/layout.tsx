import type { Metadata } from "next";
import "./globals.css";
import { amiri, antonio, firaCode, spaceGrotesk, specialElite } from "@/constants/fonts";

export const metadata: Metadata = {
  title: "Raxhacks",
  description: "i'm raxhacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${antonio.variable} ${spaceGrotesk.variable} ${specialElite.variable}
      ${amiri.variable} ${firaCode.variable}
      antialiased`}
    >
      <body className="min-h-screen flex flex-col font-antonio">{children}</body>
    </html>
  );
}
