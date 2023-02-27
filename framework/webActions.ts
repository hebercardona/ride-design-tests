import { Locator, Page } from "@playwright/test";


export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async clickElement(locator: string | Locator): Promise<void> {
        if(typeof locator === 'string') {
            await this.page.click(locator);
        } else {
            await locator.click();
        }
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickAnyElement(locator: string): Promise<void> {
        let elements = this.page.locator(locator);
        let rndElement =  Math.floor(Math.random() * await elements.count());
        await elements.nth(rndElement).click();
    }

    async clickAnyFromElementList(elements: Locator[]): Promise<void> {
        let rndElement =  Math.floor(Math.random() * elements.length);
        await elements[rndElement].click();
    }

    async clickElementThatHasText(locator: string, text: string): Promise<void> {
        let element = this.page.locator(locator, {hasText: text});
        await element.click();
    }

    async getElementThatHasText(locator: string, text: string): Promise<Locator> {
        let element = this.page.locator(locator, {hasText: text});
        return element;
    }

    async clickElementThatHasTextInChildElement(locator: string, text: string): Promise<void> {
        let element = this.page.locator(locator, {has: this.page.locator(`text='${text}'`)});
        await element.click();
    }

    async getElementThatHasTextInChildElement(parentLocator: string, text: string): Promise<Locator> {
        let element = this.page.locator(parentLocator, {has: this.page.locator(`text='${text}'`)});
        return element;
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
    const elementHandles = this.page.locator(locator);
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
        elementList.push(elements.nth(i));
    }
    return elementList;
   }

   async getChildElementsFromParenLocator(parentLocator: string, childLocator): Promise<Locator[]> {
    let elementList: Locator[] = [];
    const elements = this.page.locator(parentLocator).locator(childLocator);
    for (let i = 0; i < await elements.count(); i++) {
        elementList.push(elements.nth(i));
    }
    return elementList;
   }

   async getChildElementsFromParentElement(parentElement: Locator, childLocator): Promise<Locator[]> {
    let elementList: Locator[] = [];
    const elements = parentElement.locator(childLocator);
    for (let i = 0; i < await elements.count(); i++) {
        elementList.push(elements.nth(i));
    }
    return elementList;
   }

   async getChildElementFromParentElement(parentElement: Locator, childLocator): Promise<Locator> {
    const element = parentElement.locator(childLocator);
    return element;
   }

   async getElementThatContainsChildElement(parentElement: string, childLocator: string): Promise<Locator[]> {
    let elements: Locator[] = [];
    const parentelements = this.page.locator(parentElement, {has: this.page.locator(childLocator)});
    for (let i = 0; i < await parentelements.count(); i++) {
        elements.push(parentelements.nth(i));
    }
    return elements;
   }

   async waitForElementHidden(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({state: 'hidden'});
   }

   async isElementVisible(locator: string): Promise<boolean> {
    const elements = this.page.locator(locator);
    if(await elements.count() > 1) {
        return await elements.first().isVisible();
    }
    return await this.page.locator(locator).isVisible();
   }

   async waitForElementVisible(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({state: 'visible'});
   }

   async waitForElementDetached(locator: string): Promise<void> {
    await this.page.waitForSelector(locator, {state: 'detached'});
   }

   async waitForDomContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
   }

   async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
   }

   async getAnyElementFromList(locator: string): Promise<Locator> {
    let elements = this.page.locator(locator);
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