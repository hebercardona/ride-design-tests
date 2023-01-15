export class CarouselObjects {
    protected static CATEGORIES = `button.build-accessories-category-title >> visible=true`;
    protected static SUBCATEGORIES = `button.build-accessories-subcategory-title >> visible=true`;
    protected static ACCESSORY_CTA = (accessoryName: string) => `//button[contains(@class,'btn') and contains(@title,'${accessoryName}')] >> visible=true`;
}