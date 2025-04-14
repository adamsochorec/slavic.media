import tailwindcssPrimeui from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class", '[class*="app-dark"]'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
};
