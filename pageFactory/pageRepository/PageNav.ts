import { Page, expect } from "@playwright/test";
import { testConfig } from "@testConfig";
import { Common } from "@framework/Common";
import { Brands } from "@framework/Brands";

export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(url: string): Promise<void> {
        expect((await this.page.request.get(url)).status(), `Url ${url} Validate response status`).toBe(200);
        await this.page.goto(url);
    }

    async navigateToStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        let url = Common.stringFormat(testConfig.currentYearUrls[brand], locale);
        if(brand === Brands.ind && !(testConfig.domesticLocales.ind.includes(locale))) {
            url = url.replace('category','model');
        }
        expect((await this.page.request.get(url)).status(), `Url ${url} Validate response status`).toBe(200);
        await this.page.goto(url);
    }

    async navigateToPreviousYearStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        let url = Common.stringFormat(testConfig.previousYearUrls[brand], locale, testConfig.previousYears[brand]);
        if(brand === Brands.ind && !(testConfig.domesticLocales.ind.includes(locale))) {
            url = url.replace('category','model');
        }
        expect((await this.page.request.get(url)).status(), `Url ${url} Validate response status`).toBe(200);
        await this.page.goto(url);
    }
}