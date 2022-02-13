const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const i18n = require('../../dist/i18n');

chai.should();
chai.use(sinonChai);

describe('i18n._p', () => {
  beforeEach(() => {
    const eleventyConfig = new UserConfig();

    i18n.configFunction(eleventyConfig, {
      localesDirectory: 'tests/assets/locales',
    });
  });

  it('should localize a path', () => {
    const getConfigSpy = sinon.spy(
      require('@11ty/eleventy/src/Config'),
      'getConfig'
    );

    const expected = '/fr-fr/apple';
    const actual = i18n._p('fr-fr', '/apple');

    actual.should.be.equal(expected);

    getConfigSpy.should.have.been.called;
    i18n.pathPrefix.should.be.equal('/');

    getConfigSpy.restore();
  });

  it('should localize a path (enhance11tydata)', () => {
    const getConfigSpy = sinon.spy(
      require('@11ty/eleventy/src/Config'),
      'getConfig'
    );

    const eleventyData = i18n.enhance11tydata({}, 'fr-fr');

    const expected = '/fr-fr/apple';
    const actual = eleventyData._p('/apple');

    actual.should.be.equal(expected);

    getConfigSpy.should.have.not.been.called;
    i18n.pathPrefix.should.be.equal('/');

    getConfigSpy.restore();
  });

  it('should localize a path having a pathPrefix', () => {
    i18n.pathPrefix = undefined;

    const stub = sinon
      .stub(require('@11ty/eleventy/src/Config'), 'getConfig')
      .returns({ pathPrefix: '/blog/' });

    const expected = '/fr-fr/apple';
    const actual = i18n._p('fr-fr', '/apple');

    actual.should.be.equal(expected);

    stub.should.have.been.called;
    i18n.pathPrefix.should.be.equal('/blog/');

    stub.restore();
  });

  it('should check that calling 11ty getConfig is done only once', () => {
    i18n.pathPrefix = undefined;

    const stub = sinon
      .stub(require('@11ty/eleventy/src/Config'), 'getConfig')
      .returns({ pathPrefix: '/blog/' });

    i18n._p('fr-fr', '/apple');
    i18n._p('fr-fr', '/apple');

    stub.should.have.been.calledOnce;
    i18n.pathPrefix.should.be.equal('/blog/');

    stub.restore();
  });
});
