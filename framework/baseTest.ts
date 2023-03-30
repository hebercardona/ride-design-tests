import { test as baseTest, expect } from '@playwright/test';
import { BasePage } from '../pageFactory/pageRepository/BasePage';
import { testConfig } from '@testConfig';

type cookie = {
    name: string,
    value: string,
    path: string,
    domain: string
}

const EMERGENT_ELEMENTS = {
    MINIMIZED_WIDGET_MESSAGE: `button[class*='MinimizedWidgetMessage__close']`,
    NO_MODEL_DIALOG: `#noModel a`
}

const cpqConsoleErrors = ['bannerEnabled', 'app-bundle', 'cpq'];

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
        pageObjects.page.on('console', msg => {
            if(msg.type() == 'error' && cpqConsoleErrors.some(e => msg.text().includes(e))) {
                expect(cpqConsoleErrors.some(e => msg.text().includes(e)), 
                `cpq console errors thrown for page\n 
                url: ${pageObjects.page.url()}\n
                error: ${msg.text()}`)
                .toBeFalsy();
            }
        })
        //Add notice preference cookies
        await context.addCookies(
            setNoticePreferenceCookie()
        );
        //Catch error pages
        if(pageObjects.page.url().includes('http')) {
            const response = await pageObjects.page.request.get(pageObjects.page.url());
            expect(await response.status()).toBe(200);
        }
        expect(await pageObjects.build.modals.isNoModelDialogPresent(), 'No model dialog should not be present').toBeFalsy();
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