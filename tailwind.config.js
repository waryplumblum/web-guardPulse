/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        custom: {
          'tan': '#DBB58D',
          'gold': '#DBBA44',
          'light-gray': '#DDD3D1',
          'bronze': '#DB9244',
          'orange': '#DBA844',
          'dark-orange': '#DB7844',
        },
      },
    },
  },
  plugins: [],
}

