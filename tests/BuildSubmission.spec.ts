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

test(`Submit rzr build @rzr`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl('rzr');
    await pages.uiSteps.modelSelectionToAccessoriesPage('rzr');
    await pages.uiSteps.openBuildSummaryAndClickImFinished();
    await pages.quote.enterFormDetailsAndSubmit();
  });

  test('Submit rgr build @rgr', async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl('rgr');
    await pages.uiSteps.modelSelectionToAccessoriesPage('rgr');
    await pages.uiSteps.openBuildSummaryAndClickImFinished();
    await pages.quote.enterFormDetailsAndSubmit();
  });