import { BuildPage } from "./BuildPage";
import { LoginPage } from "./LoginPage";
import { QuotePage } from "./QuotePage";
import { Page  } from '@playwright/test';
import { PageNav } from './PageNav';


type pages = {
    login: LoginPage,
    build: BuildPage,
    quote: QuotePage,
    navigation: PageNav
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
    }
}