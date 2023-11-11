import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginUser } from '../models/login.model';

export class LoginPage extends BasePage {
  url = '/login/';
  loginError = this.page.getByTestId('login-error');
  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  passwordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  constructor(page: Page) {
    super(page);
  }

  async login(loginUserData: LoginUser): Promise<void> {
    await this.userEmailInput.fill(loginUserData.login);
    await this.passwordInput.fill(loginUserData.password);
    await this.loginButton.click();
  }
}
