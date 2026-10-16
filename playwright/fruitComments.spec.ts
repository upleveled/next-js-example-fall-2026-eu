import test, { expect } from '@playwright/test';

test.describe('fruit comments feature', () => {
  test('saves comments separately for each fruit', async ({ page }) => {
    await page.goto('/fruits');
    await expect(page.locator('h1:text-is("Fruits")')).toHaveCount(1);

    await expect(page.locator('h1 + ul li')).toHaveCount(8);

    const fruitComments = {
      apple: {
        id: 1,
        name: 'Apple',
        emoji: '🍎',
        comment: 'Apples are delicious',
      },
      orange: {
        id: 3,
        name: 'Orange',
        emoji: '🍊',
        comment: 'Oranges are ok',
      },
    };

    for (const { id, name, emoji, comment } of Object.values(fruitComments)) {
      await page.locator(`h1 + ul li a:text-is("${emoji} ${name}")`).click();
      await expect(page).toHaveURL(`/fruits/${id}`);
      await expect(
        page.locator(`h1:text-is("${emoji} ${name} (id ${id})")`),
      ).toHaveCount(1);

      await expect(page.locator('h1 ~ form textarea')).toHaveValue('');

      await page.locator('h1 ~ form textarea').fill(comment);

      // Wait for HTTP response and click the "Save" button
      // at the same time
      await Promise.all([
        page.waitForResponse(`/fruits/${id}`),
        page.locator('button:text-is("Save")').click(),
      ]);

      // // Alternative: wait for network idle
      // // Warning: worse because it may wait longer than necessary
      // await page.locator('button:text-is("Save")').click();
      // await page.waitForLoadState('networkidle');

      await expect(page.locator('h1 ~ form textarea')).toHaveValue(comment);

      await page.reload();
      await expect(page.locator('h1 ~ form textarea')).toHaveValue(comment);

      await page.goto('/fruits');
    }

    await expect(
      page.locator(
        `h1 + ul li a:text-is("${fruitComments.apple.emoji} ${fruitComments.apple.name}")`,
      ),
    ).toHaveText(fruitComments.apple.comment);
    await expect(
      page.locator(
        `h1 + ul li a:text-is("${fruitComments.orange.emoji} ${fruitComments.orange.name}")`,
      ),
    ).toHaveText(fruitComments.orange.comment);
  });
});
