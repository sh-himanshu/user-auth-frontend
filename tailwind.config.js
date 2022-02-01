/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        batman: "#111111",
      },
      fontFamily: {
        title:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
      },
    },
  },
  plugins: [],
};
