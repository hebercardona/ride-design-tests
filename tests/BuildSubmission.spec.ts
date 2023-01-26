import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"

const orv: string[] = [`rzr`, `rgr`, `atv`, `grl`];

for (const brand of orv) {
    test(`Submit ${brand} build @${brand}`, async ( { pages } ) => {
        await pages.navigation.navigateToStartingBuildUrl(brand);
        await pages.build.modelSelectionToAccessoriesPage(brand);
        const accessoryAdded = await pages.build.carousel.addAccessory();
        await pages.build.openBuildSummaryAndClickImFinished();
        await pages.quote.enterFormDetailsAndSubmit();
      });   
}

test('Get Categories', async ( { pages }, testInfo ) => {
    const qa = `https://www-qa.polarisindcms.com/en-us/off-road/rzr/build?selectedmodel=2-seat&CatalogContentId=726069__CatalogContent`;
    const prod = `https://www.polaris.com/en-us/off-road/rzr/build?selectedmodel=2-seat&CatalogContentId=726069__CatalogContent`;
    pages.build.page.evaluate(() => console.error('Adding Test Error'));
    pages.build.page.evaluate(() => console.error('Adding Test Error 2'));

    await pages.navigation.navigateToUrl(prod);
    /* await pages.build.waitForPcLoaded();
    await pages.build.carousel.addAccessory(); */
  });

  test('Quote Changes', async ( { pages } ) => {
    const buildUrl = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(buildUrl);
    await pages.build.openSummary();
    const title = await pages.build.summary.getVehicleTitle();
    const modelId = await pages.build.summary.getModelId();
    const msrp = await pages.build.summary.getMsrpPrice();
    const asConfigured = await pages.build.summary.getAsConfiguredPrice();
    await pages.build.summary.closeBuildSummary();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterFormDetailsAndSubmit();
  });

  test.only('Confirmation', async ( { pages } ) => {
    const buildUrl = 'https://www.polaris.com/en-us/off-road/rzr/build-quote-confirm/?__FormGuid=ae9869b1-6435-45df-907f-aa0f421f4d7a&__FormLanguage=en-us&__FormSubmissionId=6d7d8aa9-13a9-41f7-aaa5-c6dc4fcefbca&swv=726078__CatalogContent';
    await pages.navigation.navigateToUrl(buildUrl);
    const productConf = await pages.confirmation.getProducts();
  });


  /* test.afterEach(async({ pages }, testInfo) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
  }) */