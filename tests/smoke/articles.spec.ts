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
    const title = 'Moj tytul' + generateUniqueTitle();
    await articlesPage.clickAddArticle();
    const addArticleView = new AddArticleView(page);
    await addArticleView.addArticle(title, 'bodypatrycja');
    await articlesPage.goto();

    //Assert
    const titleLocstor = `strong a:has-text('${title}')`;

    const element = page.locator(titleLocstor).first();
    await expect(element).toBeVisible();
  });
});

function generateUniqueTitle(): string {
  const timestamp = new Date().getTime(); // Uzyskanie aktualnego czasu w milisekundach
  const randomString = Math.random().toString(36).substring(7); // Generowanie losowego ciągu znaków

  const uniqueTitle = `Test-${timestamp}-${randomString}`;
  return uniqueTitle;
}
