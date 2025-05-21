import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00216b',
        secondary: '#003cc3',
        accent: '#ffd400',
        tertiary: '#ca6f05',
        light: '#f4f7ff',
        dark: '#0a1738'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
