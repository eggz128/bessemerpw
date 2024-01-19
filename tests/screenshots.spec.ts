import { test, expect } from '@playwright/test';

test('Manually take screenshots and even PDFs', async ({ page }) => { 
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/basicHtml.html');
    await page.screenshot({path: './manualscreenshots/pagescreenshot.png'})
    await page.screenshot({path: './manualscreenshots/fullpagescreenshot.png', fullPage: true})
    await page.locator('#htmlTable').screenshot({path: './manualscreenshots/justthetable.png'})
    await page.pdf({path: './manualscreenshots/pagepdf.pdf'}) //"prints" the page
    //Note docs say that pdf creation only works for chrome headless
    //Headed and Headless chrome *used* to use different rendering paths
    //6+ months ago this changed and was unified. I don't think Playwright devs have noticed...
});