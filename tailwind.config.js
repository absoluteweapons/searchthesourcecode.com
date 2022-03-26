module.exports = {
  content: ["./_dist/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        hov: { raw: "(hover)" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
