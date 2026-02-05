/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       
        "brand-blue": "#2563eb", 
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
          "base-100": "#1d232a", 
          "base-content": "#ffffff", 
        },
      },
    ],
  },
}