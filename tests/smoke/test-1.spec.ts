import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';

test.describe('Login test', () => {
  test('Login test 1 @Login', async ({ page }) => {
    const login = 'Moses.Armstrong@Feest.ca';
    const password = 'test1';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.goto();
    await loginPage.login(login, password);

    const welcomePageTitle = await welcomePage.title();
    expect(welcomePageTitle).toContain('Welcome');
  });
});
