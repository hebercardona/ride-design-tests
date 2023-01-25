import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { testConfig } from "@testConfig";

const orv: string[] = [`rzr`, `rgr`, `atv`, `grl`];

for (const brand of orv) {
    test(`Submit ${brand} build @${brand}`, async ( { pages } ) => {
        await pages.navigation.navigateToStartingBuildUrl(brand);
        await pages.uiSteps.modelSelectionToAccessoriesPage(brand);
        await pages.uiSteps.openBuildSummaryAndClickImFinished();
        await pages.quote.enterFormDetailsAndSubmit();
      });   
}


    test(`API Build Url`, async ({ pages }) => {
        const buildUrl = await ApiData.getApiBuildUrl('en-us', 'rzr');
        await pages.navigation.navigateToUrl(buildUrl+'invalid');
        const value = await pages.build.isPlayCanvasLoaded();
        await expect(await value, `Playcanvas not loaded on url: ${buildUrl}`).toBeTruthy();
    });

    test.afterEach(async ({ pages }) => {
        expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
    })
