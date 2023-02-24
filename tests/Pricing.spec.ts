import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { testConfig } from "@testConfig";

test.only('Pricing Discount Test', async( {pages} ) => {
    const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
});

test(`@regression Verify hur build submission for test`, async ( { pages } ) => {
    await test.step(`Navigate to any build url`, async () => {
        const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
        await pages.navigation.navigateToUrl(url);
        await pages.build.waitForPcLoaded();
    });
    await test.step('Click hurricane boat series category', async () => {
      await pages.build.clickHurBoatSeries('SunDeck Series');
    });
    await test.step('Click hurricane model', async () => {
      await pages.build.clickHurModelCategory('SunDeck OB');
    });
    await test.step('Click any available layout item', async () => {
      await pages.build.clickAvailableLayoutItem();
    });
    await test.step('Click footer button', async () => {
      await pages.build.clickFooterNextBtn(); 
    });
    await test.step(`Open build summary and click I am Finished`, async () => {
      await pages.build.openBuildSummaryAndClickImFinished();
    });
    await test.step(`Fill quote form details and submit`, async () => {
      await pages.quote.enterFormDetailsAndSubmit();
    });
  }); 