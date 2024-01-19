import { expect } from '@playwright/test';
import { HomePagePOM } from './pompages/HomePagePOM';
import { LoginPagePOM } from './pompages/LoginPagePOM';
import { AddRecordPagePOM } from './pompages/AddRecordPagePOM';
import allTestData from './test-data/data.json'
import { test } from './my-base-test.ts'

for (const indvTestData of allTestData) {

    test('POM based login with ' + indvTestData.username, async ({ page }) => {
        await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
        const homePage = new HomePagePOM(page)
        await homePage.goLogin()
        const loginPage = new LoginPagePOM(page)
        await loginPage.setUsername(indvTestData.username)
        await loginPage.setPassword(indvTestData.password)
        await loginPage.submitForm()
        const addRecordPage = new AddRecordPagePOM(page)
        await expect(addRecordPage.Heading).toHaveText('Add A Record To the Database') //Does retry against the element
        expect(await addRecordPage.getHeadingText()).toBe('Add A Record To the Database') //Did not retry against returned string
    })
}

test('paramiterised project', async({page , person})=>{
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const homePage = new HomePagePOM(page)
    await homePage.goLogin()
    const loginPage = new LoginPagePOM(page)
    await loginPage.setUsername(person)
})

