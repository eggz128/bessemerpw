import { Locator, Page } from '@playwright/test';

export class LoginPagePOM {

    //Locator fields
    #usernameField: Locator
    #passwordField: Locator
    #submitButton: Locator


    constructor(page: Page) {
        this.#usernameField = page.getByRole('row', { name: 'User Name?' }).locator('#username')
        this.#passwordField = page.locator('#password')
        this.#submitButton = page.getByRole('link', { name: 'Submit' })
    }

    //Service methods
    async setUsername(username: string) { await this.#usernameField.pressSequentially(username, {delay: 100}) }
    async setPassword(password: string) { await this.#passwordField.fill(password) }
    async submitForm() { await this.#submitButton.click() }

    //Higher level service methd

    async login(username: string, password: string) {
        await this.setUsername(username)
        await this.setPassword(password)
        await this.submitForm()
    }



}