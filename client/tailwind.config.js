/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Colors used in this project
      colors: {
        primary: "#2B85FF",
        secondary: "3EF863E"
      },
      // Custom breakpoints
      screens: {
        'xs': '400px', // Custom breakpoint for 450px
      },
    },
  },
  plugins: [],
}
