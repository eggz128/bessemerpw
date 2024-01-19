import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
    await page.getByRole('searchbox', { name: 'Search for:' }).click();
    await page.getByRole('searchbox', { name: 'Search for:' }).fill('cap');
    await page.getByRole('searchbox', { name: 'Search for:' }).press('Enter');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('#content').getByRole('link', { name: 'View cart ' }).click();
    let expectedPrice: string = '£16.00';
    await expect(page.locator('#post-5')).toContainText(expectedPrice);

    await page.locator('#menu-item-42').getByRole('link', { name: 'Home' }).click();
    
});

