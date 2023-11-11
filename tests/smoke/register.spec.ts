import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterUser } from '../../src/models/user.model';

test.describe('Verify register', () => {
  test('@Register register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    //Arange
    const registerUserData: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      email: '',
      password: faker.internet.password({ length: 10 }),
    };

    registerUserData.email = faker.internet.email({
      firstName: registerUserData.firstName,
      lastName: registerUserData.lastName,
    });

    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    const expectedAlertPopupText = 'User created';

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopupText);

    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    // Assert
    await loginPage.login(registerUserData.email, registerUserData.password);

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });
});
