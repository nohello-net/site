import i18n from 'eleventy-plugin-i18n-gettext';
import Image from '@11ty/eleventy-img';

const imagify = async (src, options = {}) => {
  const defaults = {
    outputDir: './build/img/',
  };

  const metadata = await Image(src, { ...defaults, ...options });

  return metadata;
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.addPlugin(i18n, {
    localesDirectory: 'locales',
    parserMode: 'po',
    javascriptMessages: 'messages.js',
    tokenFilePatterns: ['src/**/*.njk', 'src/**/*.js'],
    localeRegex: /^(?<lang>.{2})(?:-(?<country>.{2}))*$/,
  });

  if (eleventyConfig.setNunjucksEnvironmentOptions) {
    eleventyConfig.setNunjucksEnvironmentOptions({
      throwOnUndefined: true,
      autoescape: false,
    });
  }

  eleventyConfig.addNunjucksAsyncShortcode(
    'image',
    async (src, alt, widths = [null]) => {
      const metadata = await imagify(src, { widths });

      const imageAttributes = {
        alt,
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    'imageURL',
    async (src, inOptions = {}) => {
      const defaults = {
        widths: [null],
      };

      const outOptions = {
        ...defaults,
      };

      if (inOptions.format) {
        outOptions.formats = [inOptions.format];
      }

      if (inOptions.animated) {
        outOptions.sharpOptions = { animated: true };
      }

      const metadata = await imagify(src, outOptions);

      const keys = Object.keys(metadata);

      if (keys.length !== 1) {
        throw new Error(
          `Expected 1 format for imageURL, got ${keys.length} on src: ${src}`
        );
      }

      return metadata[keys[0]][0].url;
    }
  );

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'build',
    },
  };
};
