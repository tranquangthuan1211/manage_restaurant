const { transform } = require('lodash');

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
        "olive-green-50": "#F1F0C6",
        "olive-green-100": "#D9D78F",
        "olive-green-200": "#C0C35A",
        "olive-green-300": "#A7B325",
        "olive-green-400": "#8D9C00",
        "olive-green-500": "#7A8800",
        "olive-green-600": "#6A7700",
        "olive-green-700": "#5A6600",
        "olive-green-800": "#495400",
        "olive-green-900": "#394300"
      },
      fontFamily:{
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['SansitaOne', 'Satisfy', 'Georgia', 'Cambria', 'serif'],
        'mono': ['Menlo', 'Monaco', 'Consolas', 'monospace'],
        'sansita-one': ['SansitaOne', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes:{
        fadeIn: {
          "0%":{
            opacity: "0",
            transform: "translate(0px, 50px)",
          },
          "100%":{
            opacity: "1",
            transform: "translate(0px, 0px)",
          },
        },
      },
      animation:{
        fadeIn: "fadeIn 0.5s ease-in-out"
      }
    },
  },
  plugins: [],
}


