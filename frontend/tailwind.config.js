import tailwindcssPrimeui from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/presets/**/**/*.{js,vue,ts}",
    "./index.html",
    "./src/assets/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: true,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
};
