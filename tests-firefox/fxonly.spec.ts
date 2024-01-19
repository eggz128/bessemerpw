import { test, expect } from '@playwright/test';

test('firefox only test', async ({ page }) => {
    test.setTimeout(45000) //This test has 45 secs to run
    await page.goto('https://www.mozilla.org');
})
