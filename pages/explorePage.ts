import { Page, Locator, expect } from '@playwright/test';

export class ExplorePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private get heroTitle() {
    return this.page.locator('h1.exploreContent_heroTitle__jegMQ');
  }

  private get loginButton(){
    return this.page.getByRole('button', { name: 'Log in' }); // have to use return because this does not return a locator. 
  }
  
  async goto() {
    await this.page.goto('/explore');
  }

  async getHeroTitleText(): Promise<string | null> {
    return this.heroTitle.textContent();
  }

  async assertHeroTitleText(expected: string) {
    await expect(this.heroTitle).toHaveText(expected);
  }

  private get loginTitle() {
    return this.page.locator('h1.styles_title__PQaxk');
  }
  // Public method to get the text
  async getLoginTitleText(): Promise<string | null> {
    return this.loginTitle.textContent();
  }

  // Public method to assert the text (optional)
  async assertLoginTitle(expected: string) {
    await expect(this.loginTitle).toHaveText(expected);
  }
  async clickLoginButton(){
    await this.loginButton.click();
  }
}
