import type { Page } from "@playwright/test";
import { testConfig } from "@testConfig";
import { StringFormat } from "@framework/Common";

export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const url = StringFormat(testConfig.currentYearUrls[brand], locale);
        await this.page.goto(url);
    }

    async navigateToPreviousYearStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const url = StringFormat(testConfig.previousYearUrls[brand], locale, testConfig.previousYears[brand]);
        await this.page.goto(url);
    }
}