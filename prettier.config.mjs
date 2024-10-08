/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  trailingComma: 'none',
  endOfLine: 'auto',
  tabWidth: 2,
  useTabs: false
};

export default config;
