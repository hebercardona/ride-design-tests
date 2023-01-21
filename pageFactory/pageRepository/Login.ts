import type { Page } from '@playwright/test'
import { WebActions } from '../../framework/WebActions'
import { LoginObjects } from '../objectRepository/LoginObjects'

let webActions: WebActions;

export class Login extends LoginObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async enterEmail(email: string): Promise<void> {
        await webActions.enterElementText(LoginObjects.EMAIL, email);
    }

    async enterPassword(password: string): Promise<void> {
        await webActions.enterElementText(LoginObjects.PASSWORD, password);
    }

    async clickSignIn() {
        await webActions.clickElement(LoginObjects.HAMBURGER_MENU);
        await webActions.clickElement(LoginObjects.ACCOUNT_ICON);
    }

    async clickSubmit() {
        await webActions.clickElement(LoginObjects.SUBMIT);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }
}