import { expect, type Locator, type Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
  }

  async openSignIn(): Promise<void> {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.openSignIn();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
  }

  async signUp(username: string, email: string, password: string): Promise<void> {
    await this.page.goto('/register');
    await expect(this.page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.getByRole('button', { name: 'Sign up' }).click();
    await expect(this.page.getByRole('link', { name: username })).toBeVisible();
  }
}
