import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ali Hamza Sultan - Portfolio",
  description: "Welcome to my Digital Playground! React Native Developer by day, AI Engineer by night. Explore my projects, skills, and interactive mobile mockup dashboard.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-gray-100 bg-[#05050a] min-h-screen">
        {children}
      </body>
    </html>
  );
}
