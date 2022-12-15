import type { Page } from '@playwright/test'
import { WebActions } from '../../framework/webActions'
import { LoginPageObjects } from '../objectRepository/loginPageObjects'

let webActions: WebActions;

export class LoginPage extends LoginPageObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async enterEmail(email: string): Promise<void> {
        await webActions.enterElementText(LoginPageObjects.EMAIL, email);
    }

    async enterPassword(password: string): Promise<void> {
        await webActions.enterElementText(LoginPageObjects.PASSWORD, password);
    }

    async clickSignIn() {
        await webActions.clickElement(LoginPageObjects.HAMBURGER_MENU);
        await webActions.clickElement(LoginPageObjects.ACCOUNT_ICON);
    }

    async clickSubmit() {
        await webActions.clickElement(LoginPageObjects.SUBMIT);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }
}