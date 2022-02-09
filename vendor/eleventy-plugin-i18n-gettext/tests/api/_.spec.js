const chai = require('chai');
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const i18n = require('../../dist/i18n');

chai.should();

describe('i18n._', () => {
  beforeEach(() => {
    const eleventyConfig = new UserConfig();

    i18n.configFunction(eleventyConfig, {
      localesDirectory: 'tests/assets/locales',
    });
  });

  it('should translate a key found in messages.po', () => {
    const expected = 'Banane';
    const actual = i18n._('fr-fr', 'Banana');

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po', () => {
    const expected = 'Blackberry';
    const actual = i18n._('fr-fr', 'Blackberry');

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist', () => {
    const expected = 'Banana';
    const actual = i18n._('nl-be', 'Banana');

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po then format with printf', () => {
    const expected = 'La pomme éloigne le médecin.';
    const actual = i18n._('fr-fr', 'The %s keeps the doctor away.', 'pomme');

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po then format with printf (enhance11tydata)', () => {
    const eleventyData = i18n.enhance11tydata({}, 'fr-fr');

    const expected = 'La pomme éloigne le médecin.';
    const actual = eleventyData._('The %s keeps the doctor away.', 'pomme');

    actual.should.be.equal(expected);
  });
});
