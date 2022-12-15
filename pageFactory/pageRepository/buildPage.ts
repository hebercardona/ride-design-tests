import { Page } from '@playwright/test';
import { BuildPageObjects } from '@objects/buildPageObjects';
import { WebActions } from '@framework/webActions';

let webActions: WebActions;

export class BuildPage extends BuildPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async clickAnySeatCategory() {
        await webActions.clickAnyElement(BuildPageObjects.SEAT_CATEGORIES);
    }

    async clickAnyModelCategory() {
        await webActions.clickAnyElement(BuildPageObjects.MODEL_CATEGORIES);
    }

    async clickAnyTrim() {
        await webActions.clickAnyElement(BuildPageObjects.TRIMS);
    }

    async clickFooterNext() {
        let title = await this.page.locator('div.cpq-header span').textContent();
        await this.page.locator(BuildPageObjects.FOOTER_SPINNER_LOADING).waitFor({state: 'detached'});
        await this.page.locator(BuildPageObjects.RADIAL_PROGRESS).waitFor({state: 'hidden'});
        await this.page.waitForSelector(BuildPageObjects.PC_LOADED, {state: 'visible'});
        await this.page.waitForFunction(`document.querySelector('div.cpq-header span').innerText !== '${title}'`);
        await webActions.clickElement(BuildPageObjects.FOOTER_NEXT);
        //await this.page.waitForFunction(`document.querySelector('div.cpq-header span').innerText !== '${title}'`);
    }

    async openSummary() {
        await webActions.clickElement(BuildPageObjects.OPEN_SUMMARY);
    }

    async clickGetQuote() {
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