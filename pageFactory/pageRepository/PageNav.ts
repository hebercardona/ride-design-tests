import type { Page } from "@playwright/test";

const currentYearUrls = {
    orv: `https://www-qa.polarisindcms.com/en-us/off-road/rzr/build-model`
};



export class PageNav {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigatoToUrl(url: string) {
        await this.page.goto(url);
    }
}