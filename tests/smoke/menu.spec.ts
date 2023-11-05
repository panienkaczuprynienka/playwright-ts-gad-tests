import { test, expect } from '@playwright/test';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';

test.describe('Menu tests', () => {
  test('Menu test', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();
    const commentsPage = new CommentsPage(page);
    const commentsTitle = await commentsPage.title();
    expect(commentsTitle).toContain('Comments');
  });

  test('home Menu test', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await articlesPage.mainMenu.homeButton.click();
    const homePage = new HomePage(page);
    const homeTitle = await homePage.title();
    expect(homeTitle).toContain('GAD');
  });
});
