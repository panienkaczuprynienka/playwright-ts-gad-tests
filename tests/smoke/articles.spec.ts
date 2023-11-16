import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { testUser1 } from '../../src/test-data/user.data';

test.describe('Articles test', () => {
  test('Create article', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    const title = 'Jak donald';
    await articlesPage.clickAddArticle();
    const addArticleView = new AddArticleView(page);
    await addArticleView.addArticle(title, 'bodypatrycja');
    await articlesPage.goto();

    //Assert
    const titleLocstor = `strong a:has-text('${title}')`;

    const element = await page.locator(titleLocstor).first();
    await expect(element).toBeVisible();
  });
});
