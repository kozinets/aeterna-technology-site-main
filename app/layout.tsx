import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Aeterna Technology",
  description: "Aeterna Technology — корпорация полного цикла в области ИИ, сетей, криптографии, биомедицины и робототехники.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${orbitron.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
