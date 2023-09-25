// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
      },
      colors: {
        customOrange: '#F06A30',
        customGrey1: '#D1D5DB',
        customGrey2: '#9CA3AF',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

