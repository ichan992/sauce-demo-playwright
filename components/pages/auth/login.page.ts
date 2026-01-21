import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly errorSpan: Locator
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.emailField = page.locator('#user-name')
        this.passwordField = page.locator('#password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorSpan = page.getByTestId('error')
    }


    async goto() {
        await this.page.goto('/')
    }


    async login(username: string, password: string) {
        await this.emailField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }

    async fillUsername(username: string) {
        await this.emailField.fill(username)
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password)
    }


    async assertLoginError(expectedText: string) {
        await expect(this.errorSpan).toHaveText(expectedText)
    }

    async assertLoginSuccessful() {
        await expect(this.page.getByText('Products')).toBeVisible()
    }
}
