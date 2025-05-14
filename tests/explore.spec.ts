import { test, expect } from '@playwright/test';
import { ExplorePage } from '../pages/explorePage';

test('Verify the text displayed on shapes page', async ({ page }) => {
  const explore = new ExplorePage(page);

  await explore.goto();
  const expectedTitle = 'Meet Shapes - AI social agents';
  await   await explore.assertHeroTitleText(expectedTitle);
});

test ('Verify that we have a login button and it works as expected.',async ({page})=>{
    const explore = new ExplorePage(page);
    const expectedurl = "https://shapes.inc/login?returnTo=%2Fexplore"
    const expectedLoginText = "Log in to Shapes"
    await explore.goto();
    await explore.clickLoginButton();
    await expect(page).toHaveURL(expectedurl)
    await explore.assertLoginTitle(expectedLoginText);
})
// test('Verify the text displayed on shapes page', async ({ page }) => {
//     const explore = new ExplorePage(page);
  
//     await explore.goto("https://shapes.inc/explore");
//     await explore.searchShape('circle');
  
//     const count = await explore.countShapes();
//     expect(count).toBeGreaterThan(0);
//   });