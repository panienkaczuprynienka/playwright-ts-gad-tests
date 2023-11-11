import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterUser } from '../../src/models/user.model';
import { randomUserData } from '../../src/factories/user.factory';

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
    await loginPage.login({
      login: registerUserData.email,
      password: registerUserData.password,
    });

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });

  test('not register with incorrect data - non valid email @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const registerUserData = randomUserData();
    registerUserData.email = '@#$';

    const expectedErrorText = 'Please provide a valid email address';
    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('not register with incorrect data - email not provided @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const expectedErrorText = 'This field is required';
    const registerUserData = randomUserData();
    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.userFirstNameInput.fill(registerUserData.firstName);
    await registerPage.userLastNameInput.fill(registerUserData.lastName);
    await registerPage.userPasswordInput.fill(registerUserData.password);
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
