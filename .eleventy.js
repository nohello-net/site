module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('site/css');
  eleventyConfig.addPassthroughCopy('site/img');
  eleventyConfig.addPassthroughCopy('site/js');

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'site',
      output: 'www',
    },
  };
};
