import { WebActions } from "@framework/WebActions";
import { BuildSummaryObjects } from "@objects/BuildSummaryObjects";
import { Page } from "@playwright/test";

let webActions: WebActions;

export class BuildSummary extends BuildSummaryObjects{

    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async closeBuildSummary(): Promise<void> {
        await webActions.clickElement(BuildSummaryObjects.ICON_CLOSE);
    }

    async getVehicleTitle(): Promise<string> {
        const vehicleTitleElement = await this.page.locator(BuildSummaryObjects.VEHICLE_TITLE).nth(0);
        return await vehicleTitleElement.innerText();
    }

    async getModelId(): Promise<string> {
        return await webActions.getElementInnerText(BuildSummaryObjects.MODEL_ID);
    }

    async getMsrpPrice(): Promise<string> {
        const footer_cost = await webActions.getElement(BuildSummaryObjects.FOOTER_COST_PRICE);
        const msrp = await footer_cost.nth(0);
        return await msrp.innerText();
    }

    async getAsConfiguredPrice(): Promise<string> {
        const footer_cost = await webActions.getElement(BuildSummaryObjects.FOOTER_COST_PRICE);
        const asConfigured = await footer_cost.nth(1);
        return await asConfigured.innerText();
    }
}