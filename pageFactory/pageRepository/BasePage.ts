import { BuildPage } from "./BuildPage";
import { Login } from "./Login";
import { QuotePage } from "./QuotePage";
import { Page  } from '@playwright/test';
import { PageNav } from './PageNav';
import { UISteps } from "@commonActions/UISteps";

type errorType = {
    message: string,
    url: string
}

type pages = {
    page: Page,
    login: Login,
    build: BuildPage,
    quote: QuotePage,
    navigation: PageNav,
    uiSteps: UISteps,
    pageConsoleErrors: {message: string, url: string}[];
};


export class BasePage {
    readonly page: Page;
    readonly pages = {} as pages;
    pageConsoleErrors: errorType[] = [];


    constructor(page: Page) {
        this.page = page;
        this.pages.page = page;
        this.pages.login = new Login(this.page);
        this.pages.build = new BuildPage(this.page);
        this.pages.quote = new QuotePage(this.page);
        this.pages.navigation = new PageNav(this.page);
        this.pages.uiSteps = new UISteps(this.page);
        this.pages.pageConsoleErrors = this.pageConsoleErrors;
    }
}