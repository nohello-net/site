import { test, expect } from '@playwright/test';
import { BASE_URL } from './config';

test.describe('index snapshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // pause cursor blinking, otherwise snapshots can differ :(
    await page.$eval('.typed-cursor', (el) =>
      el.classList.remove('typed-cursor--blink')
    );

    // the page shows the current year, so pin it to the year of the committed
    // snapshots. otherwise every snapshot breaks on 1 January
    await page.evaluate((snapshotYear) => {
      const currentYear = new Date().getFullYear().toString(10);
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (node.nodeValue?.includes(currentYear)) {
          node.nodeValue = node.nodeValue.split(currentYear).join(snapshotYear);
        }
      }
    }, '2022');
  });

  test('page looks the same', async ({ page }) => {
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchSnapshot('index.png', {
      threshold: 0.05,
    });
  });

  test('why', async ({ page }) => {
    await page.keyboard.type('hello');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('why.png', { threshold: 0.05 });
  });
});
