import { WebActions } from "@framework/WebActions";
import { CarouselObjects } from "@objects/CarouselObjects";
import { ElementHandle, Locator, Page, expect } from "@playwright/test";
import { ModalDialogs } from "./ModalDialogs";
import { add } from "winston";

let webActions: WebActions;

type Product = {
    title: string,
    price: string,
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

    async getAccessoryItem():Promise<Product> {
        const accessoryItems = await webActions.getElement(CarouselObjects.PRODUCT_ITEM_VISIBLE);
        const acc = await accessoryItems.filter({has: this.page.locator(`text='Add'`)}).first();
        const product: Product = await {
            title: await acc.locator(CarouselObjects.PRODUCT_TITLE)?.textContent(),
            price: await acc.locator(CarouselObjects.PRODUCT_PRICE)?.innerText(),
            seeDetails: await acc.locator(CarouselObjects.SEE_DETAILS),
            cta: await acc.locator(CarouselObjects.PRODUCT_CTA)
        };
        return product;
    }


    async addAccessory(): Promise<Product> {
        let added: boolean;
        let product: Product;
        const categories = await this.page.locator(CarouselObjects.CATEGORY_ITEMS_VISIBLE)
        .filter({has: this.page.locator(CarouselObjects.PRODUCT_ITEMS)})
        .filter({ has: this.page.locator(CarouselObjects.SUBCATEGORY_ITEMS) });

        for (let i = 0; i < await categories.count(); i++) {
            await categories.nth(i).click();

            const subcategories = this.page.locator(CarouselObjects.SUBCATEGORIES_BTN_VISIBLE);
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
        }
        return product;
    }

    async areProductsAvailable(): Promise<boolean> {
        const productItems = await webActions.getElement(CarouselObjects.PRODUCT_ITEM_VISIBLE);
        const productsAvailable = productItems ?
        await productItems.filter({has: this.page.locator(`text='Add'`)}).count() > 0 ? true : false : false;
        return productsAvailable;
    }

    async getProductObject(element: Locator): Promise<Product> {
        const product: Product = await {
            title: await element.locator(CarouselObjects.PRODUCT_TITLE).textContent(),
            price: await element.locator(CarouselObjects.PRODUCT_PRICE).innerText(),
            seeDetails: await element.locator(CarouselObjects.SEE_DETAILS),
            cta: await element.locator(CarouselObjects.PRODUCT_CTA)
        };
        return product;
    }

    async collapseSubcategories(): Promise<void> {
        await webActions.clickElement(CarouselObjects.SUBCATEGORY_MINUS_ICON);
    }

    async collapseCategories(): Promise<void> {
        await webActions.clickElement(CarouselObjects.CATEGORY_UP_ARROW);
    }
}