const chai = require('chai');
const Formatter = require('../../../dist/Formatter').default;

chai.should();

describe('Formatter.printf', () => {
  it('should return a string formatted with printf (single argument)', () => {
    const formatter = new Formatter();

    const expected = 'These 3 fruits are excellent.';
    const actual = formatter.printf('These %d fruits are excellent.', 3);

    actual.should.be.equal(expected);
  });

  it('should return a string formatted with printf (multiple arguments)', () => {
    const formatter = new Formatter();

    const expected = 'These 3 fruits are smaller than a banana.';
    const actual = formatter.printf(
      'These %d fruits are smaller than a %s.',
      3,
      'banana'
    );

    actual.should.be.equal(expected);
  });

  it('should return the string as-is when no args given', () => {
    const formatter = new Formatter();

    const expected = 'These %d fruits are excellent.';
    const actual = formatter.printf(expected);

    actual.should.be.equal(expected);
  });
});
