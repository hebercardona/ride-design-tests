import { WebActions } from "@framework/WebActions";
import { ConfirmationPageObjects } from "@objects/ConfirmationPageObjects";
import { Locator, Page } from "@playwright/test";
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

    async verifyIfProductPresent(product: CarouselProduct): Promise<boolean> {
        const confirmationAddedProducts = await this.getProducts();
        for (const item of confirmationAddedProducts) {
            if(item.id.includes(product.id) 
            && item.name.includes(product.title) 
            && item.price.includes(product.price)) {
                return true;
            }
        }
        return false;
    }

    async verifyDuplicateItems(): Promise<boolean> {
        const confirmationAddedProducts = await this.getProducts();
        const productIds = confirmationAddedProducts.map(x => x.id);
        return new Set(productIds).size !== productIds.length;
    }
}