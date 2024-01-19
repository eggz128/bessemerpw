import { Locator, Page } from '@playwright/test';

export class HomePagePOM {

    //Locator fields
    #LoginLink: Locator


    constructor(page: Page) {
        this.#LoginLink = page.getByRole('link', { name: 'Login To Restricted Area' })
    }

    //Service methods
    async goLogin(){await this.#LoginLink.click()}
}

