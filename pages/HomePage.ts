import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly globalFeed: Locator;
  readonly newArticleLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalFeed = page.getByText('Global Feed', { exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  }

  async openNewArticle(): Promise<void> {
    await this.newArticleLink.click();
    await expect(this.page).toHaveURL(/\/editor\/?$/);
  }

  async expectArticleInFeed(title: string): Promise<void> {
    await this.globalFeed.click();
    await expect(this.page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  }
}
