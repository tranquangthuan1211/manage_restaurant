/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-teal-50": "#F0F8F4",
        "gray-teal-100": "#D9ECE2",
        "gray-teal-200": "#BCECDC",
        "gray-teal-300": "#9FC8C8",
        "gray-teal-400": "#82B1AB",
        "gray-teal-500": "#629898",
        "gray-teal-600": "#486581",
        "gray-teal-700": "#336868",
        "gray-teal-800": "#203b3b",
        "gray-teal-900": "#103A3A",
      },
      fontFamily:{
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['SansitaOne', 'Satisfy', 'Georgia', 'Cambria', 'serif'],
        'mono': ['Menlo', 'Monaco', 'Consolas', 'monospace'],
        'sansita-one': ['SansitaOne', 'Helvetica', 'Arial', 'sans-serif'],
      }
      
    },
  },
  plugins: [],
}


