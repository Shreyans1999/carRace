/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // Scan all JS/TS/JSX/TSX files in the src directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in the components directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in the pages directory
    "./public/**/*.{html,js}", // Optionally include public HTML and JS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
