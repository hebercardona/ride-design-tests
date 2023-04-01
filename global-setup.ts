import { testConfig } from '@testConfig';
import rimraf from 'rimraf';
import playwright, { chromium, expect } from '@playwright/test';
import { Common } from '@framework/Common';

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
    await new Promise(resolve => {
        rimraf(`./screenshots`, resolve);
    });
    if(process.env.CI && process.env.ENV === 'qa') {
        for (const baseUrl of Object.values(testConfig.currentYearUrls)) {
            const url = Common.stringFormat(baseUrl.toString(), 'en-us')
            const browser = await chromium.launch({headless: false});
            const page = await browser.newPage();
            const response = await page.goto(url, {timeout: 120000, waitUntil: 'domcontentloaded'});
            expect.soft(response.ok(), `Response for ${url} was not successfull`).toBeTruthy();
            browser.close();
        }
    }
}

export default globalSetup;