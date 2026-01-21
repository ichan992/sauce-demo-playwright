import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class HomePage extends BasePage {

    readonly productSortContainer: Locator
    constructor(page: Page) {
        super(page)
        this.productSortContainer = page.getByTestId('product-sort-container')
    }


    async sortByDesc(array: string[]) {

        const verifySort = array.sort((a, b) => b.localeCompare(a));
        expect(verifySort).toEqual(array)
    }
    async sortByAsc(array: string[]) {

        const verifySort = array.sort((a, b) => a.localeCompare(b));
        expect(verifySort).toEqual(array)
    }
    async sortbyLowToHigh(array: string[]) {
        const price: number[] = array.map((number) => {
            return Number(number.replace('$', ''))
        })
        const verifySort = price.sort((a, b) => a - b)
        expect(price).toEqual(verifySort);
    }
    async sortbyHighToLow(array: string[]) {
        const price: number[] = array.map((number) => {
            return Number(number.replace('$', ''))
        })
        const verifySort = price.sort((a, b) => b - a)
        expect(price).toEqual(verifySort);
    }

    async assertSortByDesc(array: string[]) {
        const verifySort = [...array].sort((a, b) => b.localeCompare(a))
        expect(array).toEqual(verifySort)
    }

    async assertSortByAsc(array: string[]) {
        const verifySort = [...array].sort((a, b) => a.localeCompare(b))
        expect(array).toEqual(verifySort)
    }

    async assertSortByLowToHigh(array: string[]) {
        const price = array.map((num) => Number(num.replace('$', '')))
        const verifySort = [...price].sort((a, b) => a - b)
        expect(price).toEqual(verifySort)
    }

    async assertSortByHighToLow(array: string[]) {
        const price = array.map((num) => Number(num.replace('$', '')))
        const verifySort = [...price].sort((a, b) => b - a)
        expect(price).toEqual(verifySort)
    }
    async addItemToCart(itemName: string) {
        await this.addToCartByItemName(itemName);
        await expect(this.shoppingCartBadge).toHaveText('1');
        const container = await this.findItemContainerByItemName(itemName);
        const removeButton = container.getByText('Remove');
        await expect(removeButton).toBeVisible();
        return { container, removeButton };
    }

    async removeItemFromCart(itemName: string) {
        const { container, removeButton } = await this.addItemToCart(itemName);
        const addToCartButton = container.getByText('Add to cart');
        await removeButton.click();
        await expect(this.shoppingCartBadge).not.toBeVisible();
        await expect(removeButton).not.toBeVisible();
        await expect(addToCartButton).toBeVisible();
    }

    async assertRedirectToProductDetailsByTitle(itemName: string) {
        const product = await this.findItemTitleByItemName(itemName);
        await product.click();
        await expect(this.page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
        await expect(this.page.getByText(itemName)).toBeVisible();
    }

    async assertRedirectToProductDetailsByThumbnail(itemName: string) {
        const product = await this.findThumbnailByItemName(itemName);
        await product.click();
        await expect(this.page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
        await expect(this.page.getByText(itemName)).toBeVisible();
    }


}