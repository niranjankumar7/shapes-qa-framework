import { test, expect } from '@playwright/test';
import { ExplorePage } from '../pages/explorePage';

// Group explore tests
test.describe('Explore Page', () => {
  let explore: ExplorePage;

  test.beforeEach(async ({ page }) => {
    explore = new ExplorePage(page);
    await explore.goto();
  });

  test('Verify the hero title text on Shapes landing page', async () => {
    const expectedTitle = 'Meet Shapes - AI social agents';
    await explore.assertHeroTitleText(expectedTitle);
  });

  test('Shapes Inc logo (image + text) is visible and text is correct', async () => {
    await expect(await explore.isLogoVisible()).toBe(true);
    await expect(await explore.getLogoText()).toBe('shapes inc');
  });

  test.describe('Search functionality', () => {
    const searchTerms = ['virat', 'ronaldo', 'messi'];

    for (const term of searchTerms) {
      test(`search for "${term}" returns at least one matching result`, async () => {
        await explore.searchByClick(term);
        await explore.waitForFirstResult();

        const titles = await explore.getAllResultNames();
        expect(titles.length).toBeGreaterThan(0);
        const found = titles.some(title =>
          title.trim().toLowerCase().includes(term.toLowerCase())
        );
        expect(found).toBe(true);
      });
    }
  });
});