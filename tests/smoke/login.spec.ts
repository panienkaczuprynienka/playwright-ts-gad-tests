import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';

test.describe('Login test', () => {
  test('Login test 1 @Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const welcomePageTitle = await welcomePage.title();
    expect(welcomePageTitle).toContain('Welcome');
  });
  test('Reject login with incorrect password @Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login({
      login: testUser1.login,
      password: 'incorectPass',
    });

    const loginTitle = await loginPage.title();
    expect.soft(loginTitle).toContain('Login');
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
  });
});
