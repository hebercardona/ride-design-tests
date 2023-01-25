import { Page, expect } from "@playwright/test";
import { testConfig } from "@testConfig";
import { Common } from "@framework/Common";

export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(url: string): Promise<void> {
        await this.page.goto(url);
        await expect((await this.page.request.get(url)).status(), `Url ${url} response was not successfull`).toBe(200);
    }

    async navigateToStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const url = Common.stringFormat(testConfig.currentYearUrls[brand], locale);
        await this.page.goto(url);
    }

    async navigateToPreviousYearStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const url = Common.stringFormat(testConfig.previousYearUrls[brand], locale, testConfig.previousYears[brand]);
        await this.page.goto(url);
    }
}