import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MainMenuComponent } from '../components/main-menu.component';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleBtn = this.page.getByRole('button', { name: 'Add Article' });
  articleTitle = this.page.getByTestId('title-input');
  articleBody = this.page.getByTestId('body-text');
  saveArticleBtn = this.page.getByTestId('save');

  constructor(page: Page) {
    super(page);
  }

  async clickAddArticle(): Promise<void> {
    await this.addArticleBtn.click();
  }
}
