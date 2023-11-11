import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.getByTestId('firstname-input').click();
  await page.getByTestId('firstname-input').fill('Patrycja');
  await page.getByTestId('lastname-input').click();
  await page.getByTestId('lastname-input').fill('Hus');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('pathus@test.test');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('test123');
  await page.getByTestId('register-button').click();
});