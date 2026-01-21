import { Locator, Page } from "@playwright/test";
import { toKebabCase } from '../../helper.js'
export class BasePage {
        readonly page: Page
        readonly productTitle: Locator
        readonly productDescription: Locator
        readonly productPrice: Locator
        readonly shoppingCartBadge: Locator
        readonly itemContainer: Locator

        constructor(page: Page) {
                this.page = page
                this.productTitle = page.getByTestId('inventory-item-name');
                this.productDescription = page.getByTestId('inventory-item-desc');
                this.productPrice = page.getByTestId('inventory-item-price');
                this.shoppingCartBadge = page.getByTestId('shopping-cart-badge')
                this.itemContainer = page.getByTestId('inventory-item')

        }
        async findItemTitleByItemName(itemName: string) {
                return this.productTitle.filter({ hasText: itemName })
        }
        async findItemContainerByItemName(itemName: string) {
                return this.itemContainer.filter({ hasText: itemName })
        }
        async findThumbnailByItemName(itemName: string) {
                const convertItem = toKebabCase(itemName)
                return this.page.getByTestId(`inventory-item-${convertItem}-img`)
        }
        async addToCartByItemName(itemName: string) {
                const convertItem = toKebabCase(itemName)
                await this.page.getByTestId(`add-to-cart-${convertItem}`).click();
        }
        async removeCartByItemName(itemName: string) {
                const convertItem = toKebabCase(itemName)
                await this.page.getByTestId(`add-to-cart-${convertItem}`).click();
        }

        async goto() {
                await this.page.goto('/')
        }
        async gotoHome() {
                await this.page.goto('/inventory.html')
        }


}