/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     colors: {
            'brand-primary': '#3b82f6',
            'brand-secondary': '#ef4444',
            'brand-tertiary': {
              light: '#facc15',
              DEFAULT: '#eab308',
              dark: '#ca8a04',
            },
          },
    },
  },
  plugins: [],
};
