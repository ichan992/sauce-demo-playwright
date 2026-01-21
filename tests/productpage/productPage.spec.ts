import { test } from 'fixtures/base.fixtures';
import { expect } from '@playwright/test';

test.describe('Product Details', () => {

    test.beforeEach(async ({ page, home }) => {
        await home.gotoHome()
        await expect(page).toHaveURL('/inventory.html');

        // Navigate to product details
        await (await home.findItemTitleByItemName('Sauce Labs Backpack')).click()
    })

    test('should add item to cart', async ({ productDetails }) => {
        await productDetails.addToCart()
        await productDetails.assertItemAddedToCart()
    })

    test('should remove item from cart', async ({ productDetails }) => {
        await productDetails.addToCart()
        await productDetails.assertItemAddedToCart()

        await productDetails.removeFromCart()
        await productDetails.assertItemRemovedFromCart()
    })

    test('should redirect back to home', async ({ page, productDetails }) => {
        await productDetails.backHome()
        await expect(page).toHaveURL('/inventory.html')
    })
})
