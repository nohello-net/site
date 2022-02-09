const chai = require('chai');
const Formatter = require('../../../dist/Formatter').default;

const moment = require('moment-timezone');

chai.should();

describe('Formatter.date', () => {
  it('should return a date formatted with moment (timestamp)', () => {
    const formatter = new Formatter();
    moment.locale('en');

    const expected = 'Sunday, August 2, 2020 4:57 AM';
    const actual = formatter.date('LLLL', 1596319020000, 'Asia/Bangkok');

    actual.should.be.equal(expected);
  });

  it('should return a date formatted with moment (javascript date)', () => {
    const formatter = new Formatter();
    moment.locale('en');

    const expected = 'Saturday, August 1, 2020 9:57 PM';
    const actual = formatter.date('LLLL', new Date(1596319020000), 'UTC');

    actual.should.be.equal(expected);
  });

  it('should return a date formatted with moment (ISO string)', () => {
    const formatter = new Formatter();
    moment.locale('en');

    const expected = 'August 1, 2020';
    const actual = formatter.date('LL', '2020-08-01T21:57:00.000Z');

    actual.should.be.equal(expected);
  });
});
