import { QuotePageObjects } from '../objectRepository/QuotePageObjects';
import type { Page } from '@playwright/test';
import { WebActions } from '../../framework/WebActions';
import { TestData } from '@framework/TestData';

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
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.POSTAL_CODE, TestData.getTestPostalCode(this.page.url()));
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
   }
}