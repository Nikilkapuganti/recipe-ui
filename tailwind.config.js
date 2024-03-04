/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        colors:{
          error: "#FF0000",
          primary: "#152a43",
          secondary:"#e9e9e9",
          gray:"#4D4D4D"
        },
      },
  
    
  },
  plugins: [],
}