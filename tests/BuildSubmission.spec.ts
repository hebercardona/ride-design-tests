import { expect, test } from "@framework/BaseTest"

const orv: string[] = [`rzr`, `rgr`, `atv`, `grl`];

for (const brand of orv) {
    test(`Submit ${brand} build @${brand}`, async ( { pages } ) => {
        await pages.navigation.navigateToStartingBuildUrl(brand);
        await pages.uiSteps.modelSelectionToAccessoriesPage(brand);
        await pages.uiSteps.openBuildSummaryAndClickImFinished();
        await pages.quote.enterFormDetailsAndSubmit();
      });   
}

test.only('Get Categories', async ( { pages } ) => {
    const qa = `https://www-qa.polarisindcms.com/en-us/off-road/rzr/build?selectedmodel=2-seat&CatalogContentId=726069__CatalogContent`;
    const prod = `https://www.polaris.com/en-us/off-road/rzr/build?selectedmodel=2-seat&CatalogContentId=726069__CatalogContent`;
    pages.build.page.evaluate(() => console.error('Adding Test Error'));
    pages.build.page.evaluate(() => console.error('Adding Test Error 2'));

    await pages.navigation.navigateToUrl(prod);
    /* await pages.build.waitForPcLoaded();
    await pages.build.carousel.addAccessory(); */
  });

  test.afterEach(async({ pages }) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
  })