export class CarouselObjects {
    protected static CATEGORIES_BTN_VISIBLE = `button.build-accessories-category-title >> visible=true`;
    protected static CATEGORY_ITEMS_VISIBLE = `div.build-accessories-category >> visible=true`;
    protected static SUBCATEGORIES_BTN_VISIBLE = `button.build-accessories-subcategory-title >> visible=true`;
    protected static SUBCATEGORY_ITEMS = `div.build-accessories-subcategory`
    protected static PRODUCT_CTA_BY_NAME = (accessoryName: string) => `//button[contains(@class,'btn') and contains(@title,'${accessoryName}')] >> visible=true`;
    protected static PRODUCT_CTA = `button.btn`;
    protected static PRODUCT_ITEM_VISIBLE = `div.build-accessories-product-container >> visible=true`;
    protected static PRODUCT_ITEMS = `div.build-accessories-product`;
    protected static ADD_BTN = `button.build-accessories-product-choice-add`;
    protected static PRODUCT_TITLE = `div.build-accessories-product-title div.build-accessories-product-title-label`;
    protected static PRODUCT_ID = 'div.build-accessories-product-title div';
    protected static PRODUCT_PRICE = `div.build-accessories-product-label`;
    protected static SEE_DETAILS = `#SeeProductDetailsLabel`;
    protected static SUBCATEGORY_MINUS_ICON = 'div.shapes-minus';
    protected static CATEGORY_UP_ARROW = 'i.up';
}