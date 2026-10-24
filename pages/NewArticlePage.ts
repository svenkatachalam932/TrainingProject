import { expect, type Page } from '@playwright/test';

export interface ArticleDraft {
  title: string;
  description: string;
  body: string;
  tag: string;
}

export class NewArticlePage {
  constructor(private readonly page: Page) {}

  async publish(article: ArticleDraft): Promise<void> {
    await this.page.getByPlaceholder('Article Title').fill(article.title);
    await this.page.getByPlaceholder("What's this article about?").fill(article.description);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(article.body);
    const tags = this.page.getByPlaceholder('Enter tags');
    await tags.fill(article.tag);
    await tags.press('Enter');
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(this.page).toHaveURL(/\/article\/[^/]+\/?$/);
    await expect(this.page.getByRole('heading', { name: article.title, exact: true })).toBeVisible();
  }

  async update(article: ArticleDraft): Promise<void> {
    await this.page.getByPlaceholder('Article Title').fill(article.title);
    await this.page.getByPlaceholder("What's this article about?").fill(article.description);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(article.body);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(this.page).toHaveURL(/\/article\/[^/]+\/?$/);
    await expect(this.page.getByRole('heading', { name: article.title, exact: true })).toBeVisible();
  }
}
