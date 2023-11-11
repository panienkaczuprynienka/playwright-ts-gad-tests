import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { LoginUser } from '../../src/models/login.model';

test.describe('Login test', () => {
  test('Login test 1 @Login', async ({ page }) => {
    const loginUserData: LoginUser = {
      login: testUser1.userEmail,
      password: testUser1.userPassword,
    };

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.goto();
    await loginPage.login(loginUserData);

    const welcomePageTitle = await welcomePage.title();
    expect(welcomePageTitle).toContain('Welcome');
  });
  test('Reject login with incorrect password @Login', async ({ page }) => {
    const loginUserData: LoginUser = {
      login: testUser1.userEmail,
      password: 'incorectPass',
    };

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(loginUserData);

    const loginTitle = await loginPage.title();
    expect.soft(loginTitle).toContain('Login');
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
  });
});
