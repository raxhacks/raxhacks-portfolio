import type { Metadata } from "next";
import "./globals.css";
import { firaCode, spaceMono } from "@/constants/fonts";

export const metadata: Metadata = {
  title: "Raxhacks",
  description:
    "welcome mfs to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${firaCode.variable} antialiased`}
    >
      <body className="min-h-screen bg-term-bg font-fira-code text-term-fg">
        {children}
      </body>
    </html>
  );
}
