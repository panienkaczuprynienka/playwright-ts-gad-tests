import { LoginUser } from '../models/login.model';

export const testUser1: LoginUser = {
  login: process.env.USER_EMAIL ?? '[NOT SET]',
  password: process.env.USER_PASSWORD ?? '[NOT SET]',
};
