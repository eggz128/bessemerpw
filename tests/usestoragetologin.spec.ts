import { expect, test } from '@playwright/test'

test.use({storageState: 'loggdinstoragestate.json'})

test('should be pre logged in after first run', async ({page}) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/sdocs/add_record.php')
})