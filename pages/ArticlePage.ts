import { expect, type Page } from '@playwright/test';

export class ArticlePage {
  constructor(private readonly page: Page) {}

  async expectDetails(title: string, body: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    await expect(this.page.getByText(body, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Delete Article' }).first()).toBeVisible();
  }

  async openEditor(): Promise<void> {
    await this.page.getByRole('link', { name: 'Edit Article' }).first().click();
    await expect(this.page).toHaveURL(/\/editor\/.+/);
  }

  async delete(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete Article' }).first().click();
    await expect(this.page).toHaveURL(/\/$/);
  }
}
