import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        muted_solid: "var(--muted_solid)",
        muted_foreground: "var(--muted_foreground)",
        card_bg: "var(--card_bg)",
        card_solid: "var(--card_bg)",
      },
    },
  },
  plugins: [],
};

export default config;
