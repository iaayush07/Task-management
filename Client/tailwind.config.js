/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#635fc7',
      secondary: '#828fa3',
      white: "#ffffff"
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#635fc7',
          'secondary': '#828fa3',
          'base-100': '#ffffff', // Light theme background
          'base-content': '#1f2937', // Light theme text
        },
      },
      'dark', // DaisyUI built-in dark theme
    ],
  },
}