import ApiData from "@framework/ApiData";
import { Brands } from "@framework/Brands";
import { CarouselProduct } from "@pages/Carousel";
import { expect, test } from "@framework/BaseTest"

test('Verify sNumber', async( { pages } ) => {
    const url = 'https://snowmobiles-auth-vnext.polarisind.com/en-us/build-color/?pressid=123456&CatalogContentId=746830__CatalogContent&category=1073769919__CatalogContent';
    const regular_non_stock = 'https://snowmobiles-auth-vnext.polarisind.com/en-us/build-color/?CatalogContentId=746795__CatalogContent&category=1073769897__CatalogContent';
    const employee_QA = 'https://snowmobiles-qa.polarisindcms.com/en-us/build-color/?employeeid=123456&CatalogContentId=746795__CatalogContent&category=1073769897__CatalogContent';

    await pages.page.goto(employee_QA);
    await pages.build.login.enterEmail('heber.cardona@polaris.com');
    await pages.build.login.enterPassword('C@rdona01');
    await pages.build.login.clickSubmit();
    await pages.build.waitForCanvasLoaded();
    await pages.build.clickFooterNextBtn();
    await pages.build.clickFooterNextBtn();
    await pages.build.clickFooterNextBtn();
    await pages.build.clickFooterNextBtn();
    await pages.build.clickFooterNextBtn();
    await pages.build.clickFooterNextBtn();
    await pages.build.openSummary();
    await pages.build.clickIamFinishedBtn();

    /* const response = await pages.page.waitForResponse(response => response.url().includes('getSNumber'));
    console.log(await response.text()); */

    await pages.page.route('**/getSNumber/**', route => {
        console.log(route.request().url());
    });
});

test('Verify sNumber stock', async( { pages } ) => {
    const url = 'https://snowmobiles-auth-vnext.polarisind.com/en-us/build-color/?pressid=123456&subcategory=1073769909__CatalogContent&CatalogContentId=746893__CatalogContent&category=1073769909__CatalogContent';
    const regular_stock = 'https://snowmobiles-auth-vnext.polarisind.com/en-us/build-color/?subcategory=1073769909__CatalogContent&CatalogContentId=746893__CatalogContent&category=1073769909__CatalogContent';

    await pages.page.goto(regular_stock);
    await pages.build.login.enterEmail('heber.cardona@polaris.com');
    await pages.build.login.enterPassword('C@rdona01');
    await pages.build.login.clickSubmit();
    await pages.build.waitForCanvasLoaded();
    await pages.build.clickFooterNextBtn();
    await pages.build.openSummary();
    await pages.build.clickIamFinishedBtn();

    await pages.page.route('**/getSNumber/**', route => {
        console.log(route.request().url());
    });
});
