import ApiData from "@framework/ApiData";
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

test.only('API Build Url', async ({ pages }) => {
    const json = await ApiData.getCurrentYearResponse('en-us', 'rzr');
    console.log(json);
})