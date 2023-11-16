import { Page } from '@playwright/test';

export class AddArticleView {
  articleTitle = this.page.getByTestId('title-input');
  articleBody = this.page.getByTestId('body-text');
  saveArticleBtn = this.page.getByTestId('save');

  constructor(private page: Page) {}

  async addArticle(title: string, body: string): Promise<void> {
    await this.articleTitle.fill(title);
    await this.articleBody.fill(body);
    await this.saveArticleBtn.click();
  }
}
