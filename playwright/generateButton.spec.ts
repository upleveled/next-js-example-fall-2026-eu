import test, { expect } from '@playwright/test';

test('shows the initial emoji', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'generate' })).toHaveText(
    'generate 😀',
  );
});

test('generates an emoji when clicked', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await page.goto('/');

  const generateButton = page.getByRole('button', { name: 'generate' });
  await expect(generateButton).toHaveText('generate 😀');
  await generateButton.click();
  await expect(generateButton).toHaveText('generate 🐙');
});
