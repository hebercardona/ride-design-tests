import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";

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


  for (const brand of Brands.orv) {
    test(`Submit ${brand} build and verify confirmation page @${brand}`, async ( { pages } ) => {
      await pages.navigation.navigateToStartingBuildUrl(brand, 'en-us');
      await pages.build.modelSelectionToAccessoriesPage(brand);
      const accessoryAdded = await pages.build.carousel.addAccessory();
      await pages.build.openBuildSummaryAndClickImFinished();
      await pages.quote.enterFormDetailsAndSubmit();
  
      expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
      `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  
      expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
    }); 
  }

  test.only(`Submit rgr build new @rgr`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl('rgr', 'en-us');
    await pages.build.modelSelectionToAccessoriesPage('rgr');
    const accessoryAdded = await pages.build.carousel.addAccessory();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterFormDetailsAndSubmit();

    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  }); 


  /* test.afterEach(async({ pages }, testInfo) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
  }) */