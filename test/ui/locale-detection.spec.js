const { test, expect } = require('@playwright/test');
const { BASE_URL } = require('./config');

test.describe('locale detection', () => {
  test('autodetects as base locale', () => {
    test.fail();
  });
  test('autodetects a supported locale', () => {
    test.fail();
  });
  test('falls back to base locale from unknown', () => {
    test.fail();
  });
  test('remembers override setting', () => {
    test.fail();
  });
  test('direct access ("/de") with other locale ("/fr") does not autodetect', () => {
    test.fail();
  });
});
