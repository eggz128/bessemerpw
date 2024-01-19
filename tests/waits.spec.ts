import { test, expect } from '@playwright/test';

test.beforeAll(async ({ page }) => { //Run once before any test execution in this file
    test.setTimeout(5000) //This is the allowed execution time for just this beforeAll block - not tests
    await page.goto('https://www.bing.com')
    await page.waitForTimeout(3000)
})

test.beforeEach(async ({ page }) => { //Run before each and every test
    await page.goto('https://www.google.com')
    await page.waitForTimeout(3000)
})

test('Defalt waits and overrides @smoke', async ({ page }) => {
    test.setTimeout(30000) //This test only total execution timeout
    //page.setDefaultTimeout(3000); //Set a timeout for all actions in this test
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html');
    const doesnotexist = await page.locator('SomethingThatDoesntExist'); //does not fail here
    await doesnotexist.click() //no default actionability check - so will just run down the clock for the test (30s default) then fail
    //await doesnotexist.click({timeout: 5000}) //A timeout for this specific action

    const appleImage = await page.locator('#image-holder > img'); //Remember wont fail here, even if not in DOM now
    //Manually load content now
    await appleImage.click();
    //Manually clear within 10s
    await page.waitForSelector('#image-holder > img', { state: 'detached', timeout: 10000 })
    //Assertion is preferred:
    await expect(appleImage).not.toBeAttached()
    await appleImage.waitFor();
});

test('Spawning and waiting for a pop up window', async ({ page, context }) => {
    //Multi window / tab test
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html');
    const [newPage] = await Promise.all([ //Get a newPage once both...
        context.waitForEvent('page'), //a page bas been returned and 
        page.locator('a[onclick="return popUpWindow();"]').click()// a Click to Open a pop up window has taken place
    ]) //if both promises are resolved then execution can continue

    await newPage.waitForLoadState('load'); //Make sure new page has loaded

    await page.waitForTimeout(5000); //A dumb wait. Avoid as it wastes time. Just here so we can visually verify things have worked.

    await newPage.locator('a[href]').click() //Click the close button on the new pop up window

});