import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aeterna Technology",
  description:
    "Aeterna Technology pioneers autonomous intelligence, cryptographic networks, biomedicine, robotics, and orbital systems for sovereign innovation.",
  metadataBase: new URL("https://aeterna.technology")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
