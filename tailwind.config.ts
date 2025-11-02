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
        "bg-secondary": "#303030",
        "bg-tertiary": "#414141",
        "bg-scrim": "#0d0d0d80",
        "bg-elevated-primary": "#303030",
        "bg-elevated-secondary": "#181818",
        "bg-accent-static": "#0285ff",
        "text-primary": "#ffffff",
        "text-secondary": "#f3f3f3",
        "text-tertiary": "#afafaf",
        "text-accent": "#66b5ff"
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};

export default config;
