import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://shapes.inc',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  retries: 1,
  reporter: [['html', { open: 'never' }]],
});
