import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SupportChat } from "@/components/support-chat";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTools SaaS – Modular Dev Tools Platform",
  description:
    "A plugin-based SaaS platform with modular dev tools. JSON Formatter, JWT Decoder, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 min-h-screen`}
      >
        <Navbar />
        {children}
        <SupportChat />
        <WhatsAppButton />

        {/* Footer */}
        <footer className="border-t border-zinc-200/60 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <p>Built with care by the <a href="https://github.com/coders-clan" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 transition-colors">Coders Clan</a> community</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/davesheffer/dev-tool-saas" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">GitHub</a>
              <a href="https://github.com/davesheffer/dev-tool-saas/issues" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">Issues</a>
              <a href="https://github.com/coders-clan" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">Coders Clan</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
