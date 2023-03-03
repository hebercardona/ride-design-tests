import { BuildPage } from "./BuildPage";
import { QuotePage } from "./QuotePage";
import { Page  } from '@playwright/test';
import { PageNav } from './PageNav';
import { ConfirmationPage } from "./ConfirmationPage";

type errorType = {
    message: string,
    url: string
}

export type pages = {
    page: Page,
    build: BuildPage,
    quote: QuotePage,
    navigation: PageNav,
    confirmation: ConfirmationPage;
    pageConsoleErrors: {message: string, url: string}[];
};


export class BasePage {
    readonly page: Page;
    readonly pages = {} as pages;
    pageConsoleErrors: errorType[] = [];


    constructor(page: Page) {
        this.page = page;
        this.pages.page = page;
        this.pages.build = new BuildPage(this.page);
        this.pages.quote = new QuotePage(this.page);
        this.pages.navigation = new PageNav(this.page);
        this.pages.confirmation = new ConfirmationPage(this.page);
        this.pages.pageConsoleErrors = this.pageConsoleErrors;
    }
}