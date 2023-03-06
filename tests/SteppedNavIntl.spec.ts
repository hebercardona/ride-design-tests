import { testConfig } from "@testConfig";
import { expect, test } from "@framework/BaseTest";
import { pages } from "@pages/BasePage";

  for (const locale of testConfig.internationalLocales.rzr) {
    test(`Verify rzr intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('rzr', locale);
        });
        await testSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.rgr) {
    test(`Verify rgr intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('rgr', locale);
        });
        await testSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.grl) {
    test(`Verify grl intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('grl', locale);
        });
        await testSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.atv) {
    test(`Verify atv intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('atv', locale);
        });
        await testSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.ind) {
    test(`Verify indian intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl ${locale} start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('ind', locale);
        });
        await test.step(`Navigate to accessories page with any selection`, async () => {
            await pages.build.categoryToAccessoriesPageInd();
        });
        await test.step(`Verify carousel is displayed`, async () => {
            expect(await pages.build.carousel.isCarouselPresent(), 'Carousel not displayed').toBeTruthy();
        });
        await test.step(`Open build summary and click I am Finished`, async () => {
            await pages.build.openBuildSummaryAndClickImFinished();
        });
        await test.step(`Verify build quote response status`, async() => {
            expect(await pages.page.waitForResponse(response => 
                response.url().includes('quote') && response.status() === 200))
                .toBeTruthy();
        });
    });
  };

  const testSteps = async (pages: pages) => {
    await test.step(`Select any model and go to accessories page`, async () => {
        await pages.build.modelSelectionToAccessoriesPage();
    });
    await test.step(`Verify carousel is displayed`, async () => {
        expect(await pages.build.carousel.isCarouselPresent(), 'Carousel not displayed').toBeTruthy();
    });
    await test.step(`Open build summary and click I am Finished`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
    });
    await test.step(`Verify build quote response status`, async() => {
        expect(await pages.page.waitForResponse(response => 
            response.url().includes('quote') && response.status() === 200))
            .toBeTruthy();
    });
  }