import { test as baseTest, expect } from '@playwright/test';
import { BasePage } from '../pageFactory/pageRepository/BasePage';
import { testConfig } from '@testConfig';
import { Common } from './Common';

type cookie = {
    name: string,
    value: string,
    path: string,
    domain: string
}

export const test = baseTest.extend<
BasePage
>({
    pages: async ({ page, context }, use) => {
        const pageObjects = new BasePage(page).pages;
        pageObjects.page.on('console', msg => {
            if(msg.type() == 'error') {
                pageObjects.pageConsoleErrors.push({
                    message: msg.text(),
                    url: page.url()
                });
            }
        });
        //Add notice preference cookies
        await context.addCookies(
            setNoticePreferenceCookie()
        );
        //Catch error pages
        if(pageObjects.page.url().includes('http')) {
            const response = await pageObjects.page.request.get(pageObjects.page.url());
            expect(await response.status()).toBe(200);
        }
        await use(pageObjects)
    },
});

function setNoticePreferenceCookie(): cookie[] {
    let cookies: cookie[] = [];
    Object.values(testConfig.brandDomains).forEach(value => {
        cookies.push(
            {
                name: 'notice_preferences',
                value: '2:',
                path: '/',
                domain: value as string
            }
        );
    });
    return cookies;
}

export { expect } from '@playwright/test';