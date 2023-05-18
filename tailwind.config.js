/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'third-color': 'var(--third-color)',
        'hover-bg-color': 'var(--hover-bg-color)',
        'error-color': 'var(--error-color)',
        'placeholder-color': 'var(--placeholder-color)',
      },
      borderRadius: {
        'primary': 'var(--primary-radius)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addVariant }) {
      addVariant('rtl', '&.rtl')
    }),
  ],
}