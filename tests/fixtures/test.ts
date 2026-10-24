import { test as base, expect } from '@playwright/test';
import { ArticlePage } from '../../pages/ArticlePage';
import { AuthPage } from '../../pages/AuthPage';
import { HomePage } from '../../pages/HomePage';
import { NewArticlePage } from '../../pages/NewArticlePage';

type ConduitFixtures = {
  articlePage: ArticlePage;
  authPage: AuthPage;
  homePage: HomePage;
  newArticlePage: NewArticlePage;
};

export const test = base.extend<ConduitFixtures>({
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  newArticlePage: async ({ page }, use) => {
    await use(new NewArticlePage(page));
  },
});

export { expect };
