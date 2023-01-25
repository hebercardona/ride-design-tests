import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pageFactory/pageRepository/BasePage';

type consoleError = {
    url: string,
    error: string
}

export const test = baseTest.extend<
BasePage
>({
    pages: async ({ page }, use) => {
        const pageObjects = new BasePage(page).pages;
        pageObjects.page.on('console', msg => {
            if(msg.type() == 'error') {
                pageObjects.pageConsoleErrors.push({
                    message: msg.text(),
                    url: page.url()
                });
            }
        });
        await use(pageObjects)
    },
});


export { expect } from '@playwright/test';