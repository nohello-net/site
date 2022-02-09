const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const i18n = require('../../dist/i18n');

chai.should();
chai.use(sinonChai);

describe('i18n.configFunction', () => {
  const eleventyConfig = new UserConfig();

  i18n.configFunction(eleventyConfig, {
    localesDirectory: 'tests/assets/locales',
  });

  it('should reload translations beforeBuild', () => {
    const reloadTranslationsSpy = sinon.spy(
      i18n.translater,
      'reloadTranslations'
    );

    eleventyConfig.emit('beforeBuild');

    reloadTranslationsSpy.should.have.been.calledOnce;

    reloadTranslationsSpy.restore();
  });

  it('should reload translations beforeWatch', () => {
    const reloadTranslationsSpy = sinon.spy(
      i18n.translater,
      'reloadTranslations'
    );

    eleventyConfig.emit('beforeWatch');

    reloadTranslationsSpy.should.have.been.calledOnce;

    reloadTranslationsSpy.restore();
  });
});
