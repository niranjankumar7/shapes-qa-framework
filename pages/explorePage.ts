import { Locator, Page, expect } from '@playwright/test';

export class ExplorePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Robust locator for hero title (consider asking devs for data-testid)
  private get heroTitle() {
    return this.page.locator('h1.exploreContent_heroTitle__jegMQ');
  }
  private avatarEmailLocatorWithValue(email: string) {
    return this.page.locator(`//span[contains(text(),'${email}')]`);
  }
  // Having issue with email locator - debug later

  // Using getByRole for accessibility and stability
  private get loginButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  // Login page title (make sure this selector is stable)
  private get loginTitle() {
    return this.page.locator('h1.styles_title__PQaxk');
  }

  // outer container
  private get logoContainer(): Locator {
    return this.page.locator('div[class^="logo_logoContainer"]');
  }

  // the <img alt="Logo"> inside it
  private get logoImage(): Locator {
    return this.logoContainer.locator('img[alt="Logo"]');
  }

  // the text div
  private get logoText(): Locator {
    return this.logoContainer.locator('div[class^="logo_logoText"]');
  }

  /** The search input field */
  private get searchInput(): Locator {
    return this.page.locator('input[class^="searchBox_searchInput"]');
  }

  /** The search button next to the input */
  private get searchButton(): Locator {
    return this.page.locator('button[class^="searchBox_searchButton"]');
  }

  /** All result card containers */
  private get resultCards(): Locator {
    return this.page.locator('div[class^="searchResults_resultCardContent"]');
  }

  /** The first result card (for waiting) */
  private get firstResultCard(): Locator {
    return this.resultCards.first();
  }

  /** Types the term and presses Enter to search */
  async searchByEnter(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  /** Types the term and clicks the search button */
  async searchByClick(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  /** Waits until the first result card is visible */
  async waitForFirstResult(): Promise<void> {
    await this.firstResultCard.waitFor({ state: 'visible', timeout: 5000 });
  }

  /** Retrieves the text of all result titles (<h3>) */
  async getAllResultNames(): Promise<string[]> {
    const nameLocator = this.resultCards.locator('h3[class^="searchResults_resultCardName"]');
    return nameLocator.allTextContents();
  } 
   /** Avatar dropdown container */
   private get navAccount(): Locator {
    // Use prefix-class matching to avoid hash changes
    return this.page.locator('div[class^="navAccount_navAccount"]');
  }

    
    /** My Account menu item */
    private get myAccountItem(): Locator {
      return this.page.locator('a.szh-menu__item--anchor:has-text("My Account")');
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
  /** Verify both image and text are visible */
  async isLogoVisible(): Promise<boolean> {
    await this.logoContainer.waitFor({ state: 'visible', timeout: 5_000 });
    const imgVisible = await this.logoImage.isVisible();
    const textVisible = await this.logoText.isVisible();
    return imgVisible && textVisible;
  }

  /** Grab and trim the text */
  async getLogoText(): Promise<string> {
    await this.logoText.waitFor({ state: 'visible', timeout: 5_000 });
    return (await this.logoText.textContent())?.trim() ?? '';
  }

  /** Type into search and press Enter */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  /** Wait for a result containing the term */
  async isSearchResultVisible(term: string): Promise<boolean> {
    await this.searchResult(term).first().waitFor({ state: 'visible', timeout: 5_000 });
    return this.searchResult(term).first().isVisible();
  }
  
  /** Clicks on the user avatar to open account menu */
  async openAccountMenu(): Promise<void> {
    await this.navAccount.waitFor({ state: 'visible', timeout: 5000 });
    await this.navAccount.click();
  }
  
  /** Asserts that the "My Account" option is visible in the dropdown */
  async assertMyAccountVisible(): Promise<void> {
    await this.myAccountItem.waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.myAccountItem).toHaveText('My Account');
  }

}
