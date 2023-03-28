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

    async clickPrpRequiredPartAddIfNeeded(): Promise<void> {
        
        while(await this.isPrpDisplayed()) {
            if(await webActions.isElementVisible(ModalDialogObjects.PRP_REQUIRED_ITEM_ADD)) {
                await webActions.clickElement(ModalDialogObjects.PRP_REQUIRED_ITEM_ADD);
            } else if(await webActions.isElementVisible(ModalDialogObjects.PRP_GRANDPARENT_CONTINUE_BTN)) {
                await webActions.clickElement(ModalDialogObjects.PRP_GRANDPARENT_CONTINUE_BTN);
            }
        }
    }

    async isNoModelDialogPresent(): Promise<boolean> {
        return await webActions.isElementVisible(ModalDialogObjects.NO_MODEL_DIALOG);
    }

    async closeRenderUnavailableDialog(): Promise<void> {
        await webActions.clickElement(ModalDialogObjects.RENDER_UNAVAILABLE_CLOSE);
    }

    async isRenderUnavailableDialogDisplayed(): Promise<boolean> {
        return await webActions.isElementVisible(ModalDialogObjects.RENDER_UNAVAILABLE_CLOSE);
    }
}