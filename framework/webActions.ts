import { Page } from "@playwright/test";


export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async clickElement(locator: string): Promise<void> {
        await this.page.click(locator);
        await this.page.waitForLoadState('networkidle');

    }

    async clickAnyElement(locator: string): Promise<void> {
        let elements = await this.page.locator(locator);
        let rndElement =  Math.floor(Math.random() * await elements.count());
        await elements.nth(rndElement).click();
        await this.page.waitForLoadState('networkidle');
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text);
    }

   async waitForElementGone(locator: string) {
    await this.page.locator(locator)
   }
}