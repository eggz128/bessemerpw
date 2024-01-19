import { test, expect } from '@playwright/test';
import { HomePagePOM } from './pompages/HomePagePOM';
import { LoginPagePOM } from './pompages/LoginPagePOM';
import { AddRecordPagePOM } from './pompages/AddRecordPagePOM';

test('Traditional test', async ({ page }) => {

    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
    await page.locator('#password').click();
    await page.locator('#password').fill('edgewords123');
    await page.getByRole('link', { name: 'Submit' }).click();
    await expect(page.locator('h1')).toContainText('Add A Record To the Database');

 });


 test('POM based login', async({page})=>{
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const homePage = new HomePagePOM(page)
    await homePage.goLogin()
    const loginPage = new LoginPagePOM(page)
    // await loginPage.setUsername('edgewords')
    // await loginPage.setPassword('edgewords123')
    // await loginPage.submitForm()
    await loginPage.login('edgewords', 'edgewords123')
    
    const addRecordPage = new AddRecordPagePOM(page)
    await expect(addRecordPage.Heading).toHaveText('Add A Record To the Database') //Does retry against the element
    expect(await addRecordPage.getHeadingText()).toBe('Add A Record To the Database') //Did not retry against returned string
 })