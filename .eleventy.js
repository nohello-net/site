module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'build',
    },
  };
};
