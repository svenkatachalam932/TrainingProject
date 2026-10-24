import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures/test';
import type { ArticleDraft } from '../pages/NewArticlePage';

const runId = randomUUID().slice(0, 8);
const createdArticleUrls = new Map<string, string>();

const articles: Array<ArticleDraft & { id: string }> = [
  {
    id: 'first',
    title: `Playwright Article Alpha ${runId}`,
    description: 'First data-driven article',
    body: 'Article Alpha was created through the Conduit user interface.',
    tag: 'playwright',
  },
  {
    id: 'second',
    title: `Playwright Article Beta ${runId}`,
    description: 'Second data-driven article',
    body: 'Article Beta was created through the Conduit user interface.',
    tag: 'automation',
  },
  {
    id: 'third',
    title: `Playwright Article Gamma ${runId}`,
    description: 'Third data-driven article',
    body: 'Article Gamma was created through the Conduit user interface.',
    tag: 'typescript',
  },
];

function createdUrl(articleId: string): string {
  const url = createdArticleUrls.get(articleId);
  if (!url) {
    throw new Error(`The article "${articleId}" was not created before this workflow step.`);
  }
  return url;
}

test.describe.serial('article lifecycle workflow', () => {
  test('create three articles from the data set', async ({
      homePage,
      newArticlePage,
      articlePage,
      page,
    }) => {
      for (const article of articles) {
        await homePage.open();
        await homePage.openNewArticle();
        await newArticlePage.publish(article);

        await articlePage.expectDetails(article.title, article.body);
        await expect(page.getByText(article.tag, { exact: true })).toBeVisible();
        createdArticleUrls.set(article.id, page.url());
      }
    });

  test('edit the first created article', async ({ articlePage, newArticlePage, page }) => {
    await page.goto(createdUrl('first'));
    await articlePage.expectDetails(articles[0].title, articles[0].body);
    await articlePage.openEditor();

    const updatedArticle: ArticleDraft = {
      ...articles[0],
      title: `${articles[0].title} Edited`,
      description: 'Updated article description',
      body: 'The first article was edited through the Conduit user interface.',
    };
    await newArticlePage.update(updatedArticle);
    await articlePage.expectDetails(updatedArticle.title, updatedArticle.body);
    createdArticleUrls.set('first', page.url());
  });

  test('delete the third created article', async ({ articlePage, page }) => {
    const articleToDelete = articles[2];
    await page.goto(createdUrl(articleToDelete.id));
    await articlePage.expectDetails(articleToDelete.title, articleToDelete.body);

    await articlePage.delete();
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
    await expect(page.getByRole('heading', { name: articleToDelete.title, exact: true })).toHaveCount(0);
  });
});
