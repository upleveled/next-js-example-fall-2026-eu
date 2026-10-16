import test, { expect } from '@playwright/test';

test.describe('header navigation feature', () => {
  test('allows users to access the home page and other pages', async ({
    page,
  }) => {
    await page.goto('/');

    // Check that there is a visible h1 with this text
    const homepageH1 = page.locator('h1:text("Animals for every occasion")');
    await expect(homepageH1).toBeVisible();

    // Check that there is 1 h1 with this text
    await expect(homepageH1).toHaveCount(1);

    // Check that the first h1 on the page contains the text "Animals"
    await expect(page.locator('h1')).toContainText('Animals');
    // // Check that the first h1 on the page has the exact text "Animals" (fails)
    // await expect(page.locator('h1')).toHaveText('Animals');

    await expect(page.getByTestId('image-next-image')).toBeVisible();

    await page.getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL('/about-us');
    await expect(page.locator('h1:text("About Us")')).toHaveCount(1);
    await expect(page.locator('h1:text("About Us")')).toBeVisible();

    await page.getByRole('link', { name: 'Animals' }).click();
    await expect(page).toHaveURL('/animals');
    await expect(page.locator('h1:text("Animals")')).toHaveCount(1);
  });
});
