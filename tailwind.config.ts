import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#fff8ee",
          soft: "#f9ead8",
          pale: "#fffdf8",
        },
        maroon: {
          DEFAULT: "#9D2B3F",
          dark: "#4b0f1a",
          light: "#B94458",
        },
        rose: "#c98b73",
        sage: "#6f8266",
        ink: "#2f1517",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 60px rgba(87, 35, 33, 0.12)",
      },
    },
  },
};

export default config;
