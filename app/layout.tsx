import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "Aeterna Technology",
  description:
    "Aeterna Technology pioneers autonomous intelligence, cryptographic networks, biomedicine, robotics, and orbital systems for sovereign innovation.",
  metadataBase: new URL("https://aeterna.technology")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>{children}</body>
    </html>
  );
}
