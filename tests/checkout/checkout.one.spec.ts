import { expect } from '@playwright/test'
import { test } from 'fixtures/base.fixtures'


const addCartItems = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)']

test.describe('Checkout : first step ', () => {
    test.beforeEach(async ({ page, cart, home }) => {
        await home.gotoHome()
        await expect(page).toHaveURL('/inventory.html')
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
        for (const item of addCartItems) {
            await cart.addToCartByItemName(item);
        }
        await cart.goCart()
        await cart.goCheckout()
    })
    test('should have complete UI elements', async ({ checkout }) => {
        await checkout.assertCheckoutFormVisible()
    })

    test('should be able to fill checkout information', async ({ page, checkout }) => {
        const information = {
            firstName: 'Mark',
            lastName: 'lastname',
            postalCode: '4102'
        }
        await checkout.fillUserInformation(information)
        await checkout.assertFieldsAreNotEmpty(information)
    })
    test('should be able to go back to homepage after clicking cancel', async ({ page, checkout }) => {
        checkout.cancelCheckout()
        await expect(page).toHaveURL('/cart.html')
    })
    test('should display error message and error borders', async ({ checkout }) => {
        await checkout.continueButton.click()
        await checkout.assertFieldsErrorMessage()
    })
})