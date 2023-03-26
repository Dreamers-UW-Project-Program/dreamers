/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        deliciousHandrawnRegular: ["DeliciousHandrawn Regular", "serif"],
        montserratRegular: ["Montserrat Regular", "sans-serif"],
        montserratBold: ["Montserrat Bold", "sans-serif"],
        montserratMedium: ["Montserrat Medium", "sans-serif"],
        montserratSemiBold: ["Montserrat Semi-Bold", "sans-serif"],
      },
    }, 
    screens: {
      '2xs': '360px',
      'iPhone12': '390px',
      '1.5xs': '414px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '840px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1400px',
      '4xl': '1540px',
      '5xl': '1800px'
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}
