import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

interface InformationType {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly backToHomeButton: Locator;
    readonly errorSpan: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.finishButton = page.getByTestId('finish');
        this.backToHomeButton = page.getByTestId('back-to-products');
        this.errorSpan = page.getByTestId('error-button');
    }


    async fillUserInformation(info: InformationType) {
        await this.firstName.fill(info.firstName);
        await this.lastName.fill(info.lastName);
        await this.postalCode.fill(info.postalCode);
    }

    async checkoutFirstScreenFlow(info: InformationType) {
        await this.fillUserInformation(info);
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
        await expect(this.page).toHaveURL('/checkout-complete.html');
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
        await expect(this.page.getByText(
            "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
        )).toBeVisible();
        await expect(this.shoppingCartBadge).not.toBeVisible();
        await this.backToHomeButton.click();
    }


    async assertFieldsAreNotEmpty(info: InformationType) {
        await expect(this.firstName).toHaveValue(info.firstName);
        await expect(this.lastName).toHaveValue(info.lastName);
        await expect(this.postalCode).toHaveValue(info.postalCode);
    }

    async assertCheckoutFormVisible() {
        await expect(this.firstName).toBeVisible();
        await expect(this.lastName).toBeVisible();
        await expect(this.postalCode).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    }

    async assertFieldsErrorMessage() {
        await expect(this.firstName).toHaveClass(/error/);
        await expect(this.lastName).toHaveClass(/error/);
        await expect(this.postalCode).toHaveClass(/error/);
        await expect(this.errorSpan).toBeVisible();
    }

    async assertCancelButtonRedirect() {
        await this.cancelCheckout();
        await expect(this.page).toHaveURL('/inventory.html');
    }
}
