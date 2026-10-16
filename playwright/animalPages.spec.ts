import test, { expect } from '@playwright/test';
import { animals } from '../migrations/00001-insertAnimals';

test.describe('animal pages', () => {
  test('show animal details', async ({ page }) => {
    await page.goto('/animals');
    await expect(page.locator('h1:text("Animals")')).toHaveCount(1);

    await expect(page.locator('h1 + ul li')).toHaveCount(animals.length);
    await expect(page.locator('h1 + ul img')).toHaveCount(animals.length);

    for (const animal of animals) {
      const animalImg = page.locator(
        `h1 + ul img[alt="${animal.firstName} the ${animal.type} wearing a ${animal.accessory}"]`,
      );
      await expect(animalImg).toBeVisible();

      // Chain .locator() on an existing element
      await expect(animalImg.locator('+ span')).toContainText(animal.firstName);

      await animalImg
        // Get the parent (link)
        .locator('xpath=..')
        .click();

      await expect(page.locator(`h1:text("${animal.firstName}")`)).toHaveCount(
        1,
      );

      await page.goBack();
    }
  });
});
