/** @type {import('tailwindcss').Config} */
import { colors } from "./src/lib/colors";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        oswald: ["Oswald-Bold"],
        orbitron: ["Orbitron-Bold"],
      },
    },
  },
  plugins: [],
};
