/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#EE88FF",
        "yellow": "#FFCD3C",
        "blue": "#3CFFD0",
        "light-gray": "#A3A5A2",
        "gray": "#6A6A6A",
        "dark-gray": "#424242",
        "orange": "#FF631E",
        "light": "#DFDFDF",
        "white": "#FFFFFF",
        "lighter-dark": "#2F2F2F",
        "light-dark": "#1F1F1F",
        "dark": "#121212",
        "black": "#030505"
      }
    },
  },
  plugins: [],
}
