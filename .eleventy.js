const i18n = require('eleventy-plugin-i18n-gettext');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.addPlugin(i18n, {
    localesDirectory: 'locales',
    parserMode: 'po',
    javascriptMessages: 'messages.js',
    tokenFilePatterns: ['src/**/*.njk', 'src/**/*.js'],
    localeRegex: /^(?<lang>.{2})(?:-(?<country>.{2}))*$/,
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'build',
    },
  };
};
