import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters for robustness and fresh instance each time
  private get loginViaEmail() {
    return this.page.locator("//a[contains(@class, 'styles_emailButton') and .//span[text()='Log in with Email']]");
  }

  private get emailAddress() {
    return this.page.locator("//input[@id='username']");
  }

  private get passwordLocator() {
    return this.page.locator("//input[@id='password']");
  }

  private get continueButton() {
    return this.page.locator("//button[@type='submit']");
  }

  // Actions

  async clickLoginViaEmail() {
    await expect(this.loginViaEmail).toBeVisible();
    await this.loginViaEmail.click();
  }

  async enterEmailAddress(email: string) {
    await expect(this.emailAddress).toBeVisible();
    await this.emailAddress.fill(email);
  }

  async enterPassword(password: string) {
    await expect(this.passwordLocator).toBeVisible();
    await this.passwordLocator.fill(password);
  }

  async clickContinueButton() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

  // --- Alternative Login Validation ---
  /**
   * Checks if the user is logged in by inspecting authentication cookie presence.
   */
  async isLoggedInViaCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    // adjust cookie names according to your auth setup
    return cookies.some(c => c.name === 'auth_token' || c.name === 'auth0.is.authenticated');
  }

  /**
   * Checks if the user is logged in by verifying localStorage auth token.
   */
  async isLoggedInViaLocalStorage(): Promise<boolean> {
    return this.page.evaluate(() => Boolean(localStorage.getItem('auth_token')));
  }
}
