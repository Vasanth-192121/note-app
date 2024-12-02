/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    // Colors used in this project
    colors: {
      primary: "#003DF5",
      secondary: "3EF863E"
    },
    // Custom breakpoints
    screens: {
      'xs': '400px', // Custom breakpoint for 450px
    },
  },
};
export const plugins = [];
