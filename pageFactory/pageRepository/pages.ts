import { BuildPage } from "./buildPage";
import { LoginPage } from "./loginPage";
import { QuotePage } from "./quotePage";
import { Page  } from '@playwright/test';
import { Navigation } from './navigation'
import { BuildPages } from "./buildPages";


type pages = {
    login: LoginPage,
    build: BuildPage,
    quote: QuotePage,
    navigation: Navigation,
    buildPages: BuildPages
};

export class Pages {
    readonly page: Page;
    readonly pages = {} as pages;
    


    constructor(page: Page) {
        this.page = page;
        this.pages.login = new LoginPage(this.page);
        this.pages.build = new BuildPage(this.page);
        this.pages.quote = new QuotePage(this.page);
        this.pages.navigation = new Navigation(this.page);
        this.pages.buildPages = new BuildPages(this.page);
    }
}