const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const i18n = require('../../dist/i18n');

chai.should();
chai.use(sinonChai);

describe('i18n.relocalizePath', () => {
  it('should relocalizePath a path', () => {
    const expected = '/fr-fr/apple';
    const actual = i18n.relocalizePath('fr-fr', '/en-us/apple');

    actual.should.be.equal(expected);

    i18n.pathPrefix.should.be.equal('/');
  });

  it('should relocalizePath a path having a pathPrefix', () => {
    i18n.pathPrefix = undefined;

    const stub = sinon
      .stub(require('@11ty/eleventy/src/Config'), 'getConfig')
      .returns({ pathPrefix: '/blog/' });

    const expected = '/fr-fr/apple';
    const actual = i18n.relocalizePath('fr-fr', '/blog/en-us/apple');

    actual.should.be.equal(expected);

    stub.should.have.been.called;
    i18n.pathPrefix.should.be.equal('/blog/');

    stub.restore();
  });
});
