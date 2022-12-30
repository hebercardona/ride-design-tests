import { WebActions } from "@framework/WebActions";
import { HeaderObjects } from "@objects/HeaderObjects";
import { Page } from "@playwright/test";

let webActions: WebActions;

export class Header extends HeaderObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async clickModelsNavigationItem(): Promise<void> {
        await webActions.clickElementThatHasTextInChildElement(HeaderObjects.MODELS_NAV_ITEM, 'Models');
    }
}