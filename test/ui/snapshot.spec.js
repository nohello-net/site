const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8123/';

test.describe('index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // pause cursor blinking
    await page.$eval('.typed-cursor', (el) =>
      el.classList.remove('typed-cursor--blink')
    );
  });

  test('page looks the same', async ({ page }) => {
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchSnapshot('index.png', { threshold: 0.2 });
  });

  test('why', async ({ page }) => {
    await page.keyboard.type('hello');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('why.png', { threshold: 0.2 });
  });
});
