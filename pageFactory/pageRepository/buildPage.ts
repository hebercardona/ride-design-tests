import { Page, expect } from '@playwright/test';
import { BuildPageObjects } from '@objects/BuildPageObjects';
import { WebActions } from '@framework/WebActions';
import { Header } from './Header';

let webActions: WebActions;

export class BuildPage extends BuildPageObjects{
    readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        super();
        this.page = page;
        this.header = new Header(this.page);
        webActions = new WebActions(this.page);
    }

    async clickAnySeatCategory(): Promise<void> {
        await expect(BuildPageObjects.SEAT_CATEGORIES, `No seat category elements were displayed`).toBeTruthy();
        await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
    }

    async clickAnyModelCategory(): Promise<void> {
        await expect(BuildPageObjects.MODEL_CATEGORIES, `No model category elements were displayed`).toBeTruthy();
        await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
    }

    async clickAnyTrim(): Promise<void> {
        await expect(BuildPageObjects.TRIMS, `No trim category elements were displayed`).toBeTruthy();
        await webActions.clickAnyElement(BuildPageObjects.TRIMS);
    }

    async clickColorPageNextBtn(): Promise<void> {
        let title = await this.page.locator('div.cpq-header span').textContent();
        await this.page.locator(BuildPageObjects.FOOTER_SPINNER_LOADING).waitFor({state: 'detached'});
        await this.page.locator(BuildPageObjects.RADIAL_PROGRESS).waitFor({state: 'hidden'});
        await this.page.waitForSelector(BuildPageObjects.PC_LOADED, {state: 'visible'});
        await this.page.waitForFunction(`document.querySelector('div.cpq-header span').innerText !== '${title}'`);
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT);
    }

    async waitForPcLoaded(): Promise<void> {
        await this.page.locator(BuildPageObjects.FOOTER_SPINNER_LOADING).waitFor({state: 'detached'});
        await this.page.locator(BuildPageObjects.RADIAL_PROGRESS).waitFor({state: 'hidden'});
        await this.page.waitForSelector(BuildPageObjects.PC_LOADED, {state: 'visible'});
    }

    async openSummary(): Promise<void> {
        await this.waitForPcLoaded();
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

}