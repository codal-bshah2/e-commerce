/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#f5e9de', // You can replace this hex value with your desired color
        customPink: "#fc5c74"
      },
    },
  },
  plugins: [],
}

