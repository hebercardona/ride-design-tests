import { WebActions } from "@framework/WebActions";
import { ConfirmationPageObjects } from "@objects/ConfirmationPageObjects";
import { Locator, Page, expect } from "@playwright/test";
import { CarouselProduct } from "./Carousel";

let webActions: WebActions;

type Product = {
    name: string,
    price: string,
    id: string
}

type Collection = {
    name: string,
    price: string
}

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

    async getProducts(): Promise<Product[]> {
        await this.page.locator(ConfirmationPageObjects.ADDED_ACCESSORIES_CONTAINER).scrollIntoViewIfNeeded();
        const productItems = await webActions.getElements(ConfirmationPageObjects.SUMMARY_PRODUCT_ITEMS);

        const products = await Promise.all(productItems.map(async (x) => {
            const product: Product = await {
                name: await x.locator(ConfirmationPageObjects.PRODUCT_NAME)?.innerText(),
                price: await x.locator(ConfirmationPageObjects.PRODUCT_PRICE)?.innerText(),
                id: await x.locator(ConfirmationPageObjects.PRODUCT_ID)?.innerText()
            }
            return product;
        }));
        return products;
    }

    async verifyIfProductPresent(carouselProduct: CarouselProduct): Promise<boolean> {
        await this.page.locator(ConfirmationPageObjects.ADDED_ACCESSORIES_CONTAINER).nth(0).scrollIntoViewIfNeeded();
        let productContainer = await webActions.getElementThatHasTextInChildElement(ConfirmationPageObjects.SUMMARY_PRODUCT_ITEMS, carouselProduct.title);
        if(await productContainer.count() < 1) {
            productContainer = await webActions.getElementThatHasTextInChildElement(ConfirmationPageObjects.SUMMARY_KITS, carouselProduct.title);
        }
        expect(await productContainer.count(), `Product ${carouselProduct.title} not found on confirmation page`).toBeGreaterThan(0);
        const product: Product = await {
            name: await productContainer.locator(ConfirmationPageObjects.PRODUCT_NAME).first()?.innerText(),
            price: await productContainer.locator(ConfirmationPageObjects.PRODUCT_PRICE).first()?.innerText(),
            id: await productContainer.locator(ConfirmationPage.PRODUCT_ID).first()?.innerText()
        };
        
        if(productContainer && product.id.includes(carouselProduct.id)) {
            return true;
        }
        return false;
    }

    async verifyDuplicateItems(): Promise<boolean> {
        await this.page.locator(ConfirmationPageObjects.ADDED_ACCESSORIES_CONTAINER).nth(0).scrollIntoViewIfNeeded();
        const products = await webActions.getElements(ConfirmationPageObjects.SUMMARY_PRODUCT_ITEMS);
        const productNames = products.map(x => x.locator(ConfirmationPageObjects.PRODUCT_NAME));
        return new Set(productNames).size !== productNames.length;
    }

    async verifyBuildItemsPresentOnConfirmation(itemTitles: string[]): Promise<void> {
        const confirmationPageItemsTitles = await webActions.getInnerTextFromElements(ConfirmationPageObjects.PRODUCT_NAME);
        const allItemsPresent = itemTitles.every(async item => confirmationPageItemsTitles.includes(item));
        expect(allItemsPresent, 'Missing items on confirmation page').toBeTruthy();
    }
}