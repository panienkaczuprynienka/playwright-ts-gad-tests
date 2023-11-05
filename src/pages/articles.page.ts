import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MainMenuComponent } from '../components/main-menu.component';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
