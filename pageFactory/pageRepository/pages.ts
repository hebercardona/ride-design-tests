import { BuildPage } from "./buildPage";
import { LoginPage } from "./LoginPage";
import { QuotePage } from "./quotePage";
import { Page  } from '@playwright/test';
import { PageNav } from './PageNav'
import { BuildPages } from "./buildPages";


type pages = {
    login: LoginPage,
    build: BuildPage,
    quote: QuotePage,
    navigation: PageNav,
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
        this.pages.navigation = new PageNav(this.page);
        this.pages.buildPages = new BuildPages(this.page);
    }
}