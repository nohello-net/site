const chai = require('chai');
const Translater = require('../../../dist/Translater').default;

chai.should();

describe('Translater.loadTranslations', () => {
  it('should load translations from messages.mo', () => {
    const translater = new Translater();
    translater.setConfiguration({
      localesDirectory: 'tests/assets/locales',
      parserMode: 'mo',
    });

    translater.loadTranslations();
  });

  it('should not load translations if parserMode is overriden manually', () => {
    (() => {
      const translater = new Translater();
      translater.setConfiguration();
      translater.configuration.parserMode = 'override';

      translater.loadTranslations();
    }).should.throw(
      "Parser mode 'override' is invalid. It must be 'po' or 'mo'."
    );
  });
});
