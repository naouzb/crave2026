import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f0f11",
        surface: "#18181c",
        card: "#1f1f24",
        border: "#2a2a32",
        primary: {
          DEFAULT: "#ff4500",
          hover: "#ff5714",
        },
        secondary: "#ff7b00",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #ff4500 0%, #ff0055 100%)",
        "gold-gradient": "linear-gradient(135deg, #ffb703 0%, #fb8500 100%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(255, 69, 0, 0.4)",
        "neon-strong": "0 0 35px rgba(255, 69, 0, 0.7)",
      },
      animation: {
        pulseGlow: "pulseGlow 2s infinite alternate",
      },
      keyframes: {
        pulseGlow: {
          "0%": { boxShadow: "0 0 10px rgba(255,69,0,0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(255,69,0,0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
