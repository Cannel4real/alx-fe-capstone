/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,cjs,mjs,ts,cts,mts}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        customOrange: '#FF914D', 
      },
      backgroundImage: {
        'custom-bg': "url('/assets/background.png')",
      },
    },
  },
  plugins: [],
}

