import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { Common } from "@framework/Common";
import { testConfig } from "@testConfig";


test.only(`Verify atv debug en-us stepped process and build submission`, async ( { pages } ) => {

  let accessoryAdded;
  await test.step(`Navigate to atv en-us start build page`, async () => {
    await pages.navigation.navigateToStartingBuildUrl('atv', 'en-us');
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
  await test.step(`Fill quote form details and submit`, async () => {
    await pages.quote.enterFormDetailsAndSubmit();
  });
  await test.step(`Verify the product added is present in confirmation page`, async () => {
    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
  `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  });
  await test.step(`Verify no duplicate products`, async () => {
    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  });
});

  for (const brand of Brands.orv) {
    for (const locale of testConfig.domesticLocales[brand]) {
      test(`Verify ${brand} ${locale} stepped process and build submission`, async ( { pages } ) => {

        let accessoryAdded;
        await test.step(`Navigate to ${brand} ${locale} start build page`, async () => {
          await pages.navigation.navigateToStartingBuildUrl(brand, locale);
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
        await test.step(`Fill quote form details and submit`, async () => {
          await pages.quote.enterFormDetailsAndSubmit();
        });
        await test.step(`Verify the product added is present in confirmation page`, async () => {
          expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
        `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
        });
        await test.step(`Verify no duplicate products`, async () => {
          expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
        });
      }); 
    } 
  }

  for (const locale of testConfig.domesticLocales.ind) {
    test(`Verify ind build submission for ${locale}`, async ( { pages } ) => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.ind, locale);
      await pages.build.categoryToAccessoriesPageInd();
      const accessoryAdded = await pages.build.carousel.addAccessory();
      await pages.build.openBuildSummaryAndClickImFinished();
      await pages.quote.enterFormDetailsAndSubmit();
  
      expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
      `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  
      expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
    }); 
  }

  test(`Verify slg build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.slg, 'en-us');
    await pages.build.clickAnyCategory();
    await pages.build.performFeatureSelectionSubsteps();
    await pages.build.waitForPcLoaded();
    await pages.build.clickAnyColorItem();
    await pages.build.clickFooterNextBtn();
    await pages.build.waitForPcLoaded();
    await pages.build.performOptionSelectionSubsteps();
    await pages.build.waitForPcLoaded();
    const accessoryAdded = await pages.build.carousel.addAccessory();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterSlgFormDetailsAndSubmit();
    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  });

  test(`Verify sno build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.sno);
    await pages.build.clickAnyCategory();
    await pages.build.performFeatureSelectionSubsteps();
    await pages.build.waitForPcLoaded();
    await pages.build.clickSnoColorItems();
    await pages.build.clickFooterNextBtn();
    await pages.build.performOptionSelectionSubsteps();
    await pages.build.waitForPcLoaded();
    const accessoryAdded = await pages.build.carousel.addAccessory();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterFormDetailsAndSubmit();
    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  });

  test(`Verify cmv build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.cmv);
    await pages.build.clickAnySeatCategory();
    await pages.build.clickAnyModelCategory();
    await pages.build.clickAnyTrim();
    await pages.build.waitForPcLoaded();
    await pages.build.clickCmvAnyColorItem();
    await pages.build.performOptionSelectionSubsteps();
    await pages.build.waitForPcLoaded();
    const accessoryAdded = await pages.build.carousel.addAccessory();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterCmvFormDetailsAndSubmit();
    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  });

  test(`Verify mil build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.mil);
    await pages.build.clickAnyCategory();
    await pages.build.clickAnyMilBrand();
    await pages.build.clickMilModelCategory();
    await pages.build.clickAnyTrim();
    await pages.build.clickAnyColorItem();
    await pages.build.clickFooterNextBtn();
    await pages.build.waitForPcLoaded();
    const accessoryAdded = await pages.build.carousel.addAccessory();
    await pages.build.openBuildSummaryAndClickImFinished();
    await pages.quote.enterMilFormDetailsAndSubmit();

    expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

    expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
  });

  test(`Verify ben build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.ben);
    await pages.build.clickBenBoatSeries('Q Series');
    await pages.build.clickBenModelCategory('QX Line');
    await pages.build.waitForPcLoaded();
    await pages.build.clickAvailableLayoutItem();
    await pages.build.clickFooterNextBtn();
    const model = await pages.build.getJsModelId();
    await pages.build.openSummary();
    const items = await pages.build.summary.getBuildSummaryItemDescriptions();
    await pages.build.clickIamFinishedBtn();
    await pages.quote.enterBenFormDetailsAndSubmit();
    await pages.confirmation.verifyBuildItemsPresentOnConfirmation(items);
  });

  test(`Verify gdy build submission`, async ( { pages } ) => {
    await pages.navigation.navigateToStartingBuildUrl(Brands.gdy);
    await pages.build.clickGdyBoatSeries();
    await pages.build.performFeatureDefaultSelections();
    await pages.build.clickAvailableLayoutItem();
    await pages.build.clickFooterNextBtn();    
    const model = await pages.build.getJsModelId();
    await pages.build.openSummaryGdy();
    const items = await pages.build.summary.getBuildSummaryItemDescriptions();
    await pages.build.clickIamFinishedBtn();
    await pages.quote.enterGdyFormDetailsAndSubmit();
    await pages.confirmation.verifyBuildItemsPresentOnConfirmation(items);
  });

  for (const locale of testConfig.domesticLocales.gdy) {
    test(`Verify hur build submission for ${locale}`, async ( { pages } ) => {
      await test.step(`Navigate to hurricane ${locale} start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.gdy);
      });
      await test.step('Click any boat series category', async () => {
        await pages.build.clickGdyBoatSeries();
      });
      await test.step('Go through feature selection substeps', async () => {
        await pages.build.performFeatureDefaultSelections();
      });
      await test.step('Click any available layout item', async () => {
        await pages.build.clickAvailableLayoutItem();
      });
      await test.step('Click footer button', async () => {
        await pages.build.clickFooterNextBtn(); 
      });
    }); 
  }



  /* test.afterEach(async({ pages }) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
  }); */

  
  