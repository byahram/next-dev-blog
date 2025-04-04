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
        
        accent: "var(--accent)",
        accent_foreground: "var(--accent_foreground)",
        
        muted: "var(--muted)",
        muted_solid: "var(--muted_solid)",
        muted_foreground: "var(--muted_foreground)",

        card_bg: "var(--card_bg)",
        card_solid: "var(--card_solid)",
        
        border: "var(--border)",
        input: "var(--input)",
      },
    },
  },
  plugins: [],
};

export default config;
