import type { Page } from "@playwright/test";
import { testConfig } from "@testConfig/*";

export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigatoToUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToStartingBuildUrl(brand: string): Promise<void> {
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
        await this.page.goto(urls[brand]);
    }
}