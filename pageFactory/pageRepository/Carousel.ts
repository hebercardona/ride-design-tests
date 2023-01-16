import { WebActions } from "@framework/WebActions";
import { CarouselObjects } from "@objects/CarouselObjects";
import { Locator, Page } from "@playwright/test";

let webActions: WebActions;

type Product = {
    title: string,
    price: string,
    seeDetails: Locator,
    cta: Locator
}

export class Carousel extends CarouselObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getCategories(): Promise<string[]> {
        let categories: string[] = [];
        const categoryHandles = await this.page.locator(CarouselObjects.CATEGORIES);
        if(categoryHandles) {
            for (const category of await categoryHandles.elementHandles()) {
                categories.push(await category.innerText());
            }
        }
        return categories;
    }

    async clickCategoryByName(categoryName: string): Promise<void> {
        await webActions.clickElementThatHasText(CarouselObjects.CATEGORIES, categoryName);
    }

    async clickAnyCategory(): Promise<void> {
        await webActions.clickAnyElement(CarouselObjects.CATEGORIES);
    }

    async clickSubcategoryByName(subcategoryName: string): Promise<void> {
        await webActions.clickElementThatHasText(CarouselObjects.SUBCATEGORIES, subcategoryName);
    }

    async clickAnySubcategory(): Promise<void> {
        await webActions.clickAnyElement(CarouselObjects.SUBCATEGORIES);
    }

    async clickAccessoryCtaByName(accessoryName: string): Promise<void> {
        await webActions.clickElement(CarouselObjects.PRODUCT_CTA_BY_NAME(accessoryName));
    }

    async getAccessoryItem():Promise<Product> {
        const accessoryItems = await webActions.getLocatorElement(CarouselObjects.PRODUCT_ITEM);
        const acc = await accessoryItems.filter({has: this.page.locator(`text='Add'`)}).first();
        const product: Product = await {
            title: await acc.locator(CarouselObjects.PRODUCT_TITLE)?.textContent(),
            price: await acc.locator(CarouselObjects.PRODUCT_PRICE)?.innerText(),
            seeDetails: await acc.locator(CarouselObjects.SEE_DETAILS),
            cta: await acc.locator(CarouselObjects.PRODUCT_CTA)
        };
        return product;
    }
}