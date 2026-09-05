import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shavez Khan | Full-Stack Developer & AI/ML Engineer",
  description: "Professional portfolio of Shavez Khan, a Computer Science Engineer specializing in Next.js, React, Node.js, AI/ML RAG pipelines, and data-driven systems.",
  keywords: [
    "Shavez Khan",
    "Portfolio",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Software Engineer",
    "Next.js",
    "React",
    "Flask",
    "WESEE Indian Navy Intern",
    "OneSource Colombia Intern",
    "B.Tech CSE"
  ],
  authors: [{ name: "Shavez Khan" }],
  openGraph: {
    title: "Shavez Khan | Full-Stack Developer & AI/ML Engineer",
    description: "Explore the projects and experience of Shavez Khan, featuring full-stack applications and AI-driven platforms.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-accent-purple/30 selection:text-white" suppressHydrationWarning>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
