import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

import Header from "./components/Header";

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import DictionaryProvider from "@/lib/dictionary-provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: "Ray's Portfolio",
  description: "Raxhacks portfolio",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale }
}>) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-black`}
      >
        <DictionaryProvider dictionary={dictionary} lang={params.lang}>
          <Header />
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
