import { test, expect } from '@playwright/test';
test.use({ //use options unique to this file (overriding global)
  launchOptions: { slowMo: 300 },
})
test.describe('Sub suite 1', async () => {
  test.describe.configure({retries:2,timeout:20000}) //allow 2 retries for test fails, tests here have 20s to complete
  test('test', async ({ page }) => {
    
    await page.goto('/demo-site'); //using baseUrl from playwright.config.ts this will take us to https://www.edgewordstraining.co.uk/demo-site/

    //The pattern to look for is:
    //page - .find an element on the page - .do something with the element
    await page.getByRole('link', { name: /dis.*/i }).click(); //finds a link, with text matching a regex "start with 'dis' - anything at all after - case insensitive". This is the "Dismiss" link in the blue banner at the bottom 
    await page.getByRole('searchbox', { name: 'Search for:' }).click();
    await page.getByRole('searchbox', { name: 'Search for:' }).fill('belt');
    await page.getByRole('searchbox', { name: 'Search for:' }).press('Enter');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    //.locator() can use CSS or XPath to find an element
    await page.locator('#content') //find an element with an id attribute of content using css
      .getByRole('link', { //THEN scoped inside that
        name: 'View cart', //find a link that contains the text View cart
        exact: false
      }) //If you use an exact match that wont work as "View cart" has an arrow after it on the site 
      .click(); //Assuming all elements in the chain can be found - click the link

    //Same as above but using an XPath locator instead of CSS
    //await page.locator('//*[@id="content"]').getByRole('link', { name: 'View cart', exact: false }).click();

    await page.getByLabel('Remove this item').click(); //Find an element associated with the label (element) with text 'Remove this item'
    await page.getByRole('link', { name: 'Return to shop' }).click();

    await expect(page.locator('h1')).toContainText('Shop'); //An assertion
    //await page.close(); //Close the browser. Doing so wont break any following tests - they will get a new browser automatically.

  });

  test('Relation ident and pw only CSS', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/sdocs/auth.php');
    //CSS locator using playwright only CSS - use 'npx playwright codegen' to check validity/matches - https://playwright.dev/docs/other-locators
    await page.locator('input:visible:right-of(:text("User Name")):above(:text("Password"))').fill('edgewords')
    await page.locator('input').nth(0).fill("Chained nth")
    await page.locator('input >> nth=0').fill("inline nth") //CodeGen seems unable to verify
  });
})


test.describe('Sub suite 2', async () => {

  test('Scoped search and filtering', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/sdocs/auth.php');
    const loginForm = await page.locator('form#Login');
    const passwordField = await loginForm.locator('input').first(); //2 inputs in form - 1st is username
    const usernameField = await loginForm.locator('input').last();
    await passwordField.fill("edgewords");
    await usernameField.fill("edgewords123");

    const buttons = await loginForm.locator('a')
    await buttons.filter({ hasText: 'Submit' }).click() //Filter down via PW CSS

  });



  test.skip('iFrame', async ({ page }) => {
    await page.goto('https://www.independent.co.uk/')
    //Accept cookie button in iframe
    const cookieBanner = await page.frameLocator('#sp_message_iframe_965194');
    await cookieBanner.getByLabel('AGREE').click();
  });


  test.describe('Sub sub test suite', async () => {

    test('iFrame recorded', async ({ page }) => {
      await page.goto('https://www.independent.co.uk/');
      await page.frameLocator('iframe[title="SP Consent Message"]').getByLabel('AGREE').click();
    });

    test('all products', async ({ page }) => {
      await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
      const newProducts = await page.getByLabel('Recent Products');
      for (const prod of await newProducts.locator('h2:not(.section-title)').all()) {
        console.log(await prod.textContent());
      };
    });
  })

})
