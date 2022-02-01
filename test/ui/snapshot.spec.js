const { test, expect } = require('@playwright/test');
const { BASE_URL } = require('./config');

test.describe('index snapshots', () => {
  test.beforeEach(async ({ page, context }) => {
    // prevent cookie popup
    await context.addCookies([
      {
        name: 'cookie_consent',
        value: JSON.stringify({ status: 'rejected', acceptedCategories: [] }),
        url: BASE_URL,
      },
    ]);

    await page.goto(BASE_URL);

    // pause cursor blinking, otherwise snapshots can differ :(
    await page.$eval('.typed-cursor', (el) =>
      el.classList.remove('typed-cursor--blink')
    );
  });

  test('page looks the same', async ({ page }) => {
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchSnapshot('index.png', {
      threshold: 0.2,
    });
  });

  test('why', async ({ page }) => {
    await page.keyboard.type('hello');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('why.png', { threshold: 0.2 });
  });
});
