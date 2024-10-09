/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['SansitaOne', 'Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', 'serif'],
        'mono': ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}

