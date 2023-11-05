import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';

test.describe('WebPage tests', () => {
  test('home page title @GAD-R01-01', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('articles page title @GAD-R01-02', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const articlesTitle = await articlesPage.title();
    expect(articlesTitle).toContain('Articles');
  });

  test('comments page title @GAD-R01-02', async ({ page }) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();
    const commentsTitle = await commentsPage.title();
    expect(commentsTitle).toContain('Comments');
  });
});
