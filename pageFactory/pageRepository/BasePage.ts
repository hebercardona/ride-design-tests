import { BuildPage } from "./BuildPage";
import { LoginPage } from "./LoginPage";
import { QuotePage } from "./QuotePage";
import { Page  } from '@playwright/test';
import { PageNav } from './PageNav';
import { UISteps } from "@commonActions/UISteps";


type pages = {
    page: Page,
    login: LoginPage,
    build: BuildPage,
    quote: QuotePage,
    navigation: PageNav,
    uiSteps: UISteps,
    pageConsoleErrors: string[]
};


export class BasePage {
    readonly page: Page;
    readonly pages = {} as pages;
    pageConsoleErrors = [];
    readonly buildPage: BuildPage;


    constructor(page: Page) {
        this.page = page;
        this.pages.page = page;
        this.pages.login = new LoginPage(this.page);
        this.pages.build = new BuildPage(this.page);
        this.pages.quote = new QuotePage(this.page);
        this.pages.navigation = new PageNav(this.page);
        this.pages.uiSteps = new UISteps(this.page);
        this.pages.pageConsoleErrors = this.pageConsoleErrors;
        this.buildPage = new BuildPage(page);
    }
}