import { test, expect } from '@playwright/test';
//needs EdgeApiServer.exe from https://github.com/edgewords/EdgeAPIserver/releases/tag/1.0
const baseUrl = 'http://127.0.0.1:2002/api' //ip wont work - use localhost instead
test('An API test', async ({ request }) => {
    const resp = await request.get(baseUrl + '/products/1');
    // await expect(resp.status()).toEqual(200);
    // if (!resp.ok) { //Mistake in slide - we cant reach this if expect fails
    //     console.log("uh oh " + resp.statusText)
    // }
    try {
        await expect(resp.status()).toEqual(200)
    } catch (error) {
        console.log("uh oh " + await resp.statusText())
        throw error
    }
});