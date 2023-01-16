import { test } from "@base"

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
    await pages.navigation.navigateToUrl('https://www.polaris.com/en-us/off-road/rzr/build?selectedmodel=2-seat&CatalogContentId=726088__CatalogContent');
    const categories = await pages.build.carousel.getCategories();
    await pages.build.carousel.clickCategoryByName(`Protection`);
    await pages.build.carousel.clickSubcategoryByName(`Roofs`);
    await pages.build.carousel.getAccessoryItem();
    await pages.build.carousel.clickAccessoryCtaByName(`Aluminum`);
  });