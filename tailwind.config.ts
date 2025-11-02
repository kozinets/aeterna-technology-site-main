import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#212121",
        "bg-primary-inverted": "#ffffff",
        "bg-secondary": "#2b2b2b",
        "bg-tertiary": "#373737",
        "bg-scrim": "#0d0d0d80",
        "bg-elevated-primary": "#2f2f2f",
        "bg-elevated-secondary": "#1a1a1a",
        "bg-accent-static": "#d0d0d0",
        "text-primary": "#ffffff",
        "text-secondary": "#f0f0f0",
        "text-tertiary": "#b3b3b3",
        "text-accent": "#f5f5f5"
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};

export default config;
