import { Locator, Page, expect } from '@playwright/test';
import { BuildPageObjects } from '@objects/BuildPageObjects';
import { WebActions } from '@framework/WebActions';
import { Header } from './Header';
import { Carousel } from './Carousel';
import { BuildSummary } from './BuildSummary';
import { Login } from './Login';
import { ModalDialogs } from './ModalDialogs';
import { EvaluateJs } from '@framework/EvaluateJs';
import { Common } from '@framework/Common';
import { testConfig } from '@testConfig';

let webActions: WebActions;

export class BuildPage extends BuildPageObjects{
    readonly page: Page;
    readonly header: Header;
    readonly carousel: Carousel;
    readonly summary: BuildSummary;
    readonly login: Login;
    readonly modals: ModalDialogs;
    readonly js: EvaluateJs;

    constructor(page: Page) {
        super();
        this.page = page;
        this.header = new Header(this.page);
        this.carousel = new Carousel(this.page);
        this.summary = new BuildSummary(this.page);
        this.login = new Login(this.page);
        this.modals = new ModalDialogs(this.page);
        this.js = new EvaluateJs(this.page);
        webActions = new WebActions(this.page);
    }

    async clickAnySeatCategory(): Promise<void> {
        expect(await this.page.locator(BuildPageObjects.SEAT_CATEGORIES).count(), `No seat category elements were displayed`).toBeGreaterThan(0);
        await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
    }

    async clickAnyModelCategory(): Promise<void> {
        expect(await this.page.locator(BuildPageObjects.MODEL_CATEGORIES).count(), `No model category elements were displayed`).toBeGreaterThan(0);
        await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
    }

    async clickIndFamily(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.MODEL_CATEGORIES, series);
        }
    }

    async clickIndTrim(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.TRIMS);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.TRIMS, series);
        }
    }

    async clickMilModelCategory(): Promise<void> {
        if(this.page.url().includes('trim')) {
            return;
        }
        await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
    }

    async clickBenBoatSeries(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.SEAT_CATEGORIES, series);
        }
    }

    async clickBenModelCategory(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.MODEL_CATEGORIES, series);
        }
    }

    async clickHurModelCategory(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.MODEL_CATEGORIES, series);
        }
    }

    async clickGdyBoatSeries(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.CATEGORIES, series);
        }
    }

    async clickHurBoatSeries(series: string = 'any'): Promise<void> {
        if(series === 'any') {
            await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
        } else {
            await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.SEAT_CATEGORIES, series);
        }
    }

    async clickAvailableLayoutItem(): Promise<void> {
        await webActions.clickAnyElement(BuildPageObjects.AVAILABLE_LAYOUT_ITEM);
        await this.waitForHurricaneCanvas();
    }

    async clickGdyAvailableLayoutItem(): Promise<void> {
        let layoutsAvailable = await this.areLayout3DAvailable();
        while(!layoutsAvailable) {
            await webActions.clickElement(BuildPageObjects.RENDER_UNAVAILABLE_CLOSE);
            await this.page.goBack();
            await this.performFeatureSelectionSubsteps();
            layoutsAvailable = await this.areLayout3DAvailable();
        }
        await webActions.clickAnyElement(BuildPageObjects.AVAILABLE_LAYOUT_ITEM);
        await this.waitForCanvasLoaded();
    }

    async areLayout3DAvailable(): Promise<boolean> {
        const layouts = await webActions.getElements(BuildPageObjects.AVAILABLE_LAYOUT_ITEM);
        return await layouts.length > 0;
    }

    async clickAnyMilBrand(): Promise<void> {
        await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
    }

    async clickBrandByName(name: string): Promise<void> {
        await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.MODEL_CATEGORIES, name);
    }

    async clickAnyTrim(): Promise<void> {
        await expect(BuildPageObjects.TRIMS, `No trim category elements were displayed`).toBeTruthy();
        await webActions.clickAnyElement(BuildPageObjects.TRIMS);
    }

    async clickFooterNextBtn(): Promise<void> {
        if(await webActions.isElementVisible(BuildPageObjects.FOOTER_SPINNER_LOADING)) {
            await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_LOADING);
        }
        if(await webActions.isElementVisible(BuildPageObjects.EMOTION_ICON_FEEDBACK_CLOSE)) {
            await webActions.clickElement(BuildPageObjects.EMOTION_ICON_FEEDBACK_CLOSE);
        }
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT);
    }

    async clickColorPageNextBtn(): Promise<void> {
        await this.waitForPcLoaded();
        await webActions.waitForElementHidden(BuildPageObjects.RADIAL_PROGRESS);
        this.waitForNextFooterBtnInitialized();
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT);
    }

    async waitForNextFooterBtnInitialized(): Promise<void> {
        await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_LOADING);
        await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_WRAPPER);
        await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_LOADER_TEXT);
        Common.delay(testConfig.canvasWait);
    }

    async waitForPcLoaded(): Promise<void> {
        await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_LOADING);
        await webActions.waitForElementHidden(BuildPageObjects.RADIAL_PROGRESS);
        await webActions.waitForElementVisible(BuildPageObjects.PC_LOADED);
    }

    async waitForCanvasLoaded(): Promise<void> {
        await webActions.waitForDomContentLoaded();
        await webActions.waitForElementDetached(BuildPageObjects.FOOTER_SPINNER_LOADING);
        await webActions.waitForElementHidden(BuildPageObjects.RADIAL_PROGRESS);
        await webActions.waitForElementVisible(BuildPageObjects.CANVAS_LOADED);
    }

    async waitForHurricaneCanvas(): Promise<void> {
        await webActions.waitForDomContentLoaded();
        if(await webActions.isElementVisible(BuildPageObjects.CANVAS_DEFAULT_CURSOR)) {
            return;
        } else {
            await webActions.waitForElementVisible(BuildPageObjects.HUR_GDY_CANVAS_GRAB);
        }
    }

    async isPlayCanvasLoaded(): Promise<boolean> {
        return await this.page.locator(BuildPageObjects.PC_LOADED).isVisible();
    }

    async openSummary(): Promise<void> {
        await this.waitForPcLoaded();
        await webActions.clickElement(BuildPageObjects.OPEN_SUMMARY);
    }

    async openSummaryGdy(): Promise<void> {
        await this.waitForCanvasLoaded();
        const openSummary = await this.page.locator(BuildPageObjects.FOOTER_NEXT).count() > 0 ?
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT) :
        await webActions.clickElement(BuildPageObjects.OPEN_SUMMARY);
        await webActions.clickElement(BuildPageObjects.OPEN_SUMMARY);
    }

    async openSummaryHur(): Promise<void> {
        if(await webActions.isElementVisible(BuildPageObjects.CANVAS_RENDER_CONTAINER)) {
            await webActions.clickElement(BuildPageObjects.CANVAS_RENDER_CONTAINER);
        }
        await this.waitForHurricaneCanvas();
        const openSummary = await this.page.locator(BuildPageObjects.FOOTER_NEXT).count() > 0 ?
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT) :
        await webActions.clickElement(BuildPageObjects.OPEN_SUMMARY);
    }

    async clickIamFinishedBtn(): Promise<void> {
        await webActions.clickElement(BuildPageObjects.GET_QUOTE);
    }

    async waitForMessageAsync(): Promise<boolean> {
        return new Promise(function (resolve) {
          this.page.on('console', (event) => {event
            if (event.text() === 'cpq:load:complete') {
              resolve(true);
            }
          });
        });
      }

    async modelSelectionToAccessoriesPage(): Promise<void> {
        await this.clickAnySeatCategory();
        await this.clickAnyModelCategory();
        await this.clickAnyTrim();
        await this.clickColorPageNextBtn();
    }

    async openBuildSummaryAndClickImFinished(): Promise<void> {
        await this.openSummary();
        await this.clickIamFinishedBtn();
    }

    async clickAnyCategory(): Promise<void> {
        await webActions.clickAnyElement(BuildPageObjects.CATEGORIES);
    }

    async clickVehicleCategoryByName(name: string): Promise<void> {
        await webActions.clickElementThatHasTextInChildElement(BuildPageObjects.CATEGORIES, name);
    }

    async categoryToAccessoriesPageInd(): Promise<void> {
        await this.clickAnyCategory();
        await this.clickAnyModelCategory();
        await this.clickAnyTrim();
        await this.clickColorPageNextBtn();
        await this.modals.clickPurposePromptNewVehicle();
    }

    async clickAnySubstepRadio(): Promise<void> {
        await webActions.clickAnyElement(BuildPageObjects.SUBSTEP_ITEM_TITLE);
    }

    async performFeatureSelectionSubsteps(stepSelections: string = 'any'): Promise<void> {
        let substep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE, {has: this.page.locator(BuildPageObjects.SUBSTEP_ITEMS)});

        while (await webActions.isElementVisible(BuildPageObjects.SUBSTEP_SECTION)) {
            await new Promise(f => setTimeout(f, 3000));
            let substepItem: Locator;
            await this.waitForSubstepOptionsToLoad();

            let substepItems = await substep.locator(BuildPageObjects.SUBSTEP_ITEMS);

            if(await substep.count() > 0) {
                expect(await substepItems.count(), 
                `Substep ${substep.textContent()} is not displaying any substep items`).toBeGreaterThan(0);
            }

            if(await substepItems.count() > 0 && stepSelections !== 'default') {
                await webActions.clickAnyElement(BuildPageObjects.SUBSTEP_ITEMS);
            }

            await new Promise(f => setTimeout(f, 1500));
            await this.clickFooterNextBtn();
            await new Promise(f => setTimeout(f, 3000));
            substep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE, {has: this.page.locator(BuildPageObjects.SUBSTEP_ITEMS)});
        }
    }

    async performFeatureDefaultSelections(): Promise<void> {
        await this.performFeatureSelectionSubsteps('default');
    }

    async performOptionSelectionSubsteps(): Promise<void> {
        let substep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE, {has: this.page.locator(BuildPageObjects.SUBSTEP_ITEMS)});
        
        while (await substep.count() > 0) {
            await this.waitForSubstepOptionsToLoad();
            await new Promise(f => setTimeout(f, 4000));
            let substepItems = await substep.locator(BuildPageObjects.SUBSTEP_ITEMS);
            
            if(await substepItems.count() > 1) {
                await webActions.clickAnyElement(BuildPageObjects.SUBSTEP_ITEMS);
            }
            await this.clickFooterNextBtn();
            if(await webActions.isElementVisible(BuildPageObjects.SAVE_BUILD_TEXT)) {
                await webActions.waitForElementHidden(BuildPageObjects.SAVE_BUILD_TEXT);
            }
            await this.waitForPcLoaded();
            
            
            await new Promise(f => setTimeout(f, 3000));
            substep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE, {has: this.page.locator(BuildPageObjects.SUBSTEP_ITEMS)});
        }
    }

    async clickAnyColorItem(): Promise<void> {
        await webActions.clickAnyElement(BuildPageObjects.COLOR_ITEMS);
    }

    async clickCmvAnyColorItem(): Promise<void> {
        if(this.page.url().includes('build-color')) {
            await webActions.clickAnyElement(BuildPageObjects.COLOR_ITEMS);
            await webActions.clickElement(BuildPageObjects.FOOTER_NEXT);
        }
    }

    async verifySubstepItemsDisplayed(): Promise<void> {
        const substep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE, {has: this.page.locator(BuildPageObjects.SUBSTEP_ITEMS)});
        
        if(await substep.count() > 0) {
            const substepItems = await substep.locator(BuildPageObjects.SUBSTEP_ITEMS);
            expect(await substepItems.count(), 
            `No Substep items displayed for substep: ${await substep.innerText()}`).toBeGreaterThan(0);
        }
    }

    async waitForSubstepOptionsToLoad(): Promise<void> {
        const currentSubstep = await this.page.locator(BuildPageObjects.SUBSTEP_TITLE).last();
        await currentSubstep.locator(BuildPageObjects.SUBSTEP_SPINNER_LOADER).waitFor({state: 'hidden'});
    }

    async clickSnoColorItems(): Promise<void> {
        if(!(await webActions.isElementVisible(BuildPageObjects.SNO_STOCK_LABEL))) {
            const sidePanelSection = await webActions.getElement(BuildPageObjects.SNO_SIDE_PANEL_SECTION);
            const sidePanelColors = await webActions.getChildElementsFromParentElement(await sidePanelSection, BuildPageObjects.SNO_COLORS_WATCHES)
            await webActions.clickAnyFromElementList(await sidePanelColors);

            const tunnelSection = await webActions.getElement(BuildPageObjects.SNO_TUNNEL_SECTION);
            const tunnelColors = await webActions.getChildElementsFromParentElement(await tunnelSection, BuildPageObjects.SNO_COLORS_WATCHES)
            await webActions.clickAnyFromElementList(await tunnelColors);

            const railSection = await webActions.getElement(BuildPageObjects.SNO_RAIL_SECTION);
            const railColors = await webActions.getChildElementsFromParentElement(await railSection, BuildPageObjects.SNO_COLORS_WATCHES)
            await webActions.clickAnyFromElementList(await railColors);
        }
    }

    async isSnoStockModel(): Promise<boolean> {
        return await webActions.isElementVisible(BuildPageObjects.SNO_STOCK_LABEL);
    }

    async getJsModelId(): Promise<string> {
        return await this.js.getModelId();
    }
}