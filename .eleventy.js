const htmlMin = require('./_src/utils/transforms/minify-html.js');

module.exports = config => {
  const prod = process.env.NODE_ENV === 'production';

  config.addWatchTarget('_src/styles/tailwind.css');

  if (prod) {
    config.addTransform('htmlmin', htmlMin);
  }

  return {
    dir: {
      input: '_src/_site',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };

};
