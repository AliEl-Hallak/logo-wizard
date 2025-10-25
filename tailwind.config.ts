import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 10 Renk Sistemi
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        accent: "var(--accent)",
        danger: "var(--danger)",
      },
      backgroundColor: {
        'light': "var(--light-bg)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      textColor: {
        dark: "var(--text-dark)",
        light: "var(--text-light)",
      },
      boxShadow: {
        'primary': '0 0 20px var(--shadow)',
      },
    },
  },
  plugins: [],
};

export default config;
