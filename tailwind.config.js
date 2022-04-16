module.exports = {
  content: [
    "./_src/_site/index.njk",
    "./_src/icons/**/*.svg",
    "./_src/scripts/**/*.ts",
  ],
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
