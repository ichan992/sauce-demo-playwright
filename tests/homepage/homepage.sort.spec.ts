import { expect } from '@playwright/test'
import { test } from 'fixtures/base.fixtures'

test.describe('HomePage -> Product Sort', () => {

    test.beforeEach(async ({ page, home }) => {
        await home.gotoHome()
        await expect(page).toHaveURL('/inventory.html')
    })

    test('should sort to descending order', async ({ home }) => {
        const original = await home.productTitle.allTextContents()
        await home.productSortContainer.selectOption('za')
        const sorted = await home.productTitle.allTextContents()

        expect(original).not.toEqual(sorted)
        await home.assertSortByDesc(sorted)
    })

    test('should sort to ascending order', async ({ home }) => {
        await home.productSortContainer.selectOption('za')
        const original = await home.productTitle.allTextContents()
        await home.productSortContainer.selectOption('az')
        const sorted = await home.productTitle.allTextContents()

        expect(original).not.toEqual(sorted)
        await home.assertSortByAsc(sorted)
    })

    test('should sort from low to high price', async ({ home }) => {
        const original = await home.productPrice.allTextContents()
        await home.productSortContainer.selectOption('lohi')
        const sorted = await home.productPrice.allTextContents()

        expect(original).not.toEqual(sorted)
        await home.assertSortByLowToHigh(sorted)
    })

    test('should sort from high to low price', async ({ home }) => {
        const original = await home.productPrice.allTextContents()
        await home.productSortContainer.selectOption('hilo')
        const sorted = await home.productPrice.allTextContents()

        expect(original).not.toEqual(sorted)
        await home.assertSortByHighToLow(sorted)
    })
})