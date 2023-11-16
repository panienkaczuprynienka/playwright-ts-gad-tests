import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticle(): AddArticleModel {
  const articleModel: AddArticleModel = {
    title: faker.company.buzzPhrase(),
    body: faker.commerce.productDescription(),
  };

  return articleModel;
}
