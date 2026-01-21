import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";


export class ProductDetail extends BasePage {

    readonly addToCartButton: Locator
    readonly removeToCartButton: Locator
    readonly redirectBackHomeButton: Locator
    constructor(page: Page) {
        super(page)

        this.addToCartButton = page.getByTestId('add-to-cart')
        this.removeToCartButton = page.getByTestId('remove')
        this.redirectBackHomeButton = page.getByTestId('back-to-products');

    }
    async AddToCart() {
        this.addToCartButton.click()
    }
    async RemoveToCart() {
        this.removeToCartButton.click()
    }
    async backHome() {
        this.redirectBackHomeButton.click()
    }
    async addToCart() {
        await this.addToCartButton.click()
    }

    async removeFromCart() {
        await this.removeToCartButton.click()
    }


    async assertItemAddedToCart() {
        await expect(this.shoppingCartBadge).toHaveText('1')
        await expect(this.removeToCartButton).toBeVisible()
    }

    async assertItemRemovedFromCart() {
        await expect(this.shoppingCartBadge).not.toBeVisible()
        await expect(this.removeToCartButton).not.toBeVisible()
    }

}