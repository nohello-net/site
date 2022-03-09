import { test, expect } from '@playwright/test';
import { BASE_URL } from './config';

const url = (path = '') => `${BASE_URL}${path}`;

test.describe('locale detection', () => {
  test.describe('zz', () => {
    test.use({ locale: 'zz' });
    test('falls back to base locale from unknown', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test.describe('de', () => {
    test.use({ locale: 'de' });
    test('autodetects as navigator locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('de/'));
    });
  });

  test.describe('en', () => {
    test.use({ locale: 'en-AU' });
    test('base locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test.describe('pt-br', () => {
    test.use({ locale: 'pt-BR' });
    test('base locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('pt-br/'));
    });
  });

  test.describe('pt', () => {
    test.use({ locale: 'pt' });
    test('base locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test('remembers override setting', async ({ page }) => {
    await page.goto(BASE_URL);
    expect(page.url()).toBe(url('en/'));

    await page.locator('"Deutsch"').click();
    expect(page.url()).toBe(url('de/'));

    await page.goto(BASE_URL);
    expect(page.url()).toBe(url('de/'));
  });

  test('direct access ("/de") with other locale ("/fr") does not autodetect', async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    expect(page.url()).toBe(url('en/'));

    await page.locator('"Deutsch"').click();
    expect(page.url()).toBe(url('de/'));

    await page.goto(url('fr/'));
    expect(page.url()).toBe(url('fr/'));
  });
});
