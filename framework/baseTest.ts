import { test as baseTest } from '@playwright/test';
import { Pages } from '../pageFactory/pageRepository/pages'

export const test = baseTest.extend<Pages>({
    pages: async ({ page }, use) => {
        await use(new Pages(page).pages)
    }
});


export { expect } from '@playwright/test';