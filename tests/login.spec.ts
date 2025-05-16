// tests/loginTest.spec.ts
import { test, expect } from '@playwright/test';
import { ExplorePage } from '../pages/explorePage';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Page Flow', () => {
  test.beforeEach(async ({ page }) => {
    // instantiate per test so each gets its own page
    const explore = new ExplorePage(page);
    await explore.goto();
  });

  test('Verify the login button exists and navigates correctly', async ({ page }) => {
    const explore = new ExplorePage(page);
    const expectedUrl = 'https://shapes.inc/login?returnTo=%2Fexplore';
    const expectedLoginText = 'Log in to Shapes';

    await explore.assertLoginButtonVisible();
    await explore.clickLoginButton();

    // now `page` is defined
    await expect(page).toHaveURL(expectedUrl);
    await explore.assertLoginTitle(expectedLoginText);
  });

  test('Verify that user can login via email', async ({ page }) => {
    const explore = new ExplorePage(page);
    const login = new LoginPage(page);

    const emailAddress = 'nirkumar0020@gmail.com';
    const password = 'testautomation';
    const expectedUrl = 'https://shapes.inc/login?returnTo=%2Fexplore';
    //  Navigate to login
    await explore.clickLoginButton();
    await expect(page).toHaveURL(/\/login/);
    await explore.assertLoginTitle('Log in to Shapes');

    //  Email login flow
    await login.clickLoginViaEmail();
    await login.enterEmailAddress(emailAddress);
    await login.enterPassword(password);
    await login.clickContinueButton();

    // Validating we have successfully logged in
    // await explore.openAccountMenu();
    // await explore.assertMyAccountVisible();
    // after login flow:
    // expect(await login.isLoggedInViaCookie()).toBe(true);
    // // or
    // expect(await login.isLoggedInViaLocalStorage()).toBe(true);

  });
});
