/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#635fc7',
        // secondary: '#828fa3',
        customLight: '#e4ebfa',
        customDark: '#20212c',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#635fc7',
          'secondary': '#828fa3',
          'base-100': '#ffffff',
          'base-300': '#eef3fb',
          'base-content': '#1f2937',
          'custom-background': '#e4ebfa',
          'neutral' : '#e4ebfa'
        },
        dark: {
          'primary': '#635fc7',
          'secondary': '#828fa3',
          'base-100': '#2b2c37',
          'base-300': '#242530',
          'base-content': '#ffffff',
          'custom-background': '#20212c',
          'neutral' : '#20212c'
        }
      },
    ],
  },
}
