# Test info

- Name: Verify that user can login via email
- Location: /Users/niranjankumar/Desktop/Project/Shapes/tests/explore.spec.ts:33:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('//span[contains(text(),\'nirkumar0020@gmail.com\')]')
Expected string: "nirkumar0020@gmail.com"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('//span[contains(text(),\'nirkumar0020@gmail.com\')]')

    at ExplorePage.assertAvatarEmailVisible (/Users/niranjankumar/Desktop/Project/Shapes/pages/explorePage.ts:68:67)
    at /Users/niranjankumar/Desktop/Project/Shapes/tests/explore.spec.ts:62:17
```

# Page snapshot

```yaml
- main:
  - img "Shapes, Inc."
  - heading "Welcome" [level=1]
  - paragraph: Log in to continue to Shapes, Inc..
  - text: Email address
  - textbox "Email address": nirkumar0020@gmail.com
  - text: Password
  - textbox "Password": testautomation
  - button "Show password"
  - img "captcha"
  - text: Enter the code shown above
  - textbox "Enter the code shown above"
  - paragraph:
    - link "Forgot password?":
      - /url: /u/login/password-reset-start/Username-Password-Authentication?state=hKFo2SB1UVF2cXZTWE92RXVEaUlUSnl0MEZGZEdBV1FYMjJzaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDdyOHp4UE9KQk1saGNueE9sRGJiRFJYcmJ5S0FSNlZqo2NpZNkgTG9WbUZ2T0QzemQwazdUeUJRaUNMSFNJclNUb0lpWHk
  - button "Continue"
  - paragraph:
    - text: Don't have an account?
    - link "Sign up":
      - /url: /u/signup/Username-Password-Authentication?state=hKFo2SB1UVF2cXZTWE92RXVEaUlUSnl0MEZGZEdBV1FYMjJzaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDdyOHp4UE9KQk1saGNueE9sRGJiRFJYcmJ5S0FSNlZqo2NpZNkgTG9WbUZ2T0QzemQwazdUeUJRaUNMSFNJclNUb0lpWHk
```

# Test source

```ts
   1 | import { Page, expect } from '@playwright/test';
   2 |
   3 | export class ExplorePage {
   4 |   readonly page: Page;
   5 |
   6 |   constructor(page: Page) {
   7 |     this.page = page;
   8 |   }
   9 |
  10 |   // Robust locator for hero title (consider asking devs for data-testid)
  11 |   private get heroTitle() {
  12 |     return this.page.locator('h1.exploreContent_heroTitle__jegMQ');
  13 |   }
  14 |
  15 |   // Using getByRole for accessibility and stability
  16 |   private get loginButton() {
  17 |     return this.page.getByRole('button', { name: 'Log in' });
  18 |   }
  19 |
  20 |   // Login page title (make sure this selector is stable)
  21 |   private get loginTitle() {
  22 |     return this.page.locator('h1.styles_title__PQaxk');
  23 |   }
  24 |
  25 |   private avatarEmailLocatorWithValue(email: string) {
  26 |     return this.page.locator(`//span[contains(text(),'${email}')]`);
  27 |   }
  28 |   
  29 |   
  30 |   
  31 |   // Actions and assertions
  32 |
  33 |   async goto() {
  34 |     // Prefer absolute URLs in real tests, or ensure baseURL is set in Playwright config
  35 |     await this.page.goto('/explore');
  36 |   }
  37 |
  38 |   async assertHeroTitleText(expected: string) {
  39 |     await expect(this.heroTitle).toBeVisible();
  40 |     await expect(this.heroTitle).toHaveText(expected);
  41 |   }
  42 |
  43 |   async assertLoginButtonVisible() {
  44 |     await expect(this.loginButton).toBeVisible();
  45 |   }
  46 |
  47 |   async clickLoginButton() {
  48 |     await this.assertLoginButtonVisible(); // Assert before click
  49 |     await this.loginButton.click();
  50 |   }
  51 |
  52 |   async assertLoginTitle(expected: string) {
  53 |     await expect(this.loginTitle).toBeVisible();
  54 |     await expect(this.loginTitle).toHaveText(expected);
  55 |   }
  56 |
  57 |   // Optionally, expose text getters for custom assertions
  58 |   async getHeroTitleText(): Promise<string | null> {
  59 |     return this.heroTitle.textContent();
  60 |   }
  61 |
  62 |   async getLoginTitleText(): Promise<string | null> {
  63 |     return this.loginTitle.textContent();
  64 |   }
  65 |    // Assertion method:
  66 |    async assertAvatarEmailVisible(expectedEmail: string) {
  67 |     //await expect(this.avatarEmailLocatorWithValue(expectedEmail)).toBeVisible();
> 68 |     await expect(this.avatarEmailLocatorWithValue(expectedEmail)).toHaveText(expectedEmail);
     |                                                                   ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  69 |   }
  70 |
  71 | }
  72 |
```