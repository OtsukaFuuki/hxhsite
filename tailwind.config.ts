import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGreen: "#2E8B57",
        "customGreen-dark": "#276749", // ホバー時の色
        customOrange: "#FF4500",
      },
    },
    keyframes: {
      bounce: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-5px)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
