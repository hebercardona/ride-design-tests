import { WebActions } from "@framework/WebActions";
import { CarouselObjects } from "@objects/CarouselObjects";
import { ElementHandle, Locator, Page, expect } from "@playwright/test";
import { ModalDialogs } from "./ModalDialogs";
import { add } from "winston";
import { it } from "test";

let webActions: WebActions;

export type CarouselProduct = {
    title: string,
    id: string,
    price: string,
    discountLabel?: string,
    seeDetails: Locator,
    cta: Locator
}

export class Carousel extends CarouselObjects {
    readonly page: Page;
    readonly modals: ModalDialogs;

    constructor(page: Page) {
        super();
        this.page = page;
        this.modals = new ModalDialogs(this.page);
        webActions = new WebActions(this.page);
    }

    async getCategories(): Promise<string[]> {
        const categories = await webActions.getInnerTextFromElements(CarouselObjects.CATEGORIES_BTN_VISIBLE);
        return categories;
    }

    async getSubcategories(): Promise<string[]> {
        const subcategories = await webActions.getInnerTextFromElements(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE);
        return subcategories;
    }

    async clickCategoryByName(categoryName: string): Promise<void> {
        await webActions.clickElementThatHasText(CarouselObjects.CATEGORIES_BTN_VISIBLE, categoryName);
    }

    async clickAnyCategory(): Promise<void> {
        await webActions.clickAnyElement(CarouselObjects.CATEGORIES_BTN_VISIBLE);
    }

    async clickSubcategoryByName(subcategoryName: string): Promise<void> {
        await webActions.clickElementThatHasText(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE, subcategoryName);
    }

    async clickAnySubcategory(): Promise<void> {
        await webActions.clickAnyElement(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE);
    }

    async clickAccessoryCtaByName(accessoryName: string): Promise<void> {
        await webActions.clickElement(CarouselObjects.PRODUCT_CTA_BY_NAME(accessoryName));
    }

    async getAccessoryItem():Promise<CarouselProduct> {
        const accessoryItems = await webActions.getElement(CarouselObjects.PRODUCT_ITEM_VISIBLE);
        const acc = accessoryItems.filter({has: this.page.locator(`text='Add'`)}).first();
        const product: CarouselProduct = {
            title: await acc.locator(CarouselObjects.PRODUCT_TITLE)?.textContent(),
            id: await acc.locator(CarouselObjects.PRODUCT_ID)?.innerText(),
            price: await acc.locator(CarouselObjects.PRODUCT_PRICE)?.innerText(),
            seeDetails: acc.locator(CarouselObjects.SEE_DETAILS),
            cta: acc.locator(CarouselObjects.PRODUCT_CTA)
        };
        return product;
    }


    async addAccessory(): Promise<CarouselProduct> {
        let added: boolean;
        let product: CarouselProduct;
        await webActions.waitForElementVisible(CarouselObjects.CATEGORY_ITEMS_VISIBLE);
        const categories = this.page.locator(CarouselObjects.CATEGORY_ITEMS_VISIBLE)
        .filter({has: this.page.locator(CarouselObjects.PRODUCT_ITEMS)});

        for (let i = 0; i < await categories.count(); i++) {
            await categories.nth(i).click();

            const subcategories = this.page.locator(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE);
            if(await subcategories.count() > 0) {
                for (let j = 0; j < await subcategories.count(); j++) {
                    await subcategories.nth(j).click();
                    if(await this.areProductsAvailable()) {
                        const products = this.page.locator(CarouselObjects.PRODUCT_ITEM_VISIBLE);
                        for (let k = 0; k < await products.count(); k++) {
                            product = await this.getProductObject(products.nth(k));
                            await product.cta.click();
                            if(await this.modals.isPrpDisplayed()) {
                                await this.modals.clickPrpPrimaryPartRemove();
                                continue;
                            } else {
                                added = true;
                                await this.collapseSubcategories();
                                break;
                            }
                        }
                    }
                    if(added) {
                        await this.collapseCategories();
                        break;
                    }
                }
                if(added) {
                    break;
                }
            } else {
                const products = this.page.locator(CarouselObjects.PRODUCT_ITEM_VISIBLE);
                for (let l = 0; l < await products.count(); l++) {
                    product = await this.getProductObject(products.nth(l));
                    await product.cta.click();
                    if(await this.modals.isPrpDisplayed()) {
                        await this.modals.clickPrpPrimaryPartRemove();
                        continue;
                    } else {
                        added = true;
                        break;
                    }
                }
                if(added) {
                    await this.collapseCategories();
                    break;
                }
            }
        }
        expect(added, 'No accessory added on add accessory step').toBeTruthy();
        return product;
    }

    async areProductsAvailable(): Promise<boolean> {
        const productItems = await webActions.getElement(CarouselObjects.PRODUCT_ITEM_VISIBLE);
        const productsAvailable = productItems ?
        await productItems.filter({has: this.page.locator(`button.build-accessories-product-choice-add`)}).count() > 0 ? true : false : false;
        return productsAvailable;
    }

    async getProductObject(element: Locator): Promise<CarouselProduct> {
        const product: CarouselProduct = await {
            title: await element.locator(CarouselObjects.PRODUCT_TITLE).textContent(),
            id: await element.locator(CarouselObjects.PRODUCT_ID).nth(1)?.innerText(),
            price: await element.locator(CarouselObjects.PRODUCT_PRICE).count() > 0 ?
            await element.locator(CarouselObjects.PRODUCT_PRICE).innerText() : null,
            discountLabel: await element.locator(CarouselObjects.EMPLOYEE_DISCOUNT_LABEL).count() > 0 ? 
            await element.locator(CarouselObjects.EMPLOYEE_DISCOUNT_LABEL).innerText() : undefined,
            seeDetails: element.locator(CarouselObjects.SEE_DETAILS),
            cta: element.locator(CarouselObjects.PRODUCT_CTA)
        };
        return product;
    }

    async collapseSubcategories(): Promise<void> {
        await webActions.clickElement(CarouselObjects.SUBCATEGORY_MINUS_ICON);
    }

    async collapseCategories(): Promise<void> {
        await webActions.clickElement(CarouselObjects.CATEGORY_UP_ARROW);
    }

    async isEmployeeDiscountLabelPresentForProducts(): Promise<boolean> {
        const productsEmployeeDiscount = await webActions.getChildElementsFromParenLocator(CarouselObjects.PRODUCT_ITEMS, CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
        const flag = productsEmployeeDiscount.length > 0 ? true : false;
        return flag;
    }

    async getProductWithEmployeeDiscountDisplayed(): Promise<CarouselProduct> {
        let productLocator;
        const category = await webActions.getElementThatContainsChildElement(CarouselObjects.CATEGORY_ITEMS_VISIBLE, CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
        await category[0].click();
        const itemVisible = await webActions.isElementVisible(CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
        if(itemVisible) {
            productLocator = await webActions.getElementThatContainsChildElement(CarouselObjects.PRODUCT_ITEM_VISIBLE, CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
        } else {
            const subcategory = await webActions.getElementThatContainsChildElement(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE, CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
            await subcategory[0].click();
            productLocator = await webActions.getElementThatContainsChildElement(CarouselObjects.PRODUCT_ITEM_VISIBLE, CarouselObjects.EMPLOYEE_DISCOUNT_LABEL);
        }
        const product = await this.getProductObject(productLocator[0]);
        return product;
    }

    async isDiscountPriceLessThanRegularAnyProduct(): Promise<boolean> {
        const product = await this.getProductWithEmployeeDiscountDisplayed();
        expect(product).toBeTruthy();
        const regularPrice = parseFloat(product.price.replace(/,/g, '').split('$')[1].trim()).toFixed(2);
        const discountPrice = parseFloat(product.discountLabel.replace(/,/g, '').split('$')[1].trim()).toFixed(2);
        return regularPrice > discountPrice;
    }

    async addProductItem(product: CarouselProduct): Promise<void> {
        await webActions.clickElement(product.cta);
        await this.modals.clickPrpRequiredPartAddIfNeeded();
    }

    async isCarouselPresent(): Promise<boolean> {
        const isCarouselDisplayed = await webActions.isElementVisible(CarouselObjects.CAROUSEL_CONTAINER) ? 
        await webActions.isElementVisible(CarouselObjects.CATEGORY_ITEMS_VISIBLE) ? true : false : false;
        return isCarouselDisplayed;
    }
}