import { test as base } from "@playwright/test";
import { LoginPage } from "components/pages/auth/login.page";
import { CartPage } from "components/pages/cart/cart.page";
import { CheckoutPage } from "components/pages/checkout/checkout.page";
import { HomePage } from "components/pages/homepage/homepage.page";
import { ProductDetail } from "components/pages/productdetail/productdetail.page";

interface Pages {
    home: HomePage
    login: LoginPage
    productDetails: ProductDetail
    cart: CartPage
    checkout: CheckoutPage
}
export const test = base.extend<Pages>({
    home: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    login: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    productDetails: async ({ page }, use) => {
        await use(new ProductDetail(page))
    },
    cart: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    checkout: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    }
    

})