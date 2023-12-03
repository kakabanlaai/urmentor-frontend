/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './node_modules/flowbite-react/lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
