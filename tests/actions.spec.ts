import { test, expect } from '@playwright/test';

test('Actions', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
    const doesNotExist = await page.locator('NOSUCHELM'); //NOTE - does not fail. Element only searched for when action performed.
    await page.locator('#textInput').click({button: 'right', })
    await page.locator('#textInput').fill('Fast');
    await page.locator('#textInput').press('Control+a');
    await page.locator('#textInput').press('Backspace');
    await page.locator('#textInput').pressSequentially('Slow typing', {delay:300}); //Simulating each keypress - some page JS may rely on this
    await page.locator('#textInput').pressSequentially('More typing', {delay:300}); //Doesn't auto clear
    //await page.locator('#textInput').clear(); //So you might want to do this.
    await page.locator('#textInput').fill('Clears and fills'); //Does not simulate keypresses, but auto clears
    await page.locator('#checkbox').check() //Force it to be checked - if already will remain checked. Also .uncheck()
    await page.locator('#checkbox').click() //Toggle checked state
});

test('Drag drop', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/cssXPath.html');
    await page.locator('#apple').scrollIntoViewIfNeeded()
    const gripper = await page.locator('#slider').getByRole('link')
    //await gripper.dragTo() //Hmm no target to drag to...
    
    //page.dragAndDrop() doesnt take Locators - uses CSS selectors
    //Need to turn off actionability checks with 'force:true' because we are dragging outside the element bounds of the gripper
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
    await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
});

test('Assertions', async ({ page }) => {

    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html');

    await expect(page).toHaveTitle("Automated Tools Test Site");
    await page.locator('#delay').fill('15');
    await page.getByRole('link', { name: 'Load Content' }).click();

    const apple = await page.locator('div#image-holder > img'); //Recorder/Locaror picker gave locator that matched the wait spinner. Manually created this locator for the apple image
    
    await expect(apple).toBeVisible(); //Using global config - default is 5s, but configurable for all tests in playwright.config.ts
    //if expect fails, test fails and no more code from this point is executed

    //You can override the timeout on a case by case basis if your expect needs longer
    //await expect(apple).toBeVisible({timeout: 15000});

    //Or if you have a few expects that need longer - make a custom expect:
    // const slowExpect = await expect.configure({timeout:17000})
    // await slowExpect.soft(apple).toBeVisible();

    //If you want your test to fail on a failed assertion, but code execution in this test should continue - use a soft expect
    // await expect.soft(apple).toBeVisible();

    await expect(apple).toHaveScreenshot('theapple.png'); //On first run this will create the expected image. Each browser will need it's own expected image due to rendering differences.
    //Following runs will compare the previously captured image to the runtime image. If a failiure occurs you are told how much the image differs, and the report will show actual+expected+a diff of the image
    //If you know the target image has changed run 'npx playwright test --update-snapshots' to generate new expected images
    
    //Navigates home if the previous assertions (expects) don't stop execution due to fail
    await page.getByRole('link', { name: 'Home' }).click();
});