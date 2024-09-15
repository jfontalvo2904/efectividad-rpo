/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors : {
        'mp-warn' : '#c15701',
        'mp-primary' : '#396097',
        'mp-accent' : '#5c7e70'
      }
    },
  },
  plugins: [],
}

