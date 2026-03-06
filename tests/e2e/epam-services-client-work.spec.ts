import { test, expect } from '@playwright/test';

test.describe('EPAM Header links', () => {
  test('Explore Our Client Work from Services menu', async ({ page }) => {
    // Given: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    await page.waitForLoadState('networkidle');

    // Accept cookies if the banner is visible
    const accept = page.getByRole('button', { name: /accept/i });
    if (await accept.count() > 0) {
      await accept.first().click();
    }

    // When: Select "Services" from the header menu
    await page.getByRole('link', { name: 'Services' }).click();
    await page.waitForLoadState('networkidle');

    // And: Click the "Explore Our Client Work" link
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    await page.waitForLoadState('networkidle');

    // Then: Verify that the "Client Work" text is visible on the page
    await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
  });
});
