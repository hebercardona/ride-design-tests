import { Locator, Page } from "@playwright/test";


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
    }

    async clickElementThatHasText(locator: string, text: string): Promise<void> {
        let element = await this.page.locator(locator, {hasText: text});
        await element.click();
    }

    async clickElementThatHasTextInChildElement(locator: string, text: string): Promise<void> {
        let element = await this.page.locator(locator, {has: this.page.locator(`text='${text}'`)});
        await element.click();
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text);
    }

   async waitForElementGone(locator: string): Promise<void> {
    await this.page.locator(locator)
   }

   async getLocatorElement(locator: string): Promise<Locator> {
    return await this.page.locator(locator);
   }
}