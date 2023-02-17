import { Page } from "@playwright/test";

export class EvaluateJs {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getModelId(): Promise<string> {
        const modelId: string = await this.page.evaluate('window.cpqCore.ModelID');
        return modelId;
    }
}