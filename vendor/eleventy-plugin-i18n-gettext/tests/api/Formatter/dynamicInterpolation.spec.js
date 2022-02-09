const chai = require('chai');
const Formatter = require('../../../dist/Formatter').default;

chai.should();

describe('Formatter.dynamicInterpolation', () => {
  it('should return a string with tokens replaced by obj properties', () => {
    const formatter = new Formatter();

    const translation = '${value1} ${value2} or not ${value1} ${value2}';
    const obj = { value2: 'be', value1: 'to' };

    const expected = 'to be or not to be';
    const actual = formatter.dynamicInterpolation(translation, obj);

    actual.should.be.equal(expected);
  });

  it('should return the string as-is when no obj given', () => {
    const formatter = new Formatter();

    const expected = '${value1} ${value2} or not ${value1} ${value2}';
    const actual = formatter.dynamicInterpolation(expected);

    actual.should.be.equal(expected);
  });
});
