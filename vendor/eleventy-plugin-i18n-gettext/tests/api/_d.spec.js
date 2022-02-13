const chai = require('chai');
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const i18n = require('../../dist/i18n');

chai.should();

describe('i18n._d', () => {
  beforeEach(() => {
    const eleventyConfig = new UserConfig();

    i18n.configFunction(eleventyConfig, {
      localesDirectory: 'tests/assets/locales',
    });
  });

  it('should format a timestamp integer to Asia/Bangkok time', () => {
    const expected = 'dimanche 2 août 2020 04:57';
    const actual = i18n._d('fr-fr', 'LLLL', 1596319020000, 'Asia/Bangkok');

    actual.should.be.equal(expected);
  });

  it('should format a javascript Date object to UTC time', () => {
    const expected = 'samedi 1 août 2020 21:57';
    const actual = i18n._d('fr-fr', 'LLLL', new Date(1596319020000), 'UTC');

    actual.should.be.equal(expected);
  });

  it('should format an ISO date string', () => {
    const expected = '1 août 2020';
    const actual = i18n._d('fr-fr', 'LL', '2020-08-01T21:57:00.000Z');

    actual.should.be.equal(expected);
  });

  it('should format a Date object (enhance11tydata)', () => {
    const eleventyData = i18n.enhance11tydata({}, 'fr-fr');

    const expected = '1 août 2020';
    const actual = eleventyData._d('LL', 1596319020000);

    actual.should.be.equal(expected);
  });
});
