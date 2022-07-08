import assert from 'assert';
import { languageMatcher } from './../../src/js/languageMatcher';
import locales from '../../src/_data/locales.json';

const langs = locales.map((v) => v.path);
const base = langs[0];

describe('languageMatcher', () => {
  describe('match to supported langs', () => {
    it('unknown -> /en', () => {
      const result = languageMatcher(langs, base, null);

      assert.equal(result, '/en');
    });

    it('zz -> /en', () => {
      const result = languageMatcher(langs, base, undefined, 'zz');

      assert.equal(result, '/en');
    });

    it('de -> /de', () => {
      const result = languageMatcher(langs, base, undefined, 'de');

      assert.equal(result, '/de');
    });

    it('hu -> /hu', () => {
      const result = languageMatcher(langs, base, undefined, 'hu');

      assert.equal(result, '/hu');
    });

    it('en-AU -> en', () => {
      const result = languageMatcher(langs, base, undefined, 'en-AU');

      assert.equal(result, '/en');
    });

    it('zh -> /en', () => {
      const result = languageMatcher(langs, base, undefined, 'zh');

      assert.equal(result, '/en');
    });

    it('zh-cn -> /zh-cn', () => {
      const result = languageMatcher(langs, base, undefined, 'zh-CN');

      assert.equal(result, '/zh-cn');
    });

    it('pt-br -> /pt-br', () => {
      const result = languageMatcher(langs, base, undefined, 'pt-BR');

      assert.equal(result, '/pt-br');
    });

    it('pt-BR -> /pt-br', () => {
      const result = languageMatcher(langs, base, undefined, 'pt-BR');

      assert.equal(result, '/pt-br');
    });

    it('pt_BR -> /pt-br', () => {
      const result = languageMatcher(langs, base, undefined, 'pt_BR');

      assert.equal(result, '/pt-br');
    });
  });

  describe('preferred language', () => {
    it('unknown -> /en', () => {
      const result = languageMatcher(langs, base, null);

      assert.equal(result, '/en');
    });

    it('zz -> /en', () => {
      const result = languageMatcher(langs, base, 'zz');

      assert.equal(result, '/en');
    });

    it('en -> /en', () => {
      const result = languageMatcher(langs, base, 'en');

      assert.equal(result, '/en');
    });

    it('de -> /de', () => {
      const result = languageMatcher(langs, base, 'de');

      assert.equal(result, '/de');
    });

    it('hu -> /hu', () => {
      const result = languageMatcher(langs, base, 'hu');

      assert.equal(result, '/hu');
    });

    it('pt-br -> /pt-br', () => {
      const result = languageMatcher(langs, base, 'pt-br');

      assert.equal(result, '/pt-br');
    });
  });
});
