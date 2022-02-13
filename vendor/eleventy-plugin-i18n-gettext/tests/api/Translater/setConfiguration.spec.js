const chai = require('chai');
const Translater = require('../../../dist/Translater').default;

chai.should();

describe('Translater.setConfiguration', () => {
  it('should set configuration with default configuration', () => {
    const translater = new Translater();
    const expected = translater.defaultConfiguration;

    translater.setConfiguration();
    const actual = translater.configuration;

    actual.should.be.deep.equal(expected);
  });

  it('should set configuration with partial custom configuration', () => {
    const translater = new Translater();
    const expected = {
      localesDirectory: 'lang',
      parserMode: 'mo',
      javascriptMessages: 'computed-messages.js',
      tokenFilePatterns: ['src/**/*.njk', 'src/**/*.js'],
      localeRegex: /^(?<lang>.{2})(?:-(?<country>.{2}))*$/,
    };

    translater.setConfiguration({
      localesDirectory: 'lang',
      parserMode: 'mo',
      javascriptMessages: 'computed-messages.js',
    });
    const actual = translater.configuration;

    actual.should.be.deep.equal(expected);
  });

  it('should set configuration with full custom configuration', () => {
    const translater = new Translater();
    const expected = {
      localesDirectory: 'lang',
      parserMode: 'mo',
      javascriptMessages: 'computed-messages.js',
      tokenFilePatterns: ['src/**/*.liquid'],
      localeRegex: /^(?:(?<country>.{2}))*(?<lang>.{2})$/,
    };

    translater.setConfiguration({
      localesDirectory: 'lang',
      parserMode: 'mo',
      javascriptMessages: 'computed-messages.js',
      tokenFilePatterns: ['src/**/*.liquid'],
      localeRegex: /^(?:(?<country>.{2}))*(?<lang>.{2})$/,
    });
    const actual = translater.configuration;

    actual.should.be.deep.equal(expected);
  });

  it('should throw error when parser mode is invalid', () => {
    (() => {
      const translater = new Translater();
      translater.setConfiguration({
        parserMode: 'mon',
      });
    }).should.throw("Parser mode 'mon' is invalid. It must be 'po' or 'mo'.");
  });
});
