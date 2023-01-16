export class CarouselObjects {
    protected static CATEGORIES = `button.build-accessories-category-title >> visible=true`;
    protected static SUBCATEGORIES = `button.build-accessories-subcategory-title >> visible=true`;
    protected static PRODUCT_CTA_BY_NAME = (accessoryName: string) => `//button[contains(@class,'btn') and contains(@title,'${accessoryName}')] >> visible=true`;
    protected static PRODUCT_CTA = `button.btn`;
    protected static PRODUCT_ITEM = `div.build-accessories-product-container >> visible=true`;
    protected static ADD_BTN = `button.build-accessories-product-choice-add`;
    protected static PRODUCT_TITLE = `div.build-accessories-product-title`;
    protected static PRODUCT_PRICE = `div.build-accessories-product-label`;
    protected static SEE_DETAILS = `#SeeProductDetailsLabel`;
}