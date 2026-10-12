import test, { expect } from '@playwright/test';

test('allows users to add comments on fruits', async ({ page }) => {
  await page.goto('/fruits');
  await expect(page.locator('h1:text("Fruits")')).toHaveCount(1);

  await expect(page.locator('h1 + ul li')).toHaveCount(8);

  await page.locator('h1 + ul li:nth-child(1) a').click();
  await expect(page).toHaveURL('/fruits/1');
  await expect(page.locator('h1:text("Apple")')).toHaveCount(1);

  const comment = 'Apples are delicious!';
  await page.locator('h1 ~ form textarea').fill(comment);
  await page.locator('button:has-text("Save")').click();

  await expect(page.locator('h1 ~ form textarea')).toHaveValue(comment);

  await page.reload();
  await expect(page.locator('h1 ~ form textarea')).toHaveValue(comment);

  await page.goto('/fruits/2');
  await expect(page.locator('h1 ~ form textarea')).not.toHaveValue(comment);

  await page.goto('/fruits');
  await expect(page.locator('h1 + ul li:nth-child(1) a + div')).toHaveText(
    comment,
  );
});
