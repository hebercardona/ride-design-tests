import { Locator, Page } from "@playwright/test";


export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async clickElement(locator: string): Promise<void> {
        await this.page.click(locator);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickAnyElement(locator: string): Promise<void> {
        let elements = await this.page.locator(locator);
        let rndElement =  Math.floor(Math.random() * await elements.count());
        await elements.nth(rndElement).click();
    }

    async clickAnyFromElementList(elements: Locator[]): Promise<void> {
        let rndElement =  Math.floor(Math.random() * await elements.length);
        await elements[rndElement].click();
    }

    async clickElementThatHasText(locator: string, text: string): Promise<void> {
        let element = await this.page.locator(locator, {hasText: text});
        await element.click();
    }

    async clickElementThatHasTextInChildElement(locator: string, text: string): Promise<void> {
        let element = await this.page.locator(locator, {has: this.page.locator(`text='${text}'`)});
        await element.click();
    }

    async getElementThatHasTextInChildElement(parentLocator: string, text: string): Promise<Locator> {
        let element = await this.page.locator(parentLocator, {has: this.page.locator(`text='${text}'`)});
        return await element;
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text);
    }

    async checkRadioElement(locator: string) {
        await this.page.locator(locator).check();
    }

   async waitForElementGone(locator: string): Promise<void> {
    await this.page.locator(locator)
   }

   async getElement(locator: string): Promise<Locator> {
    return await this.page.locator(locator);
   }

   async getInnerTextFromElements(locator: string):Promise<string[]> {
    let handlesInnerText: string[] = [];
    const elementHandles = await this.page.locator(locator);
    if(elementHandles) {
        for (const element of await elementHandles.elementHandles()) {
            handlesInnerText.push(await element.innerText());
        }
    }
    return handlesInnerText;
   }

   async getElementInnerText(locator: string): Promise<string> {
    return await this.page.locator(locator).innerText();
   }

   async getElements(locator: string): Promise<Locator[]> {
    let elementList: Locator[] = [];
    const elements = this.page.locator(locator);
    for (let i = 0; i < await elements.count(); i++) {
        elementList.push(await elements.nth(i));
    }
    return elementList;
   }

   async getChildElementsFromParenLocator(parentLocator: string, childLocator): Promise<Locator[]> {
    let elementList: Locator[] = [];
    const elements = this.page.locator(parentLocator).locator(childLocator);
    for (let i = 0; i < await elements.count(); i++) {
        elementList.push(await elements.nth(i));
    }
    return elementList;
   }

   async getChildElementsFromParentElement(parentElement: Locator, childLocator): Promise<Locator[]> {
    let elementList: Locator[] = [];
    const elements = parentElement.locator(childLocator);
    for (let i = 0; i < await elements.count(); i++) {
        elementList.push(await elements.nth(i));
    }
    return elementList;
   }

   async waitForElementHidden(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({state: 'hidden'});
   }

   async isElementVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
   }

   async waitForElementDetached(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({state: 'detached'});
   }

   async waitForDomContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
   }

   async getAnyElementFromList(locator: string): Promise<Locator> {
    let elements = await this.page.locator(locator);
    let rndElement =  Math.floor(Math.random() * await elements.count());
    return await elements.nth(rndElement);
   }

   async goBack(): Promise<void> {
    this.page.goBack();
   }

   async waitForAngular() {
    await this.page.evaluate(async () => {
      // @ts-expect-error
      if (window.getAllAngularTestabilities) {
        // @ts-expect-error
        await Promise.all(window.getAllAngularTestabilities().map(whenStable));
        // @ts-expect-error
        async function whenStable(testability) {
          return new Promise((res) => testability.whenStable(res) );
        }
      }
     });
   }
}