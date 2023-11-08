import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  url = '/login';
  constructor(page: Page) {
    super(page);
  }

  async login(user: string, pass: string): Promise<void> {
    await this.page.getByPlaceholder('Enter User Email').fill(user);
    await this.page.getByPlaceholder('Enter Password').fill(pass);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
}
