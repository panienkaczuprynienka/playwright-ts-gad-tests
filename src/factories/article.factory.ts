import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticle(titleLength?: number): AddArticleModel {
  const articleModel: AddArticleModel = {
    title: titleLength
      ? faker.lorem.words(titleLength)
      : faker.company.buzzPhrase(),
    body: faker.commerce.productDescription(),
  };

  return articleModel;
}
