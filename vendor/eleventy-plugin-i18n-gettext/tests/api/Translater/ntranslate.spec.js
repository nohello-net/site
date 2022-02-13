const chai = require('chai');
const Translater = require('../../../dist/Translater').default;

chai.should();

describe('Translater.ntranslate', () => {
  const translater = new Translater();
  translater.setConfiguration({
    localesDirectory: 'tests/assets/locales',
  });

  it('should translate a key found in messages.po (singular)', () => {
    const expected = 'Banane jaune';
    const actual = translater.ntranslate(
      'fr-fr',
      'Yellow banana',
      'Yellow bananas',
      1
    );

    actual.should.be.equal(expected);
  });

  it('should translate a key found in messages.po (plural)', () => {
    const expected = 'Bananes jaunes';
    const actual = translater.ntranslate(
      'fr-fr',
      'Yellow banana',
      'Yellow bananas',
      2
    );

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po (singular)', () => {
    const expected = 'Red blackberry';
    const actual = translater.ntranslate(
      'fr-fr',
      'Red blackberry',
      'Red blackberries',
      1
    );

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po (plural)', () => {
    const expected = 'Red blackberries';
    const actual = translater.ntranslate(
      'fr-fr',
      'Red blackberry',
      'Red blackberries',
      2
    );

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist (singular)', () => {
    const expected = 'Yellow banana';
    const actual = translater.ntranslate(
      'nl-be',
      'Yellow banana',
      'Yellow bananas',
      1
    );

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist (plural)', () => {
    const expected = 'Yellow bananas';
    const actual = translater.ntranslate(
      'nl-be',
      'Yellow banana',
      'Yellow bananas',
      2
    );

    actual.should.be.equal(expected);
  });
});
