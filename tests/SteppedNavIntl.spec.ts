import { testConfig } from "@testConfig";
import { expect, test } from "@framework/BaseTest";
import { Brands } from "@framework/Brands";

for (const locale of testConfig.domesticLocales.hur) {
    test(`@regression @hur Verify hur build submission for ${locale}`, async ( { pages } ) => {
      await test.step(`Navigate to hurricane ${locale} start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.hur, locale);
      });
      await test.step('Click hurricane boat series category', async () => {
        await pages.build.clickHurBoatSeries('SunDeck Series');
      });
      await test.step('Click hurricane model', async () => {
        await pages.build.clickHurModelCategory('SunDeck OB');
      });
      await test.step('Click any available layout item', async () => {
        await pages.build.clickGdyHurAvailableLayoutItem();
      });
      await test.step('Click footer button', async () => {
        await pages.build.clickFooterNextBtn(); 
      });
      await test.step(`Open build summary and click I am Finished`, async () => {
        await pages.build.openSummaryHur();
      await pages.build.clickIamFinishedBtn();
      });
      await test.step(`Fill quote form details and submit`, async () => {
        await pages.quote.enterHurFormDetailsAndSubmit();
      });
    }); 
  }

  for (const locale of testConfig.internationalLocales.rzr) {
    test(`@regression Verify intl stepped process and build submission ${locale}`, async ( { pages } ) => {

        let accessoryAdded;
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('rzr', locale);
        });
        await test.step(`Select any model and go to accessories page`, async () => {
            await pages.build.modelSelectionToAccessoriesPage();
        });
            await test.step(`Add any regular accessory`, async () => {
            accessoryAdded = await pages.build.carousel.addAccessory();
        });
        await test.step(`Open build summary and click I am Finished`, async () => {
            await pages.build.openBuildSummaryAndClickImFinished();
        });
        await test.step(`Verify build quote response status`, async() => {
            expect(await pages.page.waitForResponse(response => 
                response.url().includes('quote') && response.status() === 200))
                .toBeTruthy();
        })
      }); 
  }

  test.only(`@regression Verify intl stepped process and build submission debug`, async ( { pages } ) => {

    let accessoryAdded;
    await test.step(`Navigate to intl start build page`, async () => {
        await pages.navigation.navigateToPreviousYearStartingBuildUrl('rzr', 'en-ie');
    });
    await test.step(`Select any model and go to accessories page`, async () => {
        await pages.build.modelSelectionToAccessoriesPage();
    });
        await test.step(`Add any regular accessory`, async () => {
        accessoryAdded = await pages.build.carousel.addAccessory();
    });
    await test.step(`Open build summary and click I am Finished`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
    });
    await test.step(`Verify build quote response status`, async() => {
        expect(await pages.page.waitForResponse(response => 
            response.url().includes('quote') && response.status() === 200), 
            'Response was not successful for quote page')
            .toBeTruthy();
    })
  });