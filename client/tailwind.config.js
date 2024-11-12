/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-teal-50": "#F0F4F8",
        "gray-teal-100": "#D9E2EC",
        "gray-teal-200": "#BCCCDC",
        "gray-teal-300": "#9FB3C8",
        "gray-teal-400": "#829AB1",
        "gray-teal-500": "#627D98",
        "gray-teal-600": "#486581",
        "gray-teal-700": "#334E68",
        "gray-teal-800": "#243B53",
        "gray-teal-900": "#102A43",
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


