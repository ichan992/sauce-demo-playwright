import { expect } from '@playwright/test'
import { test } from 'fixtures/base.fixtures'
import { userInformation } from 'helper'


const addCartItems = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)']

test.describe('Checkout : first step ', () => {
    test.beforeEach(async ({ login, page, cart, home, checkout }) => {
        await home.gotoHome()
        await expect(page).toHaveURL('/inventory.html')
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
        for (const item of addCartItems) {
            await cart.addToCartByItemName(item);
        }
        await cart.goCart()
        await cart.goCheckout()
        await expect(page).toHaveURL('/checkout-step-one.html')
        await checkout.checkoutFirstScreenFlow(userInformation);
        await expect(page).toHaveURL('/checkout-step-two.html')
    })
    test('should have complete UI elements', async ({ page, cart }) => {
        await expect(page.getByText('Payment Information:')).toBeVisible()
        await expect(page.getByText('Shipping Information:')).toBeVisible()
        await expect(page.getByText('Price Total')).toBeVisible()
        await expect(page.getByText('Cancel')).toBeVisible()
        await expect(page.getByText('Finish')).toBeVisible()
        await expect(page.getByText('QTY')).toBeVisible()
        await expect(page.getByText('Description')).toBeVisible()
    })
    test('should redirect to inventory page on title click', async ({ checkout, home }) => {
        await home.assertRedirectToProductDetailsByTitle(addCartItems[0])

    })

    test('should be able to cancel using button', async ({ page, checkout }) => {
        await checkout.assertCancelButtonRedirect()
    })
    test('should be able to checkout', async ({ page, checkout }) => {

        await checkout.finishCheckout()
    })

})