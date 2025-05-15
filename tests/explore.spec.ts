import { test, expect } from '@playwright/test';
import { ExplorePage } from '../pages/explorePage';
import { LoginPage } from '../pages/loginPage';

test('Verify the hero title text on Shapes landing page', async ({ page }) => {
    const explore = new ExplorePage(page);
  
    await explore.goto();
    const expectedTitle = 'Meet Shapes - AI social agents';
    await explore.assertHeroTitleText(expectedTitle); // single await
  
  });
  

  test('Verify the login button exists and navigates correctly', async ({ page }) => {
    const explore = new ExplorePage(page);
    const expectedUrl = "https://shapes.inc/login?returnTo=%2Fexplore";
    const expectedLoginText = "Log in to Shapes";
  
    await explore.goto();
  
    // Assert login button is visible before clicking
    await explore.assertLoginButtonVisible();
  
    await explore.clickLoginButton();
    await expect(page).toHaveURL(expectedUrl);
  
    // Assert login page title is visible and correct
    await explore.assertLoginTitle(expectedLoginText);
  });
  

test('Verify that user can login via email', async ({ page }) => {
  // 1. Arrange test data and expected values
  const emailAddress = "nirkumar0020@gmail.com";
  const password = "testautomation";
  const expectedUrl = "https://shapes.inc/login?returnTo=%2Fexplore";
  const expectedLoginText = "Log in to Shapes";
  const expectedAvatarEmail = "nirkumar0020@gmail.com";

  // 2. Instantiate page objects
  const explore = new ExplorePage(page);
  const login = new LoginPage(page);

  // 3. Go to main page, click Login, check URL & title
  await explore.goto();
  await explore.clickLoginButton();
  await expect(page).toHaveURL(expectedUrl);
  await explore.assertLoginTitle(expectedLoginText);

  // 4. Login flow: click email, enter credentials, submit
  await login.clickLoginViaEmail();
  await login.enterEmailAddress(emailAddress);
  await login.enterPassword(password);
  await login.clickContinueButton();

  // 5. Assert redirected to dashboard or home (set expected URL as needed)
  // Use a wait for navigation or dashboard to load
  await expect(page).not.toHaveURL(expectedUrl, { timeout: 10000 }); // Should leave login page
 await login.page.waitForTimeout(3000)
  // 6. Assert user avatar/email is present
  await explore.assertAvatarEmailVisible(emailAddress);

});

// test('Verify the text displayed on shapes page', async ({ page }) => {
//     const explore = new ExplorePage(page);
  
//     await explore.goto("https://shapes.inc/explore");
//     await explore.searchShape('circle');
  
//     const count = await explore.countShapes();
//     expect(count).toBeGreaterThan(0);
//   });