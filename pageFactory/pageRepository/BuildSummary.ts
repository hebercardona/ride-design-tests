import { WebActions } from "@framework/WebActions";
import { BuildSummaryObjects } from "@objects/BuildSummaryObjects";
import { Page, expect, Locator } from "@playwright/test";
import { CarouselProduct } from "./Carousel";
import { Common } from "@framework/Common";

let webActions: WebActions;

export class BuildSummary extends BuildSummaryObjects{

    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getBuildsummaryDialogElement(): Promise<Locator> {
        return webActions.getElement(BuildSummaryObjects.SUMMARY_DIALOG);
    }

    async getSummaryVehicleSectionElement(): Promise<Locator> {
        return webActions.getElement(BuildSummaryObjects.SUMMARY_VEHICLE);
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

    async getBuildSummaryItemDescriptions(): Promise<string[]> {
        return await webActions.getInnerTextFromElements(BuildSummaryObjects.SUMMARY_ITEM_DESCRIPTION);
    }

    async isSummaryProductPriceAsExpected(product: CarouselProduct): Promise<void> {
        const summaryProductInfo = await webActions.getElementThatHasText(BuildSummaryObjects.SUMMARY_ACCESSORY_INFO, product.id);
        expect(summaryProductInfo, `Product ID: ${product.id} not found in summary`).toBeTruthy();
        const productSummaryPrice = await webActions.getChildElementFromParentElement(summaryProductInfo, BuildSummaryObjects.SUMMARY_PRODUCT_PRICE);
        const productCarouselDiscountPrice = Common.getPriceString(product.discountLabel);
        const productSummaryPriceText = await productSummaryPrice.innerText(); 
        expect(Common.getPriceString(productSummaryPriceText), 
        `Summary price for product ${product.title} does not match carousel price`).toEqual(productCarouselDiscountPrice);
    }

    async verifyBuildItemsPresentOnSummary(itemTitles: string[]): Promise<void> {
        const summaryItemsTitles = await webActions.getInnerTextFromElements(BuildSummaryObjects.SUMMARY_ITEM_DESCRIPTION);
        const diff = itemTitles.filter(item => !summaryItemsTitles.includes(item));
        expect(itemTitles.length === summaryItemsTitles.length, 'Number of items do not match on build summary upon build load').toBeTruthy();
        expect(diff.length, `Found different items on build summary after build load: ${diff}`).toBeFalsy();
    }
}