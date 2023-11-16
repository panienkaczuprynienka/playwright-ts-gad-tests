import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleModel } from '../../src/models/article.model';
import { randomArticle } from '../../src/factories/article.factory';

test.describe('Articles test', () => {
  test('Create article', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    const addArticleElem: AddArticleModel = randomArticle();
    await articlesPage.clickAddArticle();
    const addArticleView = new AddArticleView(page);
    await addArticleView.addArticle(addArticleElem);
    await articlesPage.goto();

    //Assert
    const titleLocstor = `strong a:has-text('${addArticleElem.title}')`;

    const element = page.locator(titleLocstor).first();
    await expect(element).toBeVisible();
  });
  test('reject creating article without title @GAD-R04-01', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);

    const articleData = randomArticle();
    articleData.title = '';

    const expectedErrorMessage = 'Article was not created';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.clickAddArticle();
    await addArticleView.addArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body @GAD-R04-01', async ({ page }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';

    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);

    const articleData = randomArticle();
    articleData.body = '';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.clickAddArticle();
    await addArticleView.addArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });
});
