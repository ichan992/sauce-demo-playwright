import { test } from 'fixtures/base.fixtures';
import { expect } from '@playwright/test';

const loginCreds = {
    username: 'standard_user',
    password: 'secret_sauce',
};

test.describe('Homepage -> Product Card', () => {

    test.beforeEach(async ({ home, page }) => {
        await home.gotoHome();
        await expect(page).toHaveURL('/inventory.html');
    });

    test('should add to cart in homepage', async ({ home }) => {
        await home.addItemToCart('Test.allTheThings() T-Shirt (Red)');
    });

    test('should remove from cart in homepage', async ({ home }) => {
        await home.removeItemFromCart('Test.allTheThings() T-Shirt (Red)');
    });

    test('should redirect to product details on title click', async ({ home }) => {
        await home.assertRedirectToProductDetailsByTitle('Test.allTheThings() T-Shirt (Red)');
    });

    test('should redirect to product details on thumbnail click', async ({ home }) => {
        await home.assertRedirectToProductDetailsByThumbnail('Sauce Labs Bike Light');
    });

});