import { test, expect } from './fixtures/test';

test('home page displays the Conduit feed', async ({ homePage, page }) => {
  await homePage.open();

  await expect(page).toHaveTitle(/Conduit/);
  await expect(homePage.globalFeed).toBeVisible();
  await expect(homePage.newArticleLink).toBeVisible();
});
