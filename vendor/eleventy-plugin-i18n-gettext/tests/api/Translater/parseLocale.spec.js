const chai = require('chai');
const Translater = require('../../../dist/Translater').default;

chai.should();

describe('Translater.parseLocale - Default localeRegex', () => {
  it('should returns the full locale', () => {
    const translater = new Translater();
    translater.setConfiguration();

    const expected = {
      lang: 'fr',
      locale: 'fr-fr',
    };
    const actual = translater.parseLocale('fr-fr');

    actual.should.be.deep.equal(expected);
  });

  it('should returns the lang locale', () => {
    const translater = new Translater();
    translater.setConfiguration();

    const expected = {
      lang: 'fr',
      locale: 'fr',
    };
    const actual = translater.parseLocale('fr');

    actual.should.be.deep.equal(expected);
  });

  it('should throw an exception if locale does not match', () => {
    (() => {
      const translater = new Translater();
      translater.setConfiguration();
      translater.parseLocale('benl');
    }).should.throw(
      'Locale benl does not match regex /^(?<lang>.{2})(?:-(?<country>.{2}))*$/'
    );
  });
});

describe('Translater.parseLocale - Custom localeRegex', () => {
  it('should returns the full locale', () => {
    const translater = new Translater();
    translater.setConfiguration({
      localeRegex: /^(?:(?<country>.{2}))*(?<lang>.{2})$/,
    });

    const expected = {
      lang: 'nl',
      locale: 'nl-be',
    };
    const actual = translater.parseLocale('benl');

    actual.should.be.deep.equal(expected);
  });

  it('should returns the lang locale', () => {
    const translater = new Translater();
    translater.setConfiguration({
      localeRegex: /^(?:(?<country>.{2}))*(?<lang>.{2})$/,
    });

    const expected = {
      lang: 'nl',
      locale: 'nl',
    };
    const actual = translater.parseLocale('nl');

    actual.should.be.deep.equal(expected);
  });

  it('should throw an exception if locale does not match', () => {
    (() => {
      const translater = new Translater();
      translater.setConfiguration({
        localeRegex: /^(?:(?<country>.{2}))*(?<lang>.{2})$/,
      });
      translater.parseLocale('nl-be');
    }).should.throw(
      'Locale nl-be does not match regex /^(?:(?<country>.{2}))*(?<lang>.{2})$/'
    );
  });
});
