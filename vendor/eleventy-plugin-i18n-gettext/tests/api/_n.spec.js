const chai = require('chai');
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const i18n = require('../../dist/i18n');

chai.should();

describe('i18n._n', () => {
  beforeEach(() => {
    const eleventyConfig = new UserConfig();

    i18n.configFunction(eleventyConfig, {
      localesDirectory: 'tests/assets/locales',
    });
  });

  it('should translate a key found in messages.po (singular)', () => {
    const expected = 'Banane jaune';
    const actual = i18n._n('fr-fr', 'Yellow banana', 'Yellow bananas', 1);

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po (plural)', () => {
    const expected = 'Bananes jaunes';
    const actual = i18n._n('fr-fr', 'Yellow banana', 'Yellow bananas', 2);

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po (singular)', () => {
    const expected = 'Red blackberry';
    const actual = i18n._n('fr-fr', 'Red blackberry', 'Red blackberries', 1);

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po (plural)', () => {
    const expected = 'Red blackberries';
    const actual = i18n._n('fr-fr', 'Red blackberry', 'Red blackberries', 2);

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist (singular)', () => {
    const expected = 'Yellow banana';
    const actual = i18n._n('nl-be', 'Yellow banana', 'Yellow bananas', 1);

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist (plural)', () => {
    const expected = 'Yellow bananas';
    const actual = i18n._n('nl-be', 'Yellow banana', 'Yellow bananas', 2);

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po then format with printf', () => {
    const expected = 'Ces 3 fruits sont excellents.';
    const actual = i18n._n(
      'fr-fr',
      'This unique fruit is excellent.',
      'These %d fruits are excellent.',
      3,
      3
    );

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po then format with printf (enhance11tydata)', () => {
    const eleventyData = i18n.enhance11tydata({}, 'fr-fr');

    const expected = 'Ces 3 fruits sont excellents.';
    const actual = eleventyData._n(
      'This unique fruit is excellent.',
      'These %d fruits are excellent.',
      3,
      3
    );

    actual.should.be.equal(expected);
  });
});
