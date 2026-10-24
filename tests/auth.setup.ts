import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

const authFile = 'playwright/.auth/user.json';

setup('sign in through the UI and save authenticated browser state', async ({ page }) => {
  const authPage = new AuthPage(page);
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD before running the authenticated tests.');
  }

  await authPage.signIn(email, password);
  await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  await mkdir(dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
