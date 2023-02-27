import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { CarouselProduct } from "@pages/Carousel";

test('Verify discount price shown for employee login', async( {pages} ) => {
  let isDiscountLabelPresentBeforeLogin;
  let isDiscountLabelPresentAfterLogin;
  await test.step(`Navigate to any model build url`, async () => {
    const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
  });
  await test.step(`Verify discount price not shown before login`, async () => {
    isDiscountLabelPresentBeforeLogin = await pages.build.carousel.isEmployeeDiscountLabelPresentForProducts();
    expect(isDiscountLabelPresentBeforeLogin, 
      'There are products with discount displayed in the carousel for guest user').toBeFalsy();
  });
  await test.step(`Login with employee account and verify discount price is present`, async () => {
    await pages.build.login.employeeLogin();
    await pages.build.waitForPcLoaded();
    isDiscountLabelPresentAfterLogin = await pages.build.carousel.isEmployeeDiscountLabelPresentForProducts();
    expect(isDiscountLabelPresentAfterLogin, 
      'Discount Price label not present for employee logged in user').toBeTruthy();
  });
});

test('Verify accessory employee discount price is less than regular price', async( {pages} ) => {
  await test.step(`Navigate to any model build url`, async() => {
    const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
  });
  await test.step(`Login with employee account and verify discount price is less than regular for any product`, async() => {
    await pages.build.login.employeeLogin();
    await pages.build.waitForPcLoaded();
    const isDiscountPriceAsExpected = await pages.build.carousel.isDiscountPriceLessThanRegularAnyProduct();
    expect(isDiscountPriceAsExpected, 'Discount price is not less than regular price').toBeTruthy();
  });
});

test('Verify discount price is shown on build summary', async( {pages} ) => {
  let product: CarouselProduct;
  await test.step(`Navigate to any model build url`, async() => {
    const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
  });
  await test.step(`Login with employee account and add accessory with discount`, async() => {
    await pages.build.login.employeeLogin();
    await pages.build.waitForPcLoaded();
    product = await pages.build.carousel.getProductWithEmployeeDiscountDisplayed();
    await pages.build.carousel.addProductItem(product);
  });
  await test.step(`Open build summary and verify for the accessory is correct`, async() => {
    await pages.build.openSummary();
    await pages.build.summary.isSummaryProductPriceAsExpected(product);
  });
});