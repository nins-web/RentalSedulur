js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/.{js,ts,jsx,tsx}", "./components/*/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}


FILE 8: postcss.config.js
https://github.com/nins-web/RentalSedulur/new/main?filename=postcss.config.js
js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
