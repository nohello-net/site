const assert = require('assert');
const fs = require('fs');
const locales = require('../../src/_data/locales.json');

describe('Locales', () => {
  const base = locales[0];

  it('should have base locale', () => {
    assert.notEqual(base, null);
  });

  for (const locale of locales) {
    describe(`Locale: ${locale.name}`, () => {
      const messagesPoPath = `locales/${locale.path}/messages.po`;

      describe('messages.po', () => {
        it('exists', () => {
          const result = fs.existsSync(messagesPoPath);
          assert.equal(result, true);
        });
      });

      describe('src/<lang>/ folder', () => {
        it('11tydata.js exists', () => {
          const path = `src/${locale.path}/${locale.path}.11tydata.js`;
          const result = fs.existsSync(path);
          assert.equal(result, true);
        });

        it('index.njk exists', () => {
          const path = `src/${locale.path}/index.njk`;
          const result = fs.existsSync(path);
          assert.equal(result, true);
        });
      });

      describe('translation strings', () => {
        const messagesjs = fs.readFileSync('locales/messages.js', 'utf-8');
        const messagespo = fs.readFileSync(messagesPoPath, 'utf-8');

        // search for strings that look like: _("key")
        const keys = [...messagesjs.matchAll(/_\(['"](.*)['"]\)/g)].map(
          (match) => match[1]
        );

        for (const key of keys) {
          it(`contains key: ${key}`, () => {
            const found = messagespo.match(new RegExp(`msgid "${key}"`, 'g'));

            assert.notEqual(found, null);
            assert.equal(found.length, 1);
          });
        }
      });
    });
  }
});
