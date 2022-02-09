const { test, expect } = require('@playwright/test');
const { BASE_URL } = require('./config');

test.describe('cookie banner', () => {
  test('shows banner on first load', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('.cc-container')).toBeVisible();
  });

  test.describe('landing banner', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_URL);

      // ensure landing is visible first
      await expect(
        page.locator('.cc-container .cc-section-landing')
      ).toBeVisible();
    });

    test('dismisses banner on accept', async ({ page }) => {
      await page
        .locator('.cc-container .cc-section-landing .cc-btn-accept')
        .click();

      await expect(page.locator('.cc-container')).not.toBeVisible();
    });

    test('dismisses banner on reject', async ({ page }) => {
      await page
        .locator('.cc-container .cc-section-landing .cc-btn-reject')
        .click();

      await expect(page.locator('.cc-container')).not.toBeVisible();
    });

    test.describe('settings', () => {
      test.beforeEach(async ({ page }) => {
        await page
          .locator('.cc-container .cc-section-landing .cc-btn-show-settings')
          .click();

        await expect(
          page.locator('.cc-container .cc-section-landing')
        ).not.toBeVisible();
        await expect(
          page.locator('.cc-container .cc-section-settings')
        ).toBeVisible();
      });

      test('toggles between landing and settings', async ({ page }) => {
        await page
          .locator('.cc-container .cc-section-settings .cc-btn-hide-settings')
          .click();

        await expect(
          page.locator('.cc-container .cc-section-landing')
        ).toBeVisible();
        await expect(
          page.locator('.cc-container .cc-section-settings')
        ).not.toBeVisible();
      });

      test('dismisses settings on accept', async ({ page }) => {
        await page
          .locator('.cc-container .cc-section-settings .cc-btn-accept-selected')
          .click();

        await expect(page.locator('.cc-container')).not.toBeVisible();
      });

      test('dismisses settings on reject', async ({ page }) => {
        await page
          .locator('.cc-container .cc-section-settings .cc-btn-reject')
          .click();

        await expect(page.locator('.cc-container')).not.toBeVisible();
      });
    });
  });

  test('hides banner on subsequent loads', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('.cc-container')).toBeVisible();

    await page
      .locator('.cc-container .cc-section-landing .cc-btn-reject')
      .click();

    await page.reload();

    await expect(page.locator('.cc-container')).not.toBeVisible();
  });
});
