const chai = require('chai');
const chaiFiles = require('chai-files');

const { file } = chaiFiles;
const path = require('path');
const Translater = require('../../../dist/Translater').default;

chai.should();
chai.use(chaiFiles);

describe('Translater.generateMessageFile', () => {
  it('should create test-messages.js', () => {
    const translater = new Translater();
    translater.setConfiguration({
      localesDirectory: 'tests/assets/locales',
      tokenFilePatterns: [
        'tests/assets/filesToParse/**/*.njk',
        'tests/assets/filesToParse/**/*.js',
      ],
      javascriptMessages: 'test-messages.js',
    });

    translater.generateMessageFile();

    const actual = path.join(
      process.cwd(),
      'tests/assets/locales',
      'test-messages.js'
    );
    const expected = path.join(
      process.cwd(),
      'tests/assets/locales',
      'expected-messages.js'
    );

    file(actual).should.equal(file(expected));
  });

  it('should create test-messages.js using flat implementation for Node 10.x', () => {
    const tempFlat = Array.prototype.flat;
    Array.prototype.flat = undefined;

    const translater = new Translater();
    translater.setConfiguration({
      localesDirectory: 'tests/assets/locales',
      tokenFilePatterns: [
        'tests/assets/filesToParse/**/*.njk',
        'tests/assets/filesToParse/**/*.js',
      ],
      javascriptMessages: 'test-messages.js',
    });

    translater.generateMessageFile();

    const actual = path.join(
      process.cwd(),
      'tests/assets/locales',
      'test-messages.js'
    );
    const expected = path.join(
      process.cwd(),
      'tests/assets/locales',
      'expected-messages.js'
    );

    file(actual).should.equal(file(expected));

    Array.prototype.flat = tempFlat;
  });
});
