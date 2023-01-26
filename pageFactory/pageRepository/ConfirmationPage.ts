import { WebActions } from "@framework/WebActions";
import { ConfirmationPageObjects } from "@objects/ConfirmationPageObjects";
import { Page } from "@playwright/test";

let webActions: WebActions;

export class ConfirmationPage extends ConfirmationPageObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getMsrp(): Promise<string> {
        const msrp = await webActions.getElementInnerText(ConfirmationPageObjects.MSRP);
        return msrp;
    }

    async getAccessoriesTotal(): Promise<string> {
        const accessoriesTotal = await webActions.getElementInnerText(ConfirmationPageObjects.ACCESSORIES_PRICE_TOTAL);
        return accessoriesTotal;
    }

    async getTotalPrice(): Promise<string> {
        const totalPrice = await webActions.getElementInnerText(ConfirmationPageObjects.TOTAL_PRICE);
        return totalPrice;
    }

    async getModelId(): Promise<string> {
        const modelId = await webActions.getElement(ConfirmationPageObjects.CONFIRMATION_SUMMARY_CONTAINER);
        return await modelId.getAttribute('data-model-id');
    }
}