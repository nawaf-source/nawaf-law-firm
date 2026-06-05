import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#060f1d",
          800: "#0a1424",
          700: "#0e1b30",
          600: "#142544",
          500: "#1c3258",
        },
        ivory: {
          50: "#faf6ec",
          100: "#f4eee3",
          200: "#ebe2d0",
          300: "#ddd1b8",
        },
        gold: {
          700: "#8a6a2f",
          600: "#a98441",
          500: "#b8924a",
          400: "#cba767",
          300: "#dec18a",
        },
      },
      fontFamily: {
        display: ['"El Messiri"', '"Amiri"', "serif"],
        serif: ['"Amiri"', '"El Messiri"', "serif"],
        body: ['"Tajawal"', '"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        latin: ['"Cormorant Garamond"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
