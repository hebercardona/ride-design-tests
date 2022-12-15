import { Page } from "@playwright/test";
import { BuildPage } from "./buildPage";

export class BuildPages {
    readonly page: Page;
    readonly build: BuildPage;

    constructor(page: Page) {
        this.page = page;
        this.build = new BuildPage(this.page);
    }


}