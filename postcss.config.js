const plugin = require('./_config/plugins.json');

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    require('postcss-sort-media-queries'),
    require('postcss-minify-selectors'),
    require('cssnano')(plugin.cssnano)
  ],
};
