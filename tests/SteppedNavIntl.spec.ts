import { testConfig } from "@testConfig";
import { expect, test } from "@framework/BaseTest";
import { pages } from "@pages/BasePage";

  for (const locale of testConfig.internationalLocales.rzr) {
    test(`Verify rzr current year intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('rzr', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.previousYearInternationalLocales.rzr) {
    test(`Verify rzr previous year intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('rzr', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.rgr) {
    test(`Verify rgr current year intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('rgr', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.previousYearInternationalLocales.rgr) {
    test(`Verify rgr previous year intl stepped process ${locale} @intl`, async ( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('rgr', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.grl) {
    test(`Verify grl current year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('grl', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.previousYearInternationalLocales.grl) {
    test(`Verify grl previous year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('grl', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.atv) {
    test(`Verify atv current year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('atv', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.previousYearInternationalLocales.atv) {
    test(`Verify atv previous year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('atv', locale);
        });
        await orvTestSteps(pages);
      }); 
  }

  for (const locale of testConfig.internationalLocales.ind) {
    test(`Verify indian current year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl ${locale} start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('ind', locale);
        });
        await indTestSteps(pages);
    });
  };


for (const locale of testConfig.previousYearInternationalLocales.ind) {
    test(`Verify indian previous year intl stepped process ${locale} @intl`, async( { pages } ) => {
        await test.step(`Navigate to intl start build page and select any category`, async () => {
            await pages.navigation.navigateToPreviousYearStartingBuildUrl('ind', locale);
        });
        await indTestSteps(pages);
    });   
}


  const orvTestSteps = async (pages: pages) => {
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

  const indTestSteps = async (pages: pages) => {
    await test.step(`Navigate to accessories page with any selection`, async () => {
        await pages.build.clickAnyModelCategory();
        await pages.build.clickAnyTrim();
        await pages.build.waitForPcLoaded();
        await pages.build.clickColorPageNextBtn();
        await pages.build.waitForPcLoaded();
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

