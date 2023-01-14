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
}