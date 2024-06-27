/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors : {
        'mp-orange' : '#c25917',
        'mp-light-blue' : '#4d7baf',
        'mp-blue' : '#396097'
      }
    },
  },
  plugins: [],
}

