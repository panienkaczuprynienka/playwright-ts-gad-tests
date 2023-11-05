import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MainMenuComponent } from '../components/main-menu.component';

export class CommentsPage extends BasePage {
  url = '/comments.html';
  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
