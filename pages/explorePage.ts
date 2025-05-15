import { Page, expect } from '@playwright/test';

export class ExplorePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Robust locator for hero title (consider asking devs for data-testid)
  private get heroTitle() {
    return this.page.locator('h1.exploreContent_heroTitle__jegMQ');
  }

  // Using getByRole for accessibility and stability
  private get loginButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  // Login page title (make sure this selector is stable)
  private get loginTitle() {
    return this.page.locator('h1.styles_title__PQaxk');
  }

  private avatarEmailLocatorWithValue(email: string) {
    return this.page.locator(`//span[contains(text(),'${email}')]`);
  }
  
  
  
  // Actions and assertions

  async goto() {
    // Prefer absolute URLs in real tests, or ensure baseURL is set in Playwright config
    await this.page.goto('/explore');
  }

  async assertHeroTitleText(expected: string) {
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroTitle).toHaveText(expected);
  }

  async assertLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  async clickLoginButton() {
    await this.assertLoginButtonVisible(); // Assert before click
    await this.loginButton.click();
  }

  async assertLoginTitle(expected: string) {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.loginTitle).toHaveText(expected);
  }

  // Optionally, expose text getters for custom assertions
  async getHeroTitleText(): Promise<string | null> {
    return this.heroTitle.textContent();
  }

  async getLoginTitleText(): Promise<string | null> {
    return this.loginTitle.textContent();
  }
   // Assertion method:
   async assertAvatarEmailVisible(expectedEmail: string) {
    //await expect(this.avatarEmailLocatorWithValue(expectedEmail)).toBeVisible();
    await expect(this.avatarEmailLocatorWithValue(expectedEmail)).toHaveText(expectedEmail);
  }

}
