const htmlMin = require('./_src/utils/transforms/minify-html.js');

module.exports = config => {
  const prod = process.env.NODE_ENV === 'production';

  config.addWatchTarget('_src/styles/tailwind.css');

  // favicon
  config.addPassthroughCopy({ '_src/favicons': 'favicons' });
  config.addPassthroughCopy({ '_src/images': 'images' });
  config.addPassthroughCopy({ '_src/site.webmanifest': 'site.webmanifest' });
  config.addPassthroughCopy({ '_src/browserconfig.xml': 'browserconfig.xml' });

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
