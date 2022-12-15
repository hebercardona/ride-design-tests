import { QuotePageObjects } from '../objectRepository/quotePageObjects'
import type { Page } from '@playwright/test'
import { WebActions } from '../../framework/webActions'

let webActions: WebActions;

export class QuotePage extends QuotePageObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

   async enterFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, 'testenusinternal@polaris.com');
    await webActions.enterElementText(QuotePageObjects.POSTAL_CODE, '98008');
    await webActions.clickAnyElement(QuotePageObjects.SUBMIT);
   }
}