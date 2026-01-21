import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class CartPage extends BasePage {
    readonly continueToShoppingButton: Locator
    readonly productSortContainer: Locator
    readonly checkoutButton: Locator
    constructor(page: Page) {
        super(page)
        this.productSortContainer = page.getByTestId('product-sort-container')
        this.continueToShoppingButton = page.getByTestId('continue-shopping')
        this.checkoutButton = page.getByTestId('checkout')
    }
    async goCart() {
        await this.page.goto('/cart.html')
    }
    async clickContinueShoppingRedirect() {
        await this.continueToShoppingButton.click()
    }
    async goCheckout() {
        await this.checkoutButton.click()
    }
    async goToCart() {
        await this.page.goto('/cart.html')
    }

    async continueShopping() {
        await this.continueToShoppingButton.click()
    }

    async removeItem(itemName: string) {
        const container = await this.findItemContainerByItemName(itemName)
        const removeButton = container.getByText('Remove')
        await removeButton.click()
        await expect(container).toHaveCount(0)
    }

    async assertUIElementsVisible() {
        await expect(this.page.getByText('QTY')).toBeVisible()
        await expect(this.page.getByText('Description')).toBeVisible()
        await expect(this.page.getByText('Your Cart')).toBeVisible()
        await expect(this.continueToShoppingButton).toBeVisible()
        await expect(this.checkoutButton).toBeVisible()
    }


}