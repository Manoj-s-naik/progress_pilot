/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include index.html
    "../frontend/src/**/*.{js,ts,jsx,tsx}", // Scan all files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
