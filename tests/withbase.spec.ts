import { expect, test }  from '../framework/baseTest';

test('C15432125 Test with fixture', async ( { pages } ) => {
  await pages.navigation.navigatoToUrl("https://ranger.polaris.com/en-us/build-model/");
  await pages.build.clickAnySeatCategory();
  await pages.build.clickAnyModelCategory();
  await pages.build.clickAnyTrim();
  await pages.build.clickFooterNext();
  await pages.build.openSummary();
  await pages.build.clickGetQuote();
  await pages.quote.enterFormDetailsAndSubmit();
});

test('C15432126 Test with fixture new', async ( { pages, page } ) => {
  await pages.navigation.navigatoToUrl("https://ranger.polaris.com/en-us/build-model/");
  await pages.buildPages.build.clickAnySeatCategory();
  await pages.buildPages.build.clickAnyModelCategory();
  await pages.buildPages.build.clickAnyTrim();
  await pages.buildPages.build.clickFooterNext();
  await pages.buildPages.build.openSummary();
  await pages.buildPages.build.clickGetQuote();
  await pages.quote.enterFormDetailsAndSubmit();
  expect(await page.title(), 'Page title not as expected').toContain('TEST');
});