import { WebActions } from "@framework/WebActions";
import { ModalDialogObjects } from "@objects/ModalDialogObjects";
import { Page } from "@playwright/test";
let webActions: WebActions

export class ModalDialogs extends ModalDialogObjects {
    readonly page: Page;
    
    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async isPrpDisplayed(): Promise<boolean> {
        return await this.page.locator(ModalDialogObjects.PRP_DIALOG).isVisible();
    }

    async clickPrpPrimaryPartRemove(): Promise<void> {
        await webActions.clickElement(ModalDialogObjects.PRP_PRIMARY_PART_REMOVE);
    }

    async clickPurposePromptNewVehicle(): Promise<void> {
        if(await webActions.isElementVisible(ModalDialogObjects.PURPOSE_PROMPT_DIALOG)) {
            await webActions.clickElement(ModalDialogObjects.PURPOSE_PROMPT_NEW);
        }
    }
}