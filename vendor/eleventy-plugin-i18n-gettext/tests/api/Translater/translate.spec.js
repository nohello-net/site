const chai = require('chai');
const Translater = require('../../../dist/Translater').default;

chai.should();

describe('Translater.translate', () => {
  const translater = new Translater();
  translater.setConfiguration({
    localesDirectory: 'tests/assets/locales',
  });

  it('should translate a key found in messages.po', () => {
    const expected = 'Banane';
    const actual = translater.translate('fr-fr', 'Banana');

    actual.should.be.equal(expected);
  });

  it('should not translate a key not found in messages.po', () => {
    const expected = 'Blackberry';
    const actual = translater.translate('fr-fr', 'Blackberry');

    actual.should.be.equal(expected);
  });

  it('should not translate a key when messages.po does not exist', () => {
    const expected = 'Banana';
    const actual = translater.translate('nl-be', 'Banana');

    actual.should.be.equal(expected);
  });
});
