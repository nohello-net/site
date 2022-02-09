const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Translater = require('../../../dist/Translater').default;

chai.should();
chai.use(sinonChai);

describe('Translater.reloadTranslations', () => {
  it('should load and reload translations from messages.mo', () => {
    const translater = new Translater();
    translater.setConfiguration({
      localesDirectory: 'tests/assets/locales',
      parserMode: 'mo',
    });

    const generateMessageFileSpy = sinon.spy(translater, 'generateMessageFile');

    translater.loadTranslations();
    translater.reloadTranslations();

    generateMessageFileSpy.should.have.been.calledTwice;

    generateMessageFileSpy.restore();
  });
});
