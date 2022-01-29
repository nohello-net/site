const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8123/';

test('index', async ({ page }) => {
  await page.goto(BASE_URL);
  const screenshot = await page.screenshot({ fullPage: true });

  expect(screenshot).toMatchSnapshot('index.png', { threshold: 0.2 });
});
