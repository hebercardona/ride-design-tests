import { expect, test }  from '../framework/BaseTest';

test('C15432125 Test with fixture', async ( { pages } ) => {
  await pages.navigation.navigateToUrl("https://ranger.polaris.com/en-us/build-model/");
  await pages.build.clickAnySeatCategory();
  await pages.build.clickAnyModelCategory();
  await pages.build.clickAnyTrim();
  await pages.build.clickColorPageNextBtn();
  await pages.build.openSummary();
  await pages.build.clickIamFinishedBtn();
  await pages.quote.enterFormDetailsAndSubmit();
});

test('C15432126 gdy', async ({ pages, page }) => {
  await page.goto('https://www.godfreypontoonboats.com/en-us/build-category/');
  await page.locator(`a.wholegood-models-card:has-text('Sanpan')`).first().click();
  if((await page.locator(`div[class*='MinimizedWidgetMessage']`)).isVisible()){
    await page.locator(`div[class*='MinimizedWidgetMessage']`).hover();
    await page.locator(`button[class*='MinimizedWidgetMessage']`).click();
  };
  await page.locator(`a.cpq-footer__cta-button`).click();
  await page.locator(`a.cpq-footer__cta-button`).click();
  await page.locator(`a.cpq-footer__cta-button`).click();
  await pages.build.waitForPcLoaded();
  await page.locator(`a.cpq-footer__cta-button`).click();
  await page.locator(`a.cpq-footer__cta-button`).click();
  await page.locator(`button.cpq-footer__cta-button`).click();
});


