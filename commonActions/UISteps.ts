import { Page, expect } from "@playwright/test";
import { WebActions } from "@framework/WebActions";
import { BuildPage } from "@pages/BuildPage";
let webActions;

export class UISteps {
    readonly page: Page;
    readonly buildPages: BuildPage;
    constructor(page: Page) {
        this.page = page;
        this.buildPages = new BuildPage(page);
        webActions = new WebActions(this.page);
    }

    async modelSelectionToAccessoriesPage(brand: string): Promise<void> {
        await this.buildPages.clickAnySeatCategory();
        await this.buildPages.clickAnyModelCategory();
        await this.buildPages.clickAnyTrim();
        await this.buildPages.clickColorPageNextBtn();
    }

    async openBuildSummaryAndClickImFinished(): Promise<void> {
        await this.buildPages.openSummary();
        await this.buildPages.clickIamFinishedBtn();
    }
}