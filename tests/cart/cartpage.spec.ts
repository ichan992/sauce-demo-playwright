import { test } from 'fixtures/base.fixtures';
import { addCartItems } from 'helper';
import { expect } from '@playwright/test';

test.describe('Cart', () => {

    test.beforeEach(async ({ home, cart, page }) => {
        await home.gotoHome()
        await expect(page).toHaveURL('/inventory.html')

        // Add items to cart
        for (const item of addCartItems) {
            await cart.addToCartByItemName(item)
        }

        await cart.goToCart()
    })

    test('should have complete UI elements', async ({ cart }) => {
        await cart.assertUIElementsVisible()
    })

    test('should be able to remove items from cart', async ({ cart }) => {
        await cart.removeItem(addCartItems[2])
    })

    test('should be able to go back to homepage', async ({ cart, page }) => {
        await cart.continueShopping()
        await expect(page).toHaveURL('/inventory.html')
    })

    test('should redirect to step 1 checkout page', async ({ cart, page }) => {
        await cart.goCheckout()
        await expect(page).toHaveURL('/checkout-step-one.html')
    })
})