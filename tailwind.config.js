/** @type {import('tailwindcss').Config} */
const autoprefixer = require('autoprefixer');
module.exports = {

  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      xs: "240px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        'minsk': {
          '50': '#eff3fe',
          '100': '#e1eafe',
          '200': '#cad7fb',
          '300': '#a9bcf8',
          '400': '#8798f2',
          '500': '#6a75ea',
          '600': '#4e4fdd',
          '700': '#413fc3',
          '800': '#36379d',
          '900': '#303278',
          '950': '#1d1d49',
        },
        'asparagus': {
          '50': '#f6f9f4',
          '100': '#e8f3e5',
          '200': '#d2e6cc',
          '300': '#aed2a3',
          '400': '#82b573',
          '500': '#65a054',
          '600': '#4b7c3d',
          '700': '#3d6233',
          '800': '#344f2c',
          '900': '#2b4126',
          '950': '#132310',
        },
        'mosque': {
          '50': '#f2fbfa',
          '100': '#d2f5f2',
          '200': '#a4ebe5',
          '300': '#6fd9d5',
          '400': '#41c0bf',
          '500': '#27a4a5',
          '600': '#1d8184',
          '700': '#1b6669',
          '800': '#1a5255',
          '900': '#1a4547',
          '950': '#09272a',
        },
      },
      dropShadow: {
        primary: "0px 4px 10px rgba(15, 27, 51, 0.05);",
      },
      shadow: {
        primary: "1px 7px 8px -1px #1B2821",
      },
    },
  },
  plugins: [autoprefixer],
};
