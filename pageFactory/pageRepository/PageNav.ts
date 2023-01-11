import type { Page } from "@playwright/test";
import { testConfig } from "@testConfig/*";
import { StringFormat } from "@framework/Common";

export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigatoToUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const urls = {
            'rzr': testConfig.currentYearUrls.rzr,
            'rgr': testConfig.currentYearUrls.rgr,
            'grl': testConfig.currentYearUrls.grl,
            'atv': testConfig.currentYearUrls.atv,
            'ind': testConfig.currentYearUrls.ind,
            'slg': testConfig.currentYearUrls.slg,
            'sno': testConfig.currentYearUrls.sno,
            'cmv': testConfig.currentYearUrls.cmv,
            'mil': testConfig.currentYearUrls.mil,
            'ben': testConfig.currentYearUrls.ben,
            'hur': testConfig.currentYearUrls.hur,
            'gdy': testConfig.currentYearUrls.gdy
        }
        const url = StringFormat(urls[brand], locale);
        await this.page.goto(url);
    }

    async navigateToPreviousYearStartingBuildUrl(brand: string, locale: string = `en-us`): Promise<void> {
        const urls = {
            'rzr': testConfig.previousYearUrls.rzr,
            'rgr': testConfig.previousYearUrls.rgr,
            'grl': testConfig.previousYearUrls.grl,
            'atv': testConfig.previousYearUrls.atv,
            'ind': testConfig.previousYearUrls.ind,
            'slg': testConfig.previousYearUrls.slg,
            'sno': testConfig.previousYearUrls.sno,
        }
        const url = StringFormat(urls[brand], locale, testConfig.previousYears[brand]);
        await this.page.goto(url);
    }
}