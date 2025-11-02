import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Aeterna Technology",
  description:
    "Aeterna Technology pioneers autonomous intelligence, cryptographic networks, biomedicine, robotics, and orbital systems for sovereign innovation.",
  metadataBase: new URL("https://aeterna.technology")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
