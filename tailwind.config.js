/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        deliciousHandrawnRegular: ["DeliciousHandrawn Regular", "serif"],
        montserratRegular: ["Montserrat Regular", "sans-serif"],
        montserratBold: ["Montserrat Bold", "sans-serif"],
        montserratMedium: ["Montserrat Medium", "sans-serif"],
        montserratSemiBold: ["Montserrat Semi-Bold", "sans-serif"],
        latoRegular: ["Lato Regular", "sans-serif"],
        robotoLight: ["Roboto Light", "sans-serif"],
        robotoRegular: ["Roboto Regular", "sans-serif"], 
        quicksandLight: ["Quicksand Light", "sans-serif"],
        quicksandRegular: ["Quicksand Regular", "sans-serif"],
        quicksandBold: ["Quicksand Bold", "sans-serif"],
        rubikMoonrocks: ["RubikMoonrocks Regular", "sans-serif"],
        poiretOne: ["PoiretOne Regular", "sans-serif"],
        italiana: ["Italiana", "sans-serif"]
      },
    },
    animation: {
      'spin-slow': 'animate-spin-slow 3s linear infinite', // Define a new animation called "spin-slow"
    },
    keyframes: {
      'animate-spin-slow': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    screens: {
      "2xs": "360px",
      iPhone12: "390px",
      "1.5xs": "414px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "840px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1400px",
      "4xl": "1540px",
      "5xl": "1800px",
    },
    fontFamily: {
      serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
    },
  },
  plugins: [
    require("tailwindcss-gradients"),
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
