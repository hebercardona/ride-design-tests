import { WebActions } from "@framework/WebActions";
import { CarouselObjects } from "@objects/CarouselObjects";
import { Page } from "@playwright/test";

let webActions: WebActions;

export class Carousel extends CarouselObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getCategories(): Promise<void> {
        const category = await this.page.locator(CarouselObjects.CATEGORIES).first();
        await category.click();
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
        await webActions.clickElement(CarouselObjects.ACCESSORY_CTA(accessoryName));
    }
}