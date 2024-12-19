/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Colors used in this project
      colors: {
        primary: "#003DF5",
        secondary: "3EF863E",
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/bg-image.webp')",
        // 'home-image': "url('./src/assets/home-bg-image.webp)",
      },
      // Custom breakpoints
      screens: {
        'xs': '400px', // Custom breakpoint for 400px
      },
      // Custom box shadows
      boxShadow: {
        'custom-light': '5px 5px 10px rgba(0, 0, 0, 0.1)',
        'custom-medium': '10px 10px 15px rgba(0, 0, 0, 0.15)',
        'custom-heavy': '15px 15px 20px rgba(0, 0, 0, 0.2)',
        'custom-top-right': '5px -5px 10px rgba(0, 0, 0, 0.2)',
        'custom-bottom-left': '-5px 5px 10px rgba(0, 0, 0, 0.2)',
        // Add more custom shadows as needed
      },
    },
  },
  variants: {},
  plugins: [],
};
