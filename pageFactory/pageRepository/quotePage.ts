import { QuotePageObjects } from '../objectRepository/QuotePageObjects';
import { Page, expect } from '@playwright/test';
import { WebActions } from '../../framework/WebActions';
import { TestData } from '@framework/TestData';
import { Common } from '@framework/Common';

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
    await this.enterPostalCodeAndWaitForDealer();
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterSlgFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.PHONE, '2067243787');
    await this.enterPostalCodeAndWaitForDealer();
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterCmvFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.checkRadioElement(QuotePageObjects.COMMERCIAL_USE_RADIO);
    await webActions.enterElementText(QuotePageObjects.ORGANIZATION_INPUT_FIELD, 'Polaris');
    await this.enterPostalCodeAndWaitForDealer();
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterMilFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.ORGANIZATION_INPUT_FIELD, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.POSTAL_CODE, TestData.getTestPostalCode(this.page.url()));
    await this.page.locator(QuotePageObjects.MIL_MKT_DROPDOWN).selectOption({ index: 1 });
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterBenFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.PHONE, '2067243787');
    await this.enterPostalCodeAndWaitForDealer();
    if(Common.getUrlLocale(this.page.url()) === ('en-ca' || 'fr-ca')) {
        await this.page.locator(QuotePageObjects.BEN_CANADA_PURCHASE_DATE).selectOption({ index: 1 });
    } else {
        await this.page.locator(QuotePageObjects.MIL_MKT_DROPDOWN).selectOption({ index: 1 });
    }
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterGdyFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.PHONE, '2067243787');
    await this.enterPostalCodeAndWaitForDealer();
    await this.page.locator(QuotePageObjects.MIL_MKT_DROPDOWN).selectOption({ index: 1 });
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterHurFormDetailsAndSubmit () {
    await webActions.enterElementText(QuotePageObjects.FIRST_NAME, 'Polaris');
    await webActions.enterElementText(QuotePageObjects.LAST_NAME, 'Validation');
    await webActions.enterElementText(QuotePageObjects.EMAIL, TestData.getTestEmail(this.page.url()));
    await webActions.enterElementText(QuotePageObjects.PHONE, '2067243787');
    await this.enterPostalCodeAndWaitForDealer();
    await this.page.locator(QuotePageObjects.HUR_PURCHASE_DATE).selectOption({ index: 1 });
    await webActions.clickElement(QuotePageObjects.AGE_CHK);
    await webActions.clickElement(QuotePageObjects.SUBMIT);
    await this.waitForFormSubmitted();
   }

   async enterPostalCodeAndWaitForDealer(): Promise<void> {
    await webActions.enterElementText(QuotePageObjects.POSTAL_CODE, TestData.getTestPostalCode(this.page.url()));
    if(await webActions.isElementVisible(QuotePageObjects.SEARCH_BTN)) {
        await webActions.clickElement(QuotePageObjects.SEARCH_BTN);
    }
    await webActions.waitForElementHidden(QuotePageObjects.SEARCH_BTN);
   }

   async waitForFormSubmitted(): Promise<void> {
    await webActions.waitForElementDetached(QuotePageObjects.FORM_SUBMISSION_SPINNER);
   }
}