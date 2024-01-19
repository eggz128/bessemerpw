import { Locator, Page, expect } from '@playwright/test';

export class AddRecordPagePOM {

    //Locator fields

    Heading: Locator

    constructor(page: Page) {
        this.Heading = page.locator('h1')

    }

    //Service methods
    async getHeadingText(){
        return await this.Heading.textContent()
    }
}
