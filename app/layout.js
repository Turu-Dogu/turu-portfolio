import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Turu Dogu（鶴土偶）— Portfolio",
  description: "Turu Dogu（鶴土偶）のイラスト＆音楽ポートフォリオ。",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-transparent font-sans text-zinc-900">
        <Navbar />
        <main className="relative flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
