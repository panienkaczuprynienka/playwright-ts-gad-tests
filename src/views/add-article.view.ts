import { Page } from '@playwright/test';
import { AddArticleModel } from '../models/article.model';

export class AddArticleView {
  articleTitle = this.page.getByTestId('title-input');
  articleBody = this.page.getByTestId('body-text');
  saveArticleBtn = this.page.getByTestId('save');

  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async addArticle(addArticle: AddArticleModel): Promise<void> {
    await this.articleTitle.fill(addArticle.title);
    await this.articleBody.fill(addArticle.body);
    await this.saveArticleBtn.click();
  }
}
